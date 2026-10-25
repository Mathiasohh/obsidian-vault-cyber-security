# Git on Windows: Line Endings (`.gitattributes`) & Long Paths (`core.longpaths`)

## 1. Line Endings (`LF` vs. `CRLF`) & `.gitattributes`

### Why the problem happens
Different operating systems use different invisible characters to mark the end of a line:
- **Linux / macOS / Obsidian:** `LF` (Line Feed, `\n`)
- **Windows:** `CRLF` (Carriage Return + Line Feed, `\r\n`)

When you install Git for Windows, it sets `core.autocrlf=true` by default. That tells Git:
1. When **committing**, convert `CRLF` $\rightarrow$ `LF` in the Git repository.
2. When **checking out**, convert `LF` $\rightarrow$ `CRLF` in your local Windows folder.

Because **Obsidian always saves `.md` and `.json` files with `LF`** even on Windows, Git sees `LF` files in your working folder and warns:
```text
warning: in the working copy of '...', LF will be replaced by CRLF the next time Git touches it
```

Worse, if Git converts a file to `CRLF` on checkout and Obsidian re-saves part of it as `LF`, you get noisy "phantom diffs" where every line looks changed between commits.

### How `.gitattributes` fixes it
A `.gitattributes` file lives in the root of your repository and overrides local `core.autocrlf` settings for everyone (and every device) using the repo:

```gitattributes
# Auto-detect text files and keep LF line endings (matches Obsidian's native LF format)
* text=auto eol=lf

# Obsidian & text files
*.md text eol=lf
*.canvas text eol=lf
*.json text eol=lf
*.css text eol=lf
*.js text eol=lf
*.txt text eol=lf
*.svg text eol=lf

# Binary files (do not modify bytes)
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.webp binary
*.pdf binary
```

- **`text=auto`**: Tells Git to automatically detect text vs. binary files.
- **`eol=lf`**: Forces Git to keep `LF` both inside the repository **and** in your working folder on Windows, matching Obsidian's native format.
- **`binary`**: Ensures Git never mistakes byte sequences in images or PDFs for line endings and corrupts them.

### Useful commands
- **Check line endings of tracked files** (`i/` = index/repo, `w/` = working folder):
  ```powershell
  git ls-files --eol
  ```
- **Re-normalize all existing files** in a repo after adding `.gitattributes`:
  ```powershell
  git add --renormalize .
  ```

---

## 2. `Filename too long` on Windows (`core.longpaths`)

### Why the problem happens
Historically, the Windows API (`MAX_PATH`) limited full file paths (`C:\Users\...\file.pdf`) to **260 characters**.

When your folder structure plus filename exceeds 260 characters—for example:
```text
C:\Users\mathi\OneDrive\Obsidian\Cybersikkerhed-eaaa\Netværksarkitektur\NA - Materiale\NA - Bog\Kapitel 2 - Networking Appliances, Applications, and Functions\CompTIA Network+ N10-009 Cert Guide - Kapitel 2 - Networking Appliances, Aplications, and Funktions.pdf
```
*(265 characters)*—Git's default Windows file handler refuses to open it and throws:
```text
error: open("..."): Filename too long
fatal: adding files failed
```

### How `core.longpaths` fixes it
Git for Windows includes support for extended-length Windows paths (up to **32,767 characters**), but keeps it disabled by default for backwards compatibility with older Windows tools.

- **Enable for the current repository only** (stored in `.git/config`):
  ```powershell
  git config core.longpaths true
  ```
- **Enable globally for all Git repositories on your PC** (stored in `C:\Users\<username>\.gitconfig`):
  ```powershell
  git config --global core.longpaths true
  ```
- **Check all active Git settings**:
  ```powershell
  git config --list
  ```
