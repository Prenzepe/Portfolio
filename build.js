/**
 * build.js — PRENZE Portfolio Project Manifest Builder
 * Run: node build.js
 *
 * Scans projects/featured/ and projects/gallery/ and outputs projects.json
 * which the portfolio HTML reads at runtime.
 *
 * Folder structure per project:
 *   projects/
 *     featured/
 *       01-nexus-framework/
 *         title.txt          ← project title
 *         description.txt    ← full description shown in modal
 *         tags.txt           ← comma-separated tags e.g. Luau, RemoteEvents
 *         tag.txt            ← short category label e.g. "Game Systems"
 *         icon.png           ← thumbnail (also accepts .jpg .jpeg .webp .gif)
 *         video.mp4          ← preview video (optional, also accepts .webm)
 *     gallery/
 *       02-player-vault/
 *         ...same structure...
 *
 * Folder name prefix (01-, 02-) controls display order.
 * Featured folders also appear in the gallery automatically.
 */

const fs   = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, 'projects');
const OUT_FILE     = path.join(__dirname, 'projects.json');

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
const VIDEO_EXTS = ['.mp4', '.webm'];

// ── Read a text file, return trimmed string or fallback
function readText(dir, filename, fallback = '') {
  const full = path.join(dir, filename);
  return fs.existsSync(full) ? fs.readFileSync(full, 'utf-8').trim() : fallback;
}

// ── Find first matching file by extension list, return relative web path or null
function findMedia(dir, webDir, exts) {
  const files = fs.readdirSync(dir);
  for (const ext of exts) {
    const match = files.find(f => f.toLowerCase().endsWith(ext));
    if (match) return `${webDir}/${match}`;
  }
  return null;
}

// ── Parse a folder into a project object
function parseFolder(folderPath, webDir) {
  const title = readText(folderPath, 'title.txt', path.basename(folderPath).replace(/^\d+-/, '').replace(/-/g, ' '));
  const desc  = readText(folderPath, 'description.txt', 'No description provided.');
  const tag   = readText(folderPath, 'tag.txt', 'Project');

  // Tags — comma-separated or one per line
  const rawTags = readText(folderPath, 'tags.txt', '');
  const tags = rawTags
    ? rawTags.split(/[\n,]/).map(t => t.trim()).filter(Boolean)
    : [];

  const icon       = findMedia(folderPath, webDir, IMAGE_EXTS);
  const video      = findMedia(folderPath, webDir, VIDEO_EXTS);
  const mediaType  = video ? 'video' : icon ? 'image' : null;
  const media      = video || icon || null;

  return { title, desc, tag, tags, icon, media, mediaType };
}

// ── Scan a section directory (featured or gallery)
function scanSection(sectionName) {
  const sectionDir = path.join(PROJECTS_DIR, sectionName);

  if (!fs.existsSync(sectionDir)) {
    console.log(`  [skip] projects/${sectionName}/ not found — creating it`);
    fs.mkdirSync(sectionDir, { recursive: true });
    return [];
  }

  const folders = fs.readdirSync(sectionDir)
    .filter(f => fs.statSync(path.join(sectionDir, f)).isDirectory())
    .sort(); // numeric prefix ensures correct order

  const projects = folders.map(folder => {
    const folderPath = path.join(sectionDir, folder);
    const webDir     = `projects/${sectionName}/${folder}`;
    const project    = parseFolder(folderPath, webDir);
    console.log(`  [${sectionName}] ${folder} → "${project.title}"`);
    return project;
  });

  return projects;
}

// ── Main
console.log('\n🔨 Building projects.json...\n');

const featured = scanSection('featured');
const gallery  = scanSection('gallery');

const manifest = {
  generated: new Date().toISOString(),
  featured,
  gallery,
};

fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2));

console.log(`\n✅ projects.json written`);
console.log(`   Featured : ${featured.length} project(s)`);
console.log(`   Gallery  : ${gallery.length} project(s)`);
console.log(`   Total    : ${featured.length + gallery.length} project(s)\n`);
