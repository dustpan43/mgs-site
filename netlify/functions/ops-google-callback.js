/**
 * P5 — Google OAuth callback → set mgs_ops_session cookie if email is allowed.
 */

const COOKIE_NAME = "mgs_ops_session";
const MAX_AGE = 60 * 60 * 24 * 30;

function allowedEmail(email) {
  if (!email) return false;
  const e = email.toLowerCase();
  if (e.endsWith("@mgscommunications.com")) return true;
  // personal owner alias sometimes used
  if (e.endsWith("@mgscommunication.com")) return true;
  return false;
}

exports.handler = async (event) => {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const token = process.env.OPS_GATE_TOKEN;
  const site = process.env.URL || process.env.DEPLOY_PRIME_URL || "https://mgscommunications.com";
  const redirectUri = site.replace(/\/$/, "") + "/.netlify/functions/ops-google-callback";

  const params = event.queryStringParameters || {};
  if (params.error) {
    return html(400, "Google sign-in cancelled or failed: " + params.error);
  }
  if (!params.code) {
    return html(400, "Missing OAuth code");
  }
  if (!clientId || !clientSecret || !token) {
    return html(503, "Google OAuth or OPS_GATE_TOKEN not configured in Netlify env.");
  }

  let next = "/ops/board/";
  try {
    if (params.state) {
      const st = JSON.parse(Buffer.from(params.state, "base64url").toString("utf8"));
      if (st.next && String(st.next).startsWith("/ops")) next = st.next;
    }
  } catch (_) {
    /* default next */
  }

  // Exchange code
  const body = new URLSearchParams({
    code: params.code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok) {
    return html(400, "Token exchange failed: " + JSON.stringify(tokenJson));
  }

  const uiRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: "Bearer " + tokenJson.access_token },
  });
  const user = await uiRes.json();
  if (!uiRes.ok || !allowedEmail(user.email)) {
    return html(
      403,
      "Signed in as " +
        (user.email || "unknown") +
        " — only @mgscommunications.com accounts can open Team Ops."
    );
  }

  const cookie = [
    COOKIE_NAME + "=" + encodeURIComponent(token),
    "Path=/",
    "Max-Age=" + MAX_AGE,
    "HttpOnly",
    "SameSite=Lax",
    "Secure",
  ].join("; ");

  return {
    statusCode: 302,
    headers: {
      Location: site.replace(/\/$/, "") + next,
      "Set-Cookie": cookie,
      "Cache-Control": "no-store",
    },
    multiValueHeaders: {
      "Set-Cookie": [cookie],
    },
    body: "",
  };
};

function html(status, msg) {
  return {
    statusCode: status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body:
      "<!doctype html><meta charset=utf-8><title>Ops login</title><body style='font-family:system-ui;padding:2rem'>" +
      "<p>" +
      String(msg).replace(/</g, "&lt;") +
      "</p><p><a href='/ops/login/'>Back to login</a></p></body>",
  };
};
