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
