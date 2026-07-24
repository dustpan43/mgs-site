// MGS Team Ops — password gate login
// Sets an httpOnly cookie used by the ops-gate edge function.
//
// Required Netlify env vars (Site settings → Environment variables):
//   OPS_GATE_PASSWORD  — shared team password (what humans type)
//   OPS_GATE_TOKEN     — long random secret stored in the cookie (not the password)
//
// Generate a token once, e.g. PowerShell:
//   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Max 256 }) -as [byte[]])

const COOKIE_NAME = 'mgs_ops_session';
const MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30 days

function json(status, body, extraHeaders) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...(extraHeaders || {}),
    },
    body: JSON.stringify(body),
  };
}

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
    return json(405, { error: 'Method not allowed' });
  }

  const password = process.env.OPS_GATE_PASSWORD;
  const token = process.env.OPS_GATE_TOKEN;

  if (!password || !token) {
    return json(503, {
      error: 'Ops gate is not configured yet (missing OPS_GATE_PASSWORD / OPS_GATE_TOKEN).',
    });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  const submitted = typeof body.password === 'string' ? body.password : '';
  if (!submitted || submitted !== password) {
    return json(401, { error: 'Incorrect password' });
  }

  const secure = true; // site is HTTPS on Netlify
  const cookie = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    `Max-Age=${MAX_AGE_SEC}`,
    'HttpOnly',
    'SameSite=Lax',
    secure ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');

  return json(200, { ok: true }, { 'Set-Cookie': cookie });
};
