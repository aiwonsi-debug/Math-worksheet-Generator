#!/usr/bin/env python3
"""
Noto Emoji Clipart Generator & Downloader Script
Downloads SVG cliparts from Google Noto Emoji repository on GitHub
and places them in public/emoji/color/ and public/emoji/bw/
"""

import sys
import os
import re
import urllib.request
import argparse

NOTO_EMOJI_BASE_URL = "https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/"

def char_to_hex(char_str):
    """Convert emoji character(s) to hex codepoint string like 1f34e"""
    codepoints = [f"{ord(c):x}" for c in char_str]
    return "_".join(codepoints)

def extract_codes_from_file(filepath):
    """Extract emoji codes from JS files"""
    if not os.path.exists(filepath):
        return set()
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    codes1 = re.findall(r"e\('([0-9a-fA-F_]+)'", content)
    codes2 = re.findall(r"code:\s*['\"]([0-9a-fA-F_]+)['\"]", content)
    return set(c.lower() for c in (codes1 + codes2))

def get_possible_urls(code):
    """Return possible Noto Emoji GitHub URLs for a given hex code"""
    code_clean = code.lower()
    # Noto Emoji repo uses emoji_u1f34e.svg or emoji_u2b50.svg
    urls = [
        f"{NOTO_EMOJI_BASE_URL}emoji_u{code_clean}.svg",
    ]

    # Handle multi-codepoint or zero-padded alternatives if needed
    parts = code_clean.split('_')
    if len(parts) == 1:
        # try 4-digit zero padding if length < 4
        padded = f"{int(parts[0], 16):04x}"
        if padded != code_clean:
            urls.append(f"{NOTO_EMOJI_BASE_URL}emoji_u{padded}.svg")
    return urls

def download_emoji(code, color_dir, bw_dir, force=False):
    """Download single emoji SVG into color and bw directories"""
    color_path = os.path.join(color_dir, f"{code}.svg")
    bw_path = os.path.join(bw_dir, f"{code}.svg")

    if not force and os.path.exists(color_path) and os.path.exists(bw_path):
        return True, "Already exists"

    urls = get_possible_urls(code)
    svg_data = None
    success_url = None

    for url in urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                if resp.status == 200:
                    svg_data = resp.read()
                    success_url = url
                    break
        except Exception:
            continue

    if not svg_data:
        return False, f"Could not fetch from GitHub ({code})"

    # Save to color dir
    os.makedirs(color_dir, exist_ok=True)
    with open(color_path, 'wb') as f:
        f.write(svg_data)

    # Save to bw dir (or copy clean SVG which renders crisp in B&W mode)
    os.makedirs(bw_dir, exist_ok=True)
    with open(bw_path, 'wb') as f:
        f.write(svg_data)

    return True, f"Downloaded from {success_url}"

def main():
    parser = argparse.ArgumentParser(description="Fetch Noto Emoji cliparts from GitHub")
    parser.add_argument("codes", nargs="*", help="Emoji hex codes (e.g. 1f34e) or characters (e.g. 🍎)")
    parser.add_argument("--all", action="store_true", help="Download all configured cliparts from clipartLibrary.js & themeConfig.js")
    parser.add_argument("--force", action="store_true", help="Force redownload existing files")
    args = parser.parse_args()

    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    color_dir = os.path.join(project_root, "public", "emoji", "color")
    bw_dir = os.path.join(project_root, "public", "emoji", "bw")

    target_codes = set()

    if args.all or not args.codes:
        lib_path = os.path.join(project_root, "src", "utils", "clipartLibrary.js")
        theme_path = os.path.join(project_root, "src", "config", "themeConfig.js")
        extracted = extract_codes_from_file(lib_path).union(extract_codes_from_file(theme_path))
        target_codes.update(extracted)
        print(f"📦 Scanned configuration files: found {len(extracted)} clipart codes.")

    for item in args.codes:
        if re.match(r"^[0-9a-fA-F_]+$", item):
            target_codes.add(item.lower())
        else:
            hex_code = char_to_hex(item)
            target_codes.add(hex_code)
            print(f"🔤 Converted '{item}' -> '{hex_code}'")

    if not target_codes:
        print("No codes specified to fetch.")
        return

    print(f"\n🚀 Downloading {len(target_codes)} cliparts from Google Noto Emoji GitHub...\n")

    success_count = 0
    fail_count = 0

    for code in sorted(target_codes):
        ok, msg = download_emoji(code, color_dir, bw_dir, force=args.force)
        if ok:
            success_count += 1
            print(f"  ✅ {code}: {msg}")
        else:
            fail_count += 1
            print(f"  ❌ {code}: {msg}")

    print("\n" + "="*50)
    print(f"✨ Done! Total: {len(target_codes)} | Success: {success_count} | Failed: {fail_count}")
    print(f"📁 SVGs saved to: {color_dir} & {bw_dir}")
    print("="*50)

if __name__ == "__main__":
    main()
