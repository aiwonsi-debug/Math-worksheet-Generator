#!/usr/bin/env python3
import os
import re

def main():
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    lib_path = os.path.join(project_root, "src", "utils", "clipartLibrary.js")
    bw_dir = os.path.join(project_root, "public", "emoji", "bw")
    color_dir = os.path.join(project_root, "public", "emoji", "color")

    with open(lib_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract e('code', 'name', 'ext') or e('code', 'name')
    matches = re.findall(r"e\(['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"](?:\s*,\s*['\"]([^'\"]+)['\"])?", content)

    print(f"Total items registered in clipartLibrary.js: {len(matches)}\n")

    missing_bw = []
    missing_color = []

    for code, name, ext in matches:
        ext = ext or "svg"
        bw_file = os.path.join(bw_dir, f"{code}.{ext}")
        color_file = os.path.join(color_dir, f"{code}.{ext}")

        if not os.path.exists(bw_file):
            missing_bw.append((code, name, ext))
        if not os.path.exists(color_file):
            missing_color.append((code, name, ext))

    print(f"❌ Missing in public/emoji/bw/ ({len(missing_bw)}):")
    for code, name, ext in missing_bw:
        print(f"   - {code}.{ext} ({name})")

    print(f"\n❌ Missing in public/emoji/color/ ({len(missing_color)}):")
    for code, name, ext in missing_color:
        print(f"   - {code}.{ext} ({name})")

if __name__ == "__main__":
    main()
