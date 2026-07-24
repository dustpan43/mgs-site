// MGS Team Ops — password gate login
// Sets an httpOnly cookie used by the ops-gate edge function.
//
// Required Netlify env vars:
//   OPS_GATE_PASSWORD  — shared team password (what humans type)
//   OPS_GATE_TOKEN     — long random secret stored in the cookie (not the password)
//
// Note: Set-Cookie must use multiValueHeaders on Netlify (AWS Lambda style)
// or browsers never receive the session cookie — looks like "Sign in does nothing."

const COOKIE_NAME = 'mgs_ops_session';
const MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30 days

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': event.headers.origin || '',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const password = process.env.OPS_GATE_PASSWORD;
  const token = process.env.OPS_GATE_TOKEN;

  if (!password || !token) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({
        error: 'Ops gate is not configured yet (missing OPS_GATE_PASSWORD / OPS_GATE_TOKEN).',
      }),
    };
  }

  let body = {};
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'Invalid JSON' }),
    };
  }

  const submitted = typeof body.password === 'string' ? body.password : '';
  if (!submitted || submitted !== password) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'Incorrect password' }),
    };
  }

  // Cookie value: raw token (base64). Avoid encodeURIComponent so edge compare is simple.
  // Base64 may include + / = which are fine inside a quoted cookie value.
  const cookie = [
    `${COOKIE_NAME}=${token}`,
    'Path=/',
    `Max-Age=${MAX_AGE_SEC}`,
    'HttpOnly',
    'SameSite=Lax',
    'Secure',
  ].join('; ');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      // Also set single-header form for runtimes that honor it
      'Set-Cookie': cookie,
    },
    // Netlify / Lambda: multiValueHeaders is what actually delivers Set-Cookie reliably
    multiValueHeaders: {
      'Set-Cookie': [cookie],
    },
    body: JSON.stringify({ ok: true }),
  };
};
