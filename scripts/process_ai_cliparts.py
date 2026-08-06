#!/usr/bin/env python3
"""
AI Minimal Line Art Clipart Processor
Converts minimalist line art AI images into clean coloring-book outline cliparts for B&W worksheets.
"""

import os
import glob
from PIL import Image

def process_minimal_lineart(input_path, item_key, color_dir, bw_dir):
    """
    Processes minimal line art image:
    1. Removes white background
    2. Keeps pure black outlines and white interior fills
    3. Saves transparent PNG for B&W worksheets & Color worksheets
    """
    img = Image.open(input_path).convert("RGBA")
    
    # Remove white outer background
    datas = img.get_flattened_data() if hasattr(img, 'get_flattened_data') else img.getdata()
    width, height = img.size
    
    # Flood fill outer background transparency starting from corners
    # Convert outer near-white pixels to transparent
    new_data = []
    for item in datas:
        r, g, b, a = item
        # If very bright near-white (background)
        if r > 240 and g > 240 and b > 240:
            new_data.append((255, 255, 255, 0))
        elif r < 100 and g < 100 and b < 100:
            # Bold black line stroke
            new_data.append((0, 0, 0, 255))
        else:
            # Crisp white interior fill (coloring-book style)
            new_data.append((255, 255, 255, 255))
            
    img.putdata(new_data)
    
    # Crop to content bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    # Center in 512x512 canvas
    canvas = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    img.thumbnail((470, 470), Image.Resampling.LANCZOS)
    offset = ((512 - img.width) // 2, (512 - img.height) // 2)
    canvas.paste(img, offset, img)
    
    os.makedirs(color_dir, exist_ok=True)
    os.makedirs(bw_dir, exist_ok=True)
    
    bw_path = os.path.join(bw_dir, f"{item_key}.png")
    color_path = os.path.join(color_dir, f"{item_key}.png")
    
    canvas.save(bw_path, "PNG")
    canvas.save(color_path, "PNG")
    
    print(f"  ✅ Simple B&W Line Art saved: {bw_path}")

def main():
    brain_dir = r"C:\Users\User\.gemini\antigravity-ide\brain\460b2e56-5080-4d76-a13b-90e13ab67ada"
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    color_dir = os.path.join(project_root, "public", "emoji", "color")
    bw_dir = os.path.join(project_root, "public", "emoji", "bw")
    
    items = [
        ("halloween_minimal_ghost_*.png", "ai_ghost"),
        ("halloween_minimal_cauldron_*.png", "ai_cauldron"),
        ("halloween_minimal_witch_hat_*.png", "ai_witch_hat"),
        ("halloween_minimal_cat_*.png", "ai_pumpkin_cat"),
    ]
    
    print("\n✨ Processing Minimal Coloring-Book Line Art Cliparts...\n")
    
    for pattern, key in items:
        matches = glob.glob(os.path.join(brain_dir, pattern))
        if matches:
            process_minimal_lineart(matches[0], key, color_dir, bw_dir)
        else:
            print(f"  ⚠️ No image file found matching pattern '{pattern}'")

    print("\n🎉 Done generating simple minimal line art cliparts!")

if __name__ == "__main__":
    main()
