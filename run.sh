#!/usr/bin/env bash
# Debian / Linux startup script for Math Worksheet Generator

set -e

# Change directory to script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Ensure local user binaries are in PATH
export PATH="$SCRIPT_DIR/.node/bin:$HOME/.local/bin:$PATH"

echo "=== Math Worksheet Generator (Debian / Linux) ==="

# Check for Node.js and npm
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    echo "Please run ./setup-debian.sh or install Node.js using:"
    echo "  sudo apt update && sudo apt install -y nodejs npm"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed."
    echo "Please run ./setup-debian.sh or install npm using:"
    echo "  sudo apt update && sudo apt install -y npm"
    exit 1
fi

# Check node_modules
if [ ! -d "node_modules" ]; then
    echo "node_modules not found. Running npm install..."
    npm install
fi

# Function to open browser after server starts
open_browser() {
    sleep 2
    URL="http://localhost:5173"
    if command -v xdg-open &> /dev/null; then
        xdg-open "$URL" &> /dev/null &
    elif command -v sensible-browser &> /dev/null; then
        sensible-browser "$URL" &> /dev/null &
    elif command -v x-www-browser &> /dev/null; then
        x-www-browser "$URL" &> /dev/null &
    elif command -v gnome-open &> /dev/null; then
        gnome-open "$URL" &> /dev/null &
    else
        echo "Please open $URL in your browser."
    fi
}

open_browser &

echo "Starting Vite development server..."
npm run dev -- --host 0.0.0.0 --port 5173
