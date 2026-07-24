# MGS Team Ops (private site area)

Private tools for Missy / Angela / Dustin. **Not** linked from the public nav. **noindex**. **Disallow in robots.txt**.

## Live URLs (after deploy + env)

| Path | App |
|------|-----|
| `/ops/` | Hub landing |
| `/ops/login/` | Password gate |
| `/ops/board/` | **Operations Board** (live snapshot dashboard) |
| `/ops/forms/` | **Form Station** (v1.23.0 master copy) |

### Operations Board refresh (Grok master)
1. Edit **only** the `const BOARD = {…}` block in either:
   - Master: `MGS Hub\Operations Hub\Hub Dashboard\mgs-hub-dashboard.html`
   - Site publish copy: `website\ops\board\index.html`
2. Copy master → `website/ops/board/index.html` (keep noindex meta).
3. `git add ops/board/index.html` → commit → `git push origin main` → Netlify ~60s.
4. Live URL: **https://mgscommunications.com/ops/board/** (same team password as Form Station).
5. Do **not** edit below the `RENDERING ENGINE` banner. Recipe: Hub Dashboard README.

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

## Updating Form Station

1. Edit master: `MGS Hub\Operations Hub\Form Station\mgs-form-station.html`
2. Copy to `website/ops/forms/index.html` (keep noindex meta)
3. Commit + push `main` → Netlify ~60s
4. Still email/file master for offline use if needed; site becomes the official always-current copy (MGS-085)

## Local file open

Opening `ops/forms/index.html` as a `file://` path bypasses the gate (edge only runs on Netlify). That’s fine for Dustin’s offline edits.
