/**
 * P5 — Start Google OAuth for /ops (optional; password login still works).
 *
 * TEACHING: Google sign-in here means "prove you are @mgscommunications.com",
 * then we set the SAME session cookie as password login. Blobs/board don't care
 * how you got the cookie.
 *
 * Env (Netlify):
 *   GOOGLE_OAUTH_CLIENT_ID
 *   GOOGLE_OAUTH_CLIENT_SECRET
 *   OPS_GATE_TOKEN          (cookie value after success)
 *   URL / site URL          (redirect base) — uses URL env Netlify provides
 *
 * If CLIENT_ID is missing, returns 503 with setup instructions.
 */

exports.handler = async (event) => {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const site = process.env.URL || process.env.DEPLOY_PRIME_URL || "https://mgscommunications.com";
  if (!clientId) {
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Google sign-in not configured yet",
        setup: [
          "1. Google Cloud Console → create OAuth Web client",
          "2. Authorized redirect URI: " + site + "/.netlify/functions/ops-google-callback",
          "3. Netlify env: GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET",
          "4. Redeploy",
        ],
      }),
    };
  }

  const next = (event.queryStringParameters && event.queryStringParameters.next) || "/ops/board/";
  const redirectUri = site.replace(/\/$/, "") + "/.netlify/functions/ops-google-callback";
  const state = Buffer.from(JSON.stringify({ next, t: Date.now() })).toString("base64url");

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("hd", "mgscommunications.com"); // hint Workspace domain
  url.searchParams.set("prompt", "select_account");
  url.searchParams.set("state", state);

  return {
    statusCode: 302,
    headers: { Location: url.toString(), "Cache-Control": "no-store" },
    body: "",
  };
};
