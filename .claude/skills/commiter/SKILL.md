# SKILL: Commiter — Debmalya & Ankita Wedding Website

Automates the full git commit workflow: inspect → stage → message → commit → verify.

## Trigger

Use this skill when the user says "commit", "create a commit", "git commit", "save changes to git", or "create detailed git commit".

---

## Workflow

### Step 1 — Inspect the working tree

Run all three **in parallel**:

```bash
git status
git diff
git log --oneline -5
```

- `git status` — what is modified / untracked
- `git diff` — full diff of staged + unstaged changes
- `git log --oneline -5` — recent commit subjects to stay consistent with tone and emoji style

---

### Step 2 — Decide what to stage

Stage only files relevant to the current task. Prefer naming files explicitly over `git add -A` / `git add .`.

**Never stage:**
| Path / pattern | Reason |
|---|---|
| `_site/` | Jekyll build output — auto-generated |
| `.env`, `*.key`, `*.pem` | Secrets |
| `assets/video/landing.mp4` | Large binary — manage separately |
| Unrelated modified files | Keep commits focused |

---

### Step 3 — Write the commit message

#### Subject line format

```
<emoji> <imperative phrase> (≤ 72 characters)
```

- Imperative mood: "add", "fix", "remove" — **not** "added", "fixed"
- No period at the end
- Emoji always first

#### Emoji convention (this project)

| Emoji | When to use |
|---|---|
| ✨ | New feature or capability |
| 🐛 | Bug fix |
| 🔧 | Config, tooling, permissions, hooks |
| 📝 | Documentation, copy, content updates |
| ⭐ | Enhancement / improvement to existing feature |
| 🎨 | Style, CSS, UI polish (no logic change) |
| ♻️ | Refactor — behaviour unchanged |
| 🗑️ | Delete / remove files or dead code |
| 🔒 | Security fix |
| 📦 | Dependency or package changes |

#### Body format

Group changes by file or area with `##` headings and bullet points:

```
## _data/sections.json
- Added gallery and collages section arrays as single source of truth

## collages.html
- Replaced static filter buttons with dropdown controls
- Section options driven by Liquid loop over sections.json

## assets/js/gallery.js
- Added collages mode detected via .filter-dropdown--names presence
- Multi-select Sets for name/location; single-select for section
```

#### Trailer (always include)

```
Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

---

### Step 4 — Stage and commit

Use a HEREDOC to preserve multi-line formatting exactly:

```bash
git add <file1> <file2> ...

git commit -m "$(cat <<'EOF'
✨ short imperative description

## Area / File
- What changed and why
- ...

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

### Step 5 — Verify

Run `git status` after the commit to confirm the working tree is clean (or note any intentionally unstaged files).

---

## Hard Rules

- **NEVER amend** an existing commit — always create a new one
- **NEVER use `--no-verify`** to skip pre-commit hooks; fix the hook failure instead
- **NEVER force-push to `master`** — warn the user if requested
- **NEVER commit `_site/`** build output
- **NEVER commit secrets** (`.env`, API keys, credentials)
- Always use the **Co-Authored-By trailer**
- Always use **imperative mood** in the subject line
- Prefer **one focused commit per feature/fix** over one massive commit covering everything
- If the user asks for a "detailed" commit, include `##` section headings in the body
- If the user asks for a "short" commit, use subject line only (no body)
