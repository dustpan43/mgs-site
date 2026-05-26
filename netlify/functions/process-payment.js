// MGS Communications — NMI Payment Processing Function
// Receives a Collect.js payment_token from the client, verifies a Cloudflare Turnstile
// bot-protection token, enforces a $25 minimum + per-IP rate limit, then processes a sale
// via NMI's Direct Connect API.
//
// Required environment variables (set in Netlify dashboard):
//   NMI_SECURITY_KEY        — NMI gateway security key
//   TURNSTILE_SECRET_KEY    — Cloudflare Turnstile secret key

const https = require('https');
const querystring = require('querystring');

// ===== Configuration =====
const MIN_PAYMENT_AMOUNT = 25;          // Minimum online payment in dollars
const MAX_PAYMENT_AMOUNT = 99999.99;    // NMI cap
const RATE_LIMIT_MAX = 5;               // Max attempts per IP per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour rolling window

// ===== In-memory rate limiter =====
// Module-level Map persists across invocations when the Netlify function container
// stays warm (typical during a burst of traffic — exactly when we need throttling).
// Best-effort secondary defense behind Turnstile.
const rateLimitStore = new Map();

function checkRateLimit(ip) {
  if (!ip) return { allowed: true };
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const attempts = (rateLimitStore.get(ip) || []).filter(ts => ts > cutoff);

  if (attempts.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, attempts);
    return { allowed: false, retryAfterSec: Math.ceil((attempts[0] + RATE_LIMIT_WINDOW_MS - now) / 1000) };
  }
  attempts.push(now);
  rateLimitStore.set(ip, attempts);

  // Opportunistic cleanup to keep the Map from growing forever
  if (rateLimitStore.size > 500) {
    for (const [k, v] of rateLimitStore) {
      const fresh = v.filter(ts => ts > cutoff);
      if (fresh.length === 0) rateLimitStore.delete(k);
      else rateLimitStore.set(k, fresh);
    }
  }
  return { allowed: true };
}

// ===== Cloudflare Turnstile verification =====
function verifyTurnstile(token, ip) {
  return new Promise((resolve) => {
    const postData = querystring.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip || ''
    });
    const req = https.request({
      hostname: 'challenges.cloudflare.com',
      path: '/turnstile/v0/siteverify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ success: !!parsed.success, codes: parsed['error-codes'] || [] });
        } catch (e) {
          resolve({ success: false, codes: ['parse-error'] });
        }
      });
    });
    req.on('error', () => resolve({ success: false, codes: ['network-error'] }));
    req.write(postData);
    req.end();
  });
}

exports.handler = async (event) => {
  // Allow both www and non-www origins
  const origin = (event.headers && (event.headers.origin || event.headers.Origin)) || '';
  const allowedOrigins = ['https://mgscommunications.com', 'https://www.mgscommunications.com'];
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  const headers = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Only POST allowed
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // Identify caller IP for rate limiting + Turnstile verification
  const clientIp =
    (event.headers && (event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'] || '').split(',')[0].trim()) ||
    '';

  // ===== Rate limit gate (before anything expensive) =====
  const rl = checkRateLimit(clientIp);
  if (!rl.allowed) {
    console.warn(`[rate-limit] blocked IP=${clientIp} retryAfter=${rl.retryAfterSec}s`);
    return {
      statusCode: 429,
      headers: { ...headers, 'Retry-After': String(rl.retryAfterSec) },
      body: JSON.stringify({ error: 'Too many payment attempts from your network. Please wait an hour and try again, or call (505) 888-2034.' })
    };
  }

  // Check for required env vars
  if (!process.env.NMI_SECURITY_KEY) {
    console.error('NMI_SECURITY_KEY environment variable is not set');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Payment processing is not configured. Please call (505) 888-2034.' }) };
  }
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error('TURNSTILE_SECRET_KEY environment variable is not set');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Bot verification is not configured. Please call (505) 888-2034.' }) };
  }

  // Parse request body
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  const { payment_token, turnstile_token, amount, invoice_number, name, email, company, phone, address, city, state, zip } = body;

  // ===== Turnstile gate (before any NMI call — bots never reach the gateway) =====
  if (!turnstile_token) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Bot verification missing. Please refresh the page and try again.' }) };
  }
  const turnstileResult = await verifyTurnstile(turnstile_token, clientIp);
  if (!turnstileResult.success) {
    console.warn(`[turnstile] verification failed IP=${clientIp} codes=${turnstileResult.codes.join(',')}`);
    return { statusCode: 403, headers, body: JSON.stringify({ error: 'Bot verification failed. Please refresh the page and try again, or call (505) 888-2034.' }) };
  }

  // Validate required payment fields
  if (!payment_token) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Payment token is required' }) };
  }
  if (!amount) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Amount is required' }) };
  }

  // Validate amount (including $25 minimum)
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > MAX_PAYMENT_AMOUNT) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Please enter a valid amount.' }) };
  }
  if (parsedAmount < MIN_PAYMENT_AMOUNT) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Online payments must be at least $' + MIN_PAYMENT_AMOUNT + '. For smaller amounts, please call (505) 888-2034.' })
    };
  }

  // Parse name into first/last
  const nameParts = (name || '').trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Build NMI API request
  const postData = querystring.stringify({
    security_key: process.env.NMI_SECURITY_KEY,
    type: 'sale',
    payment_token: payment_token,
    amount: parsedAmount.toFixed(2),
    orderid: (invoice_number || '').trim(),
    email: (email || '').trim(),
    first_name: firstName,
    last_name: lastName,
    company: (company || '').trim(),
    phone: (phone || '').trim(),
    address1: (address || '').trim(),
    city: (city || '').trim(),
    state: (state || '').trim(),
    zip: (zip || '').trim()
  });

  // POST to NMI
  let nmiResponse;
  try {
    nmiResponse = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'secure.networkmerchants.com',
        path: '/api/transact.php',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(querystring.parse(data)));
      });
      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  } catch (err) {
    console.error('NMI API request failed:', err.message);
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: 'Unable to reach payment processor. Please try again or call (505) 888-2034.' })
    };
  }

  // NMI response codes: 1 = Approved, 2 = Declined, 3 = Error
  if (nmiResponse.response === '1') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        transactionId: nmiResponse.transactionid || '',
        authCode: nmiResponse.authcode || '',
        message: nmiResponse.responsetext || 'Approved'
      })
    };
  } else {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: false,
        error: nmiResponse.responsetext || 'Payment declined. Please check your card details or call (505) 888-2034.'
      })
    };
  }
};
