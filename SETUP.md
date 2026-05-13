# PRENZE Portfolio — Setup Guide

---

## What you'll have when done

- Portfolio live at `https://YOUR-USERNAME.github.io/portfolio/`
- Drop a folder into `projects/featured/` → push → site updates automatically
- No code changes ever needed to add or update projects

---

## PART 1 — GitHub Account & Repo

### Step 1 — Create a GitHub account
1. Go to **https://github.com**
2. Click **Sign up** — use any email
3. Choose the **Free** plan
4. Verify your email

### Step 2 — Create a new repository
1. Click the **+** icon (top right) → **New repository**
2. Name it: `portfolio` (or anything you want — this becomes part of your URL)
3. Set it to **Public** ← required for free GitHub Pages
4. Leave everything else unchecked
5. Click **Create repository**

---

## PART 2 — Upload Your Files

### Step 3 — Install GitHub Desktop (easiest method)
1. Download from **https://desktop.github.com**
2. Install and sign in with your GitHub account
3. Click **Clone a repository** → **URL tab**
4. Paste your repo URL: `https://github.com/YOUR-USERNAME/portfolio`
5. Choose a folder on your PC where the files will live → **Clone**

### Step 4 — Copy files into the folder
Copy these files/folders into the cloned folder on your PC:

```
portfolio/
  index.html                ← rename prenze-portfolio.html to this
  build.js
  projects.json             ← run build.js first to generate this (see Part 3)
  projects/
    featured/
      01-nexus-framework/
        title.txt
        description.txt
        tag.txt
        tags.txt
        icon.png            ← your thumbnail image
        video.mp4           ← optional
    gallery/
      (same structure, extra projects that aren't featured)
  .github/
    workflows/
      build-projects.yml
```

> **Important:** Rename `prenze-portfolio.html` → `index.html`
> GitHub Pages serves `index.html` as the homepage automatically.

### Step 5 — Push to GitHub
1. Open **GitHub Desktop**
2. You'll see all the files listed as changes
3. At the bottom left — type a commit message: `initial upload`
4. Click **Commit to main**
5. Click **Push origin** (top right)

---

## PART 3 — Generate projects.json (first time)

Before pushing, run the build script once so `projects.json` exists:

1. Install Node.js if you don't have it: **https://nodejs.org** (LTS version)
2. Open a terminal in your portfolio folder:
   - Windows: right-click the folder → **Open in Terminal**
   - Mac: right-click → **New Terminal at Folder**
3. Run:
   ```
   node build.js
   ```
4. You'll see output like:
   ```
   [featured] 01-nexus-framework → "Nexus Combat Framework"
   ✅ projects.json written
   ```
5. A `projects.json` file will appear — include this when you push

> After the first time, GitHub Actions handles this automatically on every push.

---

## PART 4 — Enable GitHub Pages

### Step 6 — Turn on Pages
1. Go to your repo on GitHub: `https://github.com/YOUR-USERNAME/portfolio`
2. Click **Settings** (top tab)
3. Left sidebar → **Pages**
4. Under **Source** → select **Deploy from a branch**
5. Branch: **main** / Folder: **/ (root)**
6. Click **Save**

### Step 7 — Wait ~2 minutes
GitHub builds your site. You'll see a banner:

> ✅ Your site is live at https://YOUR-USERNAME.github.io/portfolio/

Click it — your portfolio is live.

---

## PART 5 — Adding Projects (ongoing workflow)

This is how you add a project from now on:

### To add a Featured project:
1. Create a new folder inside `projects/featured/`
2. Name it with a number prefix to control order: `02-player-vault/`
3. Inside it, create these files:

   **title.txt**
   ```
   PlayerVault Save System
   ```

   **tag.txt** ← short category shown on the card
   ```
   Data Systems
   ```

   **description.txt**
   ```
   Persistent player data built on ProfileService with session locking,
   schema migration, and real-time leaderboards. Zero data loss.
   ```

   **tags.txt** ← comma-separated
   ```
   ProfileService, DataStore2, Luau, ModuleScript
   ```

   Then drop in:
   - `icon.png` — thumbnail image for the card (any square image works)
   - `video.mp4` — optional preview video shown in the modal

4. Open GitHub Desktop → commit → push
5. GitHub Actions runs `build.js` automatically
6. Site updates in ~1–2 minutes

### To add a Gallery-only project (not featured):
Same thing but put the folder in `projects/gallery/` instead.

### To reorder projects:
Rename the folder prefix — `01-` → `03-` — and push.

### To remove a project:
Delete the folder → push → done.

---

## PART 6 — Custom Domain (optional)

If you want `prenze.dev` or similar instead of `github.io/portfolio`:

1. Buy a domain (Namecheap, Porkbun, Cloudflare Registrar)
2. In your repo root, create a file called `CNAME` containing just your domain:
   ```
   prenze.dev
   ```
3. In your domain registrar's DNS settings, add:
   - Type: `CNAME` | Name: `www` | Value: `YOUR-USERNAME.github.io`
   - Type: `A` | Name: `@` | Values (one per record):
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. In GitHub Pages settings, enter your custom domain and enable **Enforce HTTPS**
5. DNS propagates in 10–30 minutes

---

## Quick Reference

| Task | What to do |
|------|-----------|
| Add featured project | New folder in `projects/featured/` → push |
| Add gallery project | New folder in `projects/gallery/` → push |
| Reorder projects | Rename folder prefix (01, 02, 03…) → push |
| Remove project | Delete folder → push |
| Edit project details | Edit the .txt files inside the folder → push |
| Replace thumbnail | Replace `icon.png` in the folder → push |
| Check if site built | GitHub repo → **Actions** tab → see green checkmark |

---

## Troubleshooting

**Site shows 404**
→ Make sure your file is named `index.html` (not `prenze-portfolio.html`)
→ Make sure Pages is set to branch `main`, folder `/`

**Projects not showing**
→ Check Actions tab in GitHub for build errors
→ Make sure `projects.json` was committed (run `node build.js` locally first)

**Changes not live yet**
→ Wait 1–2 minutes after the Actions workflow finishes
→ Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

**Images not loading**
→ Make sure the image file is named exactly `icon.png` (lowercase)
→ Check it's inside the project folder, not outside it
