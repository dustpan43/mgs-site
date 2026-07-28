# Teaching: Live Ops Board (P0–P5) — no more git for daily data

## The problem we solved

**Before:** Updating the board meant editing `BOARD` inside HTML → `git commit` → Netlify rebuild.  
Doing that for every invoice or morning boot is like reprinting the whole phone book to change one number.

**After:**  
- **Git** = the *app* (how the board looks, Form Station UI, password gate).  
- **Blobs** = the *data* (today’s rentals, money, review queue).  

---

## What is a Netlify Blob? (plain English)

Imagine two cabinets:

| Cabinet | Name | What’s inside |
|---------|------|----------------|
| **Git / GitHub** | Code library | Pages, scripts, Form Station — changes when *product* changes |
| **Netlify Blobs** | Sticky-note drawer on the server | One sticky called `board` with today’s JSON snapshot |

When Chief finishes a morning reconcile:

1. Builds the same `BOARD` object as always (from Sheets via `gws`).  
2. **POSTs** it to `/.netlify/functions/ops-board` with a secret.  
3. Function saves it in Blobs.  
4. Missy opens `/ops/board/` → page **fetches** that JSON → draws the UI.  

**No commit. No deploy. Seconds, not a full site rebuild.**

---

## Phases

| Phase | What you get |
|-------|----------------|
| **P0** | Rules: don’t deploy for every doc; batch board publishes |
| **P1** | Blobs + GET/POST API + board page loads live data |
| **P2** | Chief/Shutdown publish via API (not daily git) |
| **P3** | Review queue lives in that live BOARD (stage docs without deploy) |
| **P4** | Optional Drive PDF preview on Review cards |
| **P5** | Path toward Google sign-in for `/ops` (password still works) |

---

## Secrets (Netlify env)

| Variable | Who uses it |
|----------|-------------|
| `OPS_GATE_PASSWORD` | Humans at login |
| `OPS_GATE_TOKEN` | Cookie after login + GET auth |
| `OPS_BOARD_PUBLISH_SECRET` | Grok/Chief when POSTing BOARD (set separately; can match token at first) |

---

## Commands

```powershell
# Publish BOARD JSON (after building the object to a file)
$env:OPS_BOARD_PUBLISH_SECRET = "…"   # from Netlify env
python $env:USERPROFILE\.claude\mgs-hub\helpers\publish_ops_board.py C:\path\board.json
```

```text
GET  https://mgscommunications.com/.netlify/functions/ops-board
     (browser already signed in — cookie sent automatically)

POST same URL
     Authorization: Bearer <OPS_BOARD_PUBLISH_SECRET>
     body: { … full BOARD … }
```

---

## Fallback

If Blobs is empty or offline, the board HTML still has an **embedded** `BOARD` so the page never goes blank. Live data wins when available.

---

## Blank board / broken engine (P2 guard)

If `/ops/board/` shows only the logo + empty “snapshot” label and no KPIs/nav, the **engine JavaScript failed to parse** (not Blobs). Republishing BOARD data will not fix it — you need a git deploy of `ops/board/index.html`.

**Before committing board engine changes:**

```powershell
cd C:\Users\team\Projects\MGS-Hub\website
node scripts/check-ops-board.js
```

Exit `0` = safe to push. Exit `1` = SyntaxError (do not deploy).

**Live data after boot (P1):** Overview, Review, Money, Tasks, and rail badges re-paint from Blobs when the fetch succeeds. Stamp shows `· LIVE`. If stamp is LIVE but Overview still looks like an old embedded day, the re-bind is broken — check console.

**Quick triage**

| Symptom | Cause | Fix |
|---------|--------|-----|
| Empty shell, console SyntaxError | Broken `index.html` script | Fix strings, `node scripts/check-ops-board.js`, git push |
| 401 on live fetch | Not logged in | Sign in at `/ops/login/` (team password) |
| 404 no snapshot | Blobs empty | Chief POST via `publish_ops_board.py` |
| LIVE stamp, wrong Overview | P1 re-bind regression | Rebuild derived + `renderOverview` in boot path |
