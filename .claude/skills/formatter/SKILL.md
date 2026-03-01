---
name: formatter
description: Formats HTML, CSS, and JavaScript files in this project using Prettier. Use when asked to format, prettify, lint-fix, or tidy source files.
---

# Formatter Skill — Prettier

This skill runs [Prettier](https://prettier.io/) to enforce a consistent code style across all
HTML, CSS, and JavaScript source files in the project.

---

## 1. Tool

**Prettier** — an opinionated code formatter with zero configuration needed per-run.
Available via `npx prettier` (no local install required; uses the globally cached version).

---

## 2. Project Configuration

The project's Prettier config lives at `.prettierrc` in the repository root:

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": false,
  "trailingComma": "es5",
  "htmlWhitespaceSensitivity": "css",
  "endOfLine": "lf"
}
```

Files excluded from formatting are listed in `.prettierignore` (`.git/`, `.claude/`, `CLAUDE.md`).

---

## 3. Commands

### Format all source files (HTML + CSS + JS)

```bash
npx prettier --write "**/*.html" "assets/css/**/*.css" "assets/js/**/*.js"
```

### Format a single file

```bash
npx prettier --write <filepath>
```

### Check formatting without writing (CI / dry-run)

```bash
npx prettier --check "**/*.html" "assets/css/**/*.css" "assets/js/**/*.js"
```

---

## 4. Scope — What Gets Formatted

| Glob | Content |
| :--- | :--- |
| `**/*.html` | All HTML pages at the project root |
| `assets/css/**/*.css` | All CSS stylesheets |
| `assets/js/**/*.js` | All JavaScript files |

Files **not** formatted (per `.prettierignore`): `.git/`, `.claude/`, `CLAUDE.md`.

---

## 5. Workflow

When the user asks to format files:

1. Run the format-all command above from the project root (`e:/Personal Projects/website`).
2. Show the list of files Prettier modified.
3. If any file fails to parse, report the error and skip it — do not abort the whole run.
4. After formatting, stage and commit all changed files with a descriptive message such as:
   `style: format all source files with Prettier`.

---

## 6. Notes

- **Never** format files listed in `.prettierignore`.
- Prettier rewrites files in-place; always run from the project root so `.prettierrc` is picked up automatically.
- If Prettier is not available via `npx`, instruct the user to run `npm install -g prettier` or `npm install --save-dev prettier`.
- The `htmlWhitespaceSensitivity: "css"` setting preserves meaningful inline whitespace (e.g., inside `<a>` and `<span>`) without collapsing it unexpectedly.
