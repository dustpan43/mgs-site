# MGS Team Ops (private site area)

Private tools for Missy / Angela / Dustin. **Not** linked from the public nav. **noindex**. **Disallow in robots.txt**.

## Live URLs (after deploy + env)

| Path | App |
|------|-----|
| `/ops/` | Hub landing |
| `/ops/login/` | Password gate |
| `/ops/board/` | **Operations Board** (live snapshot dashboard) |
| `/ops/forms/` | **Form Station moved notice** (F5 flip 8/6 — Hub app is the document creator) |
| `/ops/forms/classic/` | **Old Form Station** v1.23.0 (bedding-in escape hatch only) |

### Operations Board refresh (LIVE — no git for data)

See **`TEACHING-LIVE-BOARD.md`** (Blobs explained in plain English).

1. Build `BOARD` JSON from sheets (same fields as always).
2. `python ~/.claude/mgs-hub/helpers/publish_ops_board.py board.json`  
   with `OPS_BOARD_PUBLISH_SECRET` set (Netlify env + local shell).
3. Page at `/ops/board/` **fetches** `/.netlify/functions/ops-board` (cookie required).
4. **Git** only when changing the board *engine* or Form Station *app*.
5. **P0:** publish at boot + shutdown (not every PDF).

## Security model

1. **Password gate** — Netlify Function `ops-login` checks `OPS_GATE_PASSWORD`, sets httpOnly cookie to `OPS_GATE_TOKEN`.
2. **Edge function `ops-gate`** — requires that cookie for all `/ops/*` except `/ops/login/`.
3. **Obscurity helpers** — no public nav, robots Disallow, meta noindex (not sufficient alone).
4. **Not** dealer-cost or full customer CRM — Form Station is blank templates (sell prices only).

### Netlify env vars (required before the gate works)

| Var | Purpose |
|-----|---------|
| `OPS_GATE_PASSWORD` | Shared team password (what people type) |
| `OPS_GATE_TOKEN` | Long random secret in the cookie (generate once; not the human password) |

```powershell
# Generate a token
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

Set in Netlify UI or CLI:
```bash
netlify env:set OPS_GATE_PASSWORD "your-shared-password"
netlify env:set OPS_GATE_TOKEN "the-long-random-token"
```

## Updating Form Station (classic)

1. Edit master: `MGS Hub\Operations Hub\Form Station\mgs-form-station.html`
2. Copy to `website/ops/forms/classic/index.html` (keep noindex meta) — **not** the notice page
3. Commit + push `main` → Netlify ~60s
4. Prefer Hub app Documents for real work after F5 (8/6). Classic is bedding-in only.

## Local file open

Opening `ops/forms/classic/index.html` as a `file://` path bypasses the gate (edge only runs on Netlify). That’s fine for Dustin’s offline edits.
