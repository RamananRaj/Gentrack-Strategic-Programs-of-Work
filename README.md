# Gentrack Strategic Programs of Work

A static, Git-hosted portfolio dashboard. One **viewer** site that anyone can read, and a separate **admin** page that writes changes straight back to this repo via the GitHub API — so updates publish to everyone without using a terminal.

Structure: **Portfolio → Strategic Account → Program → dashboard.**
Example: *Gentrack Strategic Programs of Work* → *Horizon Power* → *Retail Systems Replacement (RSR)*.

## Files

| File | Purpose |
|------|---------|
| `index.html` | **Viewer** (read-only). Account + Program pickers, then the full dashboard. Share this URL with management. |
| `admin.html` | **Admin**. Connect with a GitHub token, edit any program, add accounts/programs, publish to Git. |
| `app.js` | Shared dashboard markup + rendering logic used by both pages. |
| `styles.css` | Shared styling. |
| `registry.json` | The portfolio index: accounts and their programs (each pointing to a data file). |
| `programs/*.json` | One file per program (e.g. `programs/horizon-power-rsr.json`). The single source of truth for that program. |

## The dashboard

Each program reports against **Scope · Timeline · Quality**, with tabs for Overview, Weekly Updates (archive), Work Packages (drill into Entry/Exit criteria), Timeline (SOW DM0–DM16 with calendar dates), Deliverables (grouped by work package), G2/VFN OOTB, Product Gaps, Product Catalog, Payments, Resources, and an emailable Newsletter.

## Hosting (GitHub Pages)

Already set up for this repo. If recreating: **Settings → Pages → Deploy from a branch → main / (root) → Save**. Live at:

- Viewer: `https://ramananraj.github.io/Gentrack-Strategic-Programs-of-Work/`
- Admin:  `https://ramananraj.github.io/Gentrack-Strategic-Programs-of-Work/admin.html`

## Updating via the admin page (no terminal)

1. **Create a GitHub Personal Access Token** (one-off): GitHub → Settings → Developer settings → **Fine-grained tokens** → Generate. Repository access = only `Gentrack-Strategic-Programs-of-Work`. Permissions → **Contents: Read and write**. Copy the token.
2. Open **admin.html**, paste the token, click **Connect** (tick "remember" to store it in your browser only).
3. Pick an Account + Program → **Load**. Turn edits inline (Edit is on automatically).
4. For the weekly cycle: update the Weekly Update lists, click **📌 Archive this week**, then **⬆ Publish current program to Git**. Live in ~1 minute.
5. **+ New account** / **+ New program** to grow the portfolio (new programs can start from the RSR template). **Publish registry changes** saves the portfolio index.

The token lives only in your browser and is sent only to GitHub's API. It is never written into the repo. Keep `admin.html` for yourself; viewers use `index.html`.

## Updating via terminal (alternative)

Edit a `programs/*.json` file (or use the admin **⬇ Download JSON** then replace the file), then:

```bash
git add -A && git commit -m "Update <program> $(date +%Y-%m-%d)" && git push
```

## Notes

- Seeded statuses/percentages are a baseline from the SOW — set them to the real position.
- `programStartDate` in each program drives the calendar timeline; set it to the real SOW commencement.
- The MSC (master legal contract) is not tracked here; this is the delivery/scope/timeline/quality view.
