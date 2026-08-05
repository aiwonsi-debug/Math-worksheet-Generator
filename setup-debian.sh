#!/usr/bin/env bash
# Setup script for Math Worksheet Generator on Debian / Ubuntu systems

set -e

export PATH="$HOME/.local/bin:$PATH"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==============================================="
echo " Setting up Math Worksheet Generator for Debian "
echo "==============================================="

# Detect Debian / Ubuntu
if [ -f /etc/debian_version ]; then
    echo "Detected Debian system (version: $(cat /etc/debian_version))"
else
    echo "Warning: System does not appear to be Debian-based, but proceeding anyway."
fi

# Check system dependencies
install_packages() {
    MISSING_PKGS=()
    if ! command -v node &> /dev/null; then MISSING_PKGS+=("nodejs"); fi
    if ! command -v npm &> /dev/null; then MISSING_PKGS+=("npm"); fi
    if ! command -v xdg-open &> /dev/null; then MISSING_PKGS+=("xdg-utils"); fi
    if ! dpkg -l | grep -q fonts-noto-color-emoji; then MISSING_PKGS+=("fonts-noto-color-emoji"); fi
    if ! dpkg -l | grep -q fonts-comic-neue; then MISSING_PKGS+=("fonts-comic-neue"); fi
    if ! dpkg -l | grep -q fonts-inter; then MISSING_PKGS+=("fonts-inter"); fi
    if ! dpkg -l | grep -q fonts-roboto; then MISSING_PKGS+=("fonts-roboto"); fi
    if ! dpkg -l | grep -q fonts-freefont-ttf; then MISSING_PKGS+=("fonts-freefont-ttf"); fi

    if [ ${#MISSING_PKGS[@]} -gt 0 ]; then
        echo "Missing required system packages/fonts: ${MISSING_PKGS[*]}"
        if [ "$(id -u)" -eq 0 ]; then
            apt-get update && apt-get install -y "${MISSING_PKGS[@]}"
        elif command -v sudo &> /dev/null; then
            echo "Requesting sudo permissions to install required packages and fonts..."
            sudo apt-get update && sudo apt-get install -y "${MISSING_PKGS[@]}"
        else
            echo "Error: Cannot install packages without root or sudo permissions."
            echo "Please ask an administrator to run:"
            echo "  apt-get update && apt-get install -y ${MISSING_PKGS[*]}"
            exit 1
        fi
    else
        echo "All system dependencies and font packages are satisfied."
    fi
}

install_packages

echo ""
echo "Installing Node.js packages via npm..."
npm install

echo ""
echo "Making shell scripts executable..."
chmod +x "$SCRIPT_DIR/run.sh" "$SCRIPT_DIR/setup-debian.sh" "$SCRIPT_DIR/install-desktop.sh"

echo ""
echo "Installing desktop launcher shortcut..."
"$SCRIPT_DIR/install-desktop.sh" || true

echo ""
echo "==============================================="
echo " Setup complete!"
echo " To start the application, run:"
echo "   ./run.sh   (or npm run dev / make dev)"
echo "==============================================="
