// MGS Communications — NMI Payment Processing Function
// Receives a Collect.js payment_token from the client and processes a sale via NMI's Direct Connect API.
// The NMI_SECURITY_KEY environment variable must be set in the Netlify dashboard.

const https = require('https');
const querystring = require('querystring');

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

  // Check for API key
  if (!process.env.NMI_SECURITY_KEY) {
    console.error('NMI_SECURITY_KEY environment variable is not set');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Payment processing is not configured. Please call (505) 888-2034.' }) };
  }

  // Parse request body
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  const { payment_token, amount, invoice_number, name, email } = body;

  // Validate required fields
  if (!payment_token) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Payment token is required' }) };
  }
  if (!amount) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Amount is required' }) };
  }

  // Validate amount
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > 99999.99) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Please enter a valid amount' }) };
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
    last_name: lastName
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
