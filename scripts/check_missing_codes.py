#!/usr/bin/env python3
import re
import urllib.request
import os

def check_codes():
    lib_path = os.path.join("src", "utils", "clipartLibrary.js")
    with open(lib_path, "r", encoding="utf-8") as f:
        content = f.read()

    codes = set(re.findall(r"e\('([0-9a-fA-F_]+)'", content))
    print(f"Checking {len(codes)} clipart codes...")

    missing = []
    for c in sorted(codes):
        if c.startswith("ai_"):
            continue
        url = f"https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u{c}.svg"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=5) as resp:
                if resp.status != 200:
                    missing.append(c)
        except Exception as err:
            missing.append((c, str(err)))

    print("\nResult missing codes:")
    for item in missing:
        print("  -", item)

if __name__ == "__main__":
    check_codes()
