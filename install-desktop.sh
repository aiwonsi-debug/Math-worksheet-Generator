#!/usr/bin/env bash
# Desktop entry installation script for Math Worksheet Generator on Debian / Linux

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DESKTOP_DIR="$HOME/.local/share/applications"
DESKTOP_FILE="$DESKTOP_DIR/math-worksheet-generator.desktop"

mkdir -p "$DESKTOP_DIR"

cat <<EOF > "$DESKTOP_FILE"
[Desktop Entry]
Type=Application
Name=Math Worksheet Generator
Comment=Generate customizable math worksheets for elementary students
Exec=/bin/bash -c "cd '$SCRIPT_DIR' && ./run.sh"
Path=$SCRIPT_DIR
Icon=$SCRIPT_DIR/logo.png
Terminal=true
Categories=Education;Development;
Keywords=math;worksheet;generator;react;
EOF

chmod +x "$DESKTOP_FILE"
chmod +x "$SCRIPT_DIR/run.sh"

if command -v update-desktop-database &> /dev/null; then
    update-desktop-database "$DESKTOP_DIR" &> /dev/null || true
fi

echo "Desktop entry installed successfully to:"
echo "  $DESKTOP_FILE"
echo "You can now launch 'Math Worksheet Generator' from your Debian application menu!"
