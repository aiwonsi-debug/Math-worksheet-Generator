#!/usr/bin/env python3
import os
import glob
import re

def enhance_svg(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    # Replace thick strokes with clean 1.8 stroke-width for balanced line art
    new_content = re.sub(r'stroke-width="2\.[0-9]+"', 'stroke-width="1.8"', content)
    new_content = re.sub(r'stroke-width="3\.[0-9]+"', 'stroke-width="1.8"', new_content)
    new_content = re.sub(r'stroke-width="1\.[0-6]"', 'stroke-width="1.8"', new_content)
    
    # If content changed, save back
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    bw_dir = os.path.join(project_root, "public", "emoji", "bw")
    
    svg_files = glob.glob(os.path.join(bw_dir, "*.svg"))
    updated_count = 0
    
    for filepath in svg_files:
        if enhance_svg(filepath):
            updated_count += 1
            
    print(f"✨ Enhanced {updated_count}/{len(svg_files)} B&W SVG cliparts with thin line art styling!")

if __name__ == "__main__":
    main()
