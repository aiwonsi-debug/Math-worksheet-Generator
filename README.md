# Math Worksheet Generator

A customizable React + Vite application for generating, previewing, and exporting math worksheets for elementary students to PDF.

---

## 🐧 Debian / Linux Quick Start

### 1. Setup Dependencies
Run the automated Debian setup script to install system dependencies (`nodejs`, `npm`, `xdg-utils`) and npm packages:

```bash
./setup-debian.sh
# or using Makefile
make setup
```

### 2. Run Application
To start the application and automatically open your default browser (`http://localhost:5173`):

```bash
./run.sh
# or using Makefile / npm
make dev
# or
npm run dev
```

### 3. Desktop Integration (Optional)
To add a launcher to your Debian desktop environment application menu:

```bash
./install-desktop.sh
# or using Makefile
make install-desktop
```

---

## 🪟 Windows Quick Start

Double-click `run.bat` or run:

```cmd
npm run dev
```

---

## 🛠️ Available Commands

| Command | Description |
| :--- | :--- |
| `./setup-debian.sh` / `make setup` | Installs Debian system packages, npm dependencies & desktop shortcut |
| `./install-desktop.sh` / `make install-desktop` | Creates desktop application menu launcher |
| `./run.sh` / `make dev` | Starts dev server & opens default browser |
| `npm run build` / `make build` | Builds production dist bundle |
| `npm run preview` | Previews production build |
| `npm run lint` | Runs oxlint linter |
| `python generator.py topics/addition-within-10.json` | Runs automated TPT generator pipeline (PDFs, Cover, Bundle, Listing) |

---

## 🚀 TPT Automated Generator Pipeline (Python)

Generate complete, print-ready TPT product bundles (Worksheets, Answer Keys, Merged PDF Bundle, Square Cover PNG, and TPT Listing copy) in seconds from a single JSON topic configuration file.

### Usage
```bash
python generator.py topics/addition-within-10.json
```

### Topic Configurations
Topic JSON files are stored under `topics/` (e.g. `topics/addition-within-10.json`). Each topic file defines:
- **Topic metadata**: Title, subtitle, grade level, author, search tags
- **Math parameters**: Operation (`+`, `-`, `×`, `÷`), operand range, maximum sum/result, items per page (default: 12 in 3×4 grid), number of versions (default: 5)
- **Design tokens**: Mali Google Font integration, manipulative dot colors, header styles, answer key highlight colors
- **TPT Listing draft**: SEO title, bullet points, target audience, description, and keywords

### Output Structure
Outputs are created under `output/<topic-id>/`:
- `worksheets/`: Individual printable worksheet PDFs (Version 1-5)
- `answer_keys/`: Individual answer key PDFs with highlighted correct answers
- `addition-within-10-worksheets.pdf`: Merged worksheets bundle PDF
- `addition-within-10-answer-keys.pdf`: Merged answer keys bundle PDF
- `addition-within-10-complete.pdf`: Full combined bundle PDF (Worksheets + Answer Keys)
- `cover.png`: High-resolution 1200×1200 square cover image
- `listing.md`: TPT product title, bullet points, description, and tags
- `addition-within-10-bundle.zip`: Ready-to-upload ZIP package containing all assets

