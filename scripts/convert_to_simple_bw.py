#!/usr/bin/env python3
"""
Converts SVGs in public/emoji/bw/ into thin, clean, delicate line art (AI Halloween Special style).
- Thin crisp strokes: stroke="#000000", stroke-width="1.2"
- Clean white fill: fill="#ffffff" or fill="none"
- Removes redundant shadow/highlight overlays
"""

import os
import glob
import re

def is_dark_color(hex_str):
    """Check if color is dark (eyes, facial details)"""
    hex_str = hex_str.lstrip('#').lower()
    if len(hex_str) == 3:
        hex_str = "".join([c*2 for c in hex_str])
    if len(hex_str) != 6:
        return False
    try:
        r = int(hex_str[0:2], 16)
        g = int(hex_str[2:4], 16)
        b = int(hex_str[4:6], 16)
        return (r + g + b) < 180
    except ValueError:
        return False

def convert_svg_content_to_thin_lineart(svg_content, stroke_w="1.2"):
    """Transforms SVG content into thin, clean line art outlines"""
    
    # 1. Remove opacity shadow layers & gradient overlays
    svg_content = re.sub(r'<path[^>]*opacity=["\']0\.[0-9]+["\'][^>]*/>', '', svg_content)
    svg_content = re.sub(r'<g[^>]*opacity=["\']0\.[0-9]+["\'][^>]*>.*?</g>', '', svg_content, flags=re.DOTALL)

    # 2. Process paths/shapes to use thin stroke line art
    def transform_tag(match):
        tag_str = match.group(0)
        
        fill_val = None
        style_match = re.search(r'style=["\']([^"\']*)["\']', tag_str)
        fill_match = re.search(r'fill=["\']([^"\']*)["\']', tag_str)
        
        if style_match:
            style_content = style_match.group(1)
            f_in_style = re.search(r'fill:\s*([^;]+)', style_content)
            if f_in_style:
                fill_val = f_in_style.group(1).strip()
        if not fill_val and fill_match:
            fill_val = fill_match.group(1).strip()
            
        if not fill_val:
            fill_val = "#000000"

        if fill_val.lower() == "none":
            new_fill = "none"
            new_stroke = "#000000"
            sw = stroke_w
        elif is_dark_color(fill_val):
            new_fill = "#000000"
            new_stroke = "none"
            sw = "0"
        else:
            new_fill = "#ffffff"
            new_stroke = "#000000"
            sw = stroke_w

        if new_stroke != "none":
            new_style_attr = f'fill="{new_fill}" stroke="{new_stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"'
        else:
            new_style_attr = f'fill="{new_fill}"'

        cleaned_tag = re.sub(r'\s*style=["\'][^"\']*["\']', '', tag_str)
        cleaned_tag = re.sub(r'\s*fill=["\'][^"\']*["\']', '', cleaned_tag)
        cleaned_tag = re.sub(r'\s*stroke=["\'][^"\']*["\']', '', cleaned_tag)
        cleaned_tag = re.sub(r'\s*stroke-width=["\'][^"\']*["\']', '', cleaned_tag)
        cleaned_tag = re.sub(r'\s*stroke-linecap=["\'][^"\']*["\']', '', cleaned_tag)
        cleaned_tag = re.sub(r'\s*stroke-linejoin=["\'][^"\']*["\']', '', cleaned_tag)

        if cleaned_tag.endswith('/>'):
            return cleaned_tag[:-2] + ' ' + new_style_attr + '/>'
        elif cleaned_tag.endswith('>'):
            return cleaned_tag[:-1] + ' ' + new_style_attr + '>'
        return tag_str

    svg_content = re.sub(r'<(path|circle|rect|polygon|polyline|ellipse)[^>]*>', transform_tag, svg_content)
    return svg_content

def main():
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    color_dir = os.path.join(project_root, "public", "emoji", "color")
    bw_dir = os.path.join(project_root, "public", "emoji", "bw")
    
    # Process all SVGs in bw_dir and color_dir
    bw_files = glob.glob(os.path.join(bw_dir, "*.svg"))
    color_files = glob.glob(os.path.join(color_dir, "*.svg"))
    
    all_filenames = set([os.path.basename(p) for p in (bw_files + color_files)])
    print(f"✨ Converting {len(all_filenames)} SVGs into clean, crisp line art with viewBox-normalized stroke width...\n")
    
    converted_count = 0
    for filename in sorted(all_filenames):
        if filename.startswith("ai_"):
            continue
            
        color_path = os.path.join(color_dir, filename)
        bw_path = os.path.join(bw_dir, filename)
        
        # Read from color_path if exists, else bw_path
        source_path = color_path if os.path.exists(color_path) else bw_path
            
        with open(source_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        stroke_w = "3.8"
            
        thin_svg = convert_svg_content_to_thin_lineart(content, stroke_w=stroke_w)
        
        with open(bw_path, 'w', encoding='utf-8') as f:
            f.write(thin_svg)
            
        converted_count += 1

    print(f"🎉 Successfully converted {converted_count} SVGs into bold, clean B&W line art!")

if __name__ == "__main__":
    main()
