#!/usr/bin/env python3
import os
import glob
import math
from PIL import Image

def process_minimal_lineart(input_path, item_key, color_dir, bw_dir):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    width, height = img.size
    
    new_data = []
    for item in datas:
        r, g, b, a = item
        # Background near white
        if r > 230 and g > 230 and b > 230:
            new_data.append((255, 255, 255, 0))
        elif r < 120 and g < 120 and b < 120 and a > 100:
            # Bold black outline
            new_data.append((0, 0, 0, 255))
        else:
            # White fill inside outlines
            new_data.append((255, 255, 255, 255))
            
    img.putdata(new_data)
    
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    canvas = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    img.thumbnail((460, 460), Image.Resampling.LANCZOS)
    offset = ((512 - img.width) // 2, (512 - img.height) // 2)
    canvas.paste(img, offset, img)
    
    os.makedirs(color_dir, exist_ok=True)
    os.makedirs(bw_dir, exist_ok=True)
    
    bw_path = os.path.join(bw_dir, f"{item_key}.png")
    color_path = os.path.join(color_dir, f"{item_key}.png")
    
    canvas.save(bw_path, "PNG")
    canvas.save(color_path, "PNG")
    print(f"✅ Processed {item_key} -> {bw_path}")

def main():
    brain_dir = r"C:\Users\User\.gemini\antigravity-ide\brain\f27e8d84-85fc-4ca2-8608-6b7a72c1404d"
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    color_dir = os.path.join(project_root, "public", "emoji", "color")
    bw_dir = os.path.join(project_root, "public", "emoji", "bw")
    
    mapping = {
        "ai_school_bus": "ai_school_bus",
        "ai_backpack": "ai_backpack",
        "ai_pencil_character": "ai_pencil_character",
        "ai_apple_books": "ai_apple_books",
        "ai_cute_puppy": "ai_cute_puppy",
    }
    
    files = glob.glob(os.path.join(brain_dir, "ai_*.png"))
    for filepath in files:
        filename = os.path.basename(filepath)
        for key in mapping:
            if filename.startswith(key):
                process_minimal_lineart(filepath, mapping[key], color_dir, bw_dir)

if __name__ == "__main__":
    main()
