# RSR Program Dashboard

A self-contained, editable IT program dashboard for the **Retail Systems Replacement (RSR)** program — Horizon Power M2C upgrade (G2 Billing + Velocity for Network), delivered by Gentrack. Built from the Implementation SOW (HPSR0548).

It reports against three pillars — **Scope · Timeline · Quality** — and covers Work Packages, Timeline/Milestones, Deliverables, G2/VFN OOTB build, Product Gaps, and Product Catalog, plus an auto-generated **management newsletter** you can email.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The dashboard (open in any browser). No build step, no dependencies. |
| `data.json` | All the program data. **This is the single source of truth** — edit it to update the dashboard. |
| `README.md` | This file. |

The dashboard reads `data.json` when served over the web. When you open `index.html` directly off disk, it falls back to a copy of the data embedded inside the file, so it always renders.

## How to update the dashboard

1. Open `index.html` in your browser.
2. Click **✎ Edit: Off** (top right) to turn editing on.
3. Edit any cell, status dropdown, RAG, %, narrative, or use **+ Add** buttons to add rows.
4. Click **⬇ Save data.json** — your browser downloads an updated `data.json`.
5. Replace the `data.json` in the repo with the downloaded file and commit (see below). Everyone viewing the site now sees your update.

> Tip: edits live only in your browser until you download and commit `data.json`. Nothing is lost — just remember to Save + commit to publish.

## Host it on GitHub Pages (everyone can see it)

1. Create a repo (e.g. `rsr-program-dashboard`) and add these three files at the root.
   ```bash
   git init
   git add index.html data.json README.md
   git commit -m "RSR program dashboard"
   git branch -M main
   git remote add origin https://github.com/<your-org>/rsr-program-dashboard.git
   git push -u origin main
   ```
2. In GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick **main / (root)**, Save.
3. After a minute your dashboard is live at:
   `https://<your-org>.github.io/rsr-program-dashboard/`
4. Share that URL with management. It's read-only for viewers — they always see the latest committed `data.json`.

### Publishing an update
```bash
# after replacing data.json with the file you downloaded from the dashboard
git add data.json
git commit -m "Program update — <date>"
git push
```
GitHub Pages redeploys automatically; viewers get the new data on refresh.

> If you want updates restricted to you, keep the repo private to editors and rely on the Pages URL for read-only viewers, or protect `main` and update via pull request so changes are reviewed.

## The newsletter

Open the **Newsletter** tab. It's generated live from the current data:

- **Copy (rich)** — paste straight into Outlook/Gmail with formatting.
- **Copy (plain text)** — for plain emails.
- **Open in email** — drafts an email with the update in your mail client.
- **Print / PDF** — print the whole dashboard or save the newsletter as PDF.

## Notes on the data

- Statuses, %, RAG and dates are seeded as a starting baseline from the SOW — review and set them to the real current position before your first management report.
- The MSC (Master Supply Contract) governs legal terms and isn't tracked here; this dashboard is the delivery/scope/timeline/quality view.
