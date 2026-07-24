/**
 * MGS Ops Board live data API (P1)
 *
 * TEACHING — What is a "Blob" here?
 * ---------------------------------
 * Netlify Blobs = a small key/value file cabinet that lives NEXT TO your site,
 * not inside git. Think of it like a sticky note server:
 *   - Key "board"  → big JSON snapshot (rentals, money, review queue, …)
 *   - You WRITE it when Chief finishes a boot reconcile (no git commit)
 *   - The board page READs it when Missy opens /ops/board/
 *
 * Git still holds the *engine* (HTML/JS that draws the UI).
 * Blobs hold the *data* (what the UI draws today).
 *
 * GET  /.netlify/functions/ops-board
 *   Requires ops session cookie (same as /ops login) — not public.
 *   Returns BOARD JSON.
 *
 * POST /.netlify/functions/ops-board
 *   Authorization: Bearer <OPS_BOARD_PUBLISH_SECRET>
 *   Body: full BOARD object (must include snapshot)
 *   Stores to Blobs. Used by Grok/Chief — never by browsers casually.
 *
 * Env:
 *   OPS_GATE_TOKEN           — cookie value from ops-login
 *   OPS_BOARD_PUBLISH_SECRET — publish token for Grok (set in Netlify env)
 *                              falls back to OPS_GATE_TOKEN if unset
 */

const { getStore } = require("@netlify/blobs");

const COOKIE_NAME = "mgs_ops_session";
const BLOB_KEY = "board";
const SITE_ID =
  process.env.SITE_ID ||
  process.env.NETLIFY_SITE_ID ||
  "9ac39f1e-1673-4f27-b0af-1981bf5b39b2";

/**
 * Open the Blobs cabinet.
 * On a healthy Netlify function runtime, getStore("name") is enough.
 * Some deploys need siteID + NETLIFY_AUTH_TOKEN (personal access / CLI token)
 * set as a Netlify env var — then Grok can still POST snapshots with no git.
 */
function openStore() {
  try {
    return getStore("mgs-ops");
  } catch (_) {
    /* fall through to explicit config */
  }
  const token =
    process.env.NETLIFY_AUTH_TOKEN ||
    process.env.NETLIFY_BLOBS_TOKEN ||
    process.env.BLOBS_TOKEN;
  if (!token) {
    throw new Error(
      "Blobs not auto-configured. Set NETLIFY_AUTH_TOKEN in Netlify env (CLI login token or personal access token) and redeploy."
    );
  }
  return getStore({ name: "mgs-ops", siteID: SITE_ID, token });
}

function json(status, body, extra) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...(extra || {}),
    },
    body: JSON.stringify(body),
  };
}

function readCookie(event, name) {
  const raw = event.headers.cookie || event.headers.Cookie || "";
  const parts = raw.split(";").map((s) => s.trim());
  for (const p of parts) {
    const i = p.indexOf("=");
    if (i === -1) continue;
    const k = p.slice(0, i);
    if (k !== name) continue;
    let v = p.slice(i + 1);
    try {
      v = decodeURIComponent(v);
    } catch (_) {
      /* keep raw */
    }
    return v;
  }
  return "";
}

function cookieOk(event) {
  const expected = process.env.OPS_GATE_TOKEN || "";
  if (!expected) return false;
  const got = readCookie(event, COOKIE_NAME);
  return got === expected;
}

function publishOk(event) {
  const secret =
    process.env.OPS_BOARD_PUBLISH_SECRET || process.env.OPS_GATE_TOKEN || "";
  if (!secret) return false;
  const auth = event.headers.authorization || event.headers.Authorization || "";
  const bearer = auth.replace(/^Bearer\s+/i, "").trim();
  if (bearer && bearer === secret) return true;
  // Also allow an already-logged-in ops cookie (manual republish from browser tools)
  return cookieOk(event);
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
      body: "",
    };
  }

  let store;
  try {
    store = openStore();
  } catch (e) {
    return json(503, {
      error: "Blobs unavailable",
      detail: String(e && e.message ? e.message : e),
      hint: "Set NETLIFY_AUTH_TOKEN in Netlify site env (from `netlify login` CLI token) and redeploy. See ops/TEACHING-LIVE-BOARD.md.",
    });
  }

  if (event.httpMethod === "GET") {
    if (!cookieOk(event)) {
      return json(401, {
        error: "Unauthorized",
        hint: "Sign in at /ops/login/ first (team password).",
      });
    }
    try {
      const board = await store.get(BLOB_KEY, { type: "json" });
      if (!board) {
        return json(404, {
          error: "No live board snapshot yet",
          hint: "Chief/Shutdown should POST a BOARD once. Embedded HTML fallback may still show.",
        });
      }
      return json(200, board);
    } catch (e) {
      return json(500, { error: "Read failed", detail: String(e.message || e) });
    }
  }

  if (event.httpMethod === "POST") {
    if (!publishOk(event)) {
      return json(401, {
        error: "Unauthorized publish",
        hint: "Send Authorization: Bearer <OPS_BOARD_PUBLISH_SECRET>",
      });
    }
    let board;
    try {
      board = JSON.parse(event.body || "{}");
    } catch {
      return json(400, { error: "Body must be JSON BOARD object" });
    }
    if (!board || typeof board !== "object" || !board.snapshot) {
      return json(400, {
        error: "Invalid BOARD",
        hint: "Must include snapshot: { day, time, label }",
      });
    }
    // Ensure reviewQueue array exists for P3 consumers
    if (!Array.isArray(board.reviewQueue)) board.reviewQueue = [];

    try {
      await store.setJSON(BLOB_KEY, board);
      return json(200, {
        ok: true,
        snapshot: board.snapshot,
        reviewQueueCount: board.reviewQueue.length,
        storedAt: new Date().toISOString(),
      });
    } catch (e) {
      return json(500, { error: "Write failed", detail: String(e.message || e) });
    }
  }

  return json(405, { error: "Method not allowed" });
};
