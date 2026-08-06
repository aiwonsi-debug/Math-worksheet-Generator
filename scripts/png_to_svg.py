#!/usr/bin/env python3
"""
Pure Python Line Art Image to Clean SVG Vector Converter
Traces bitmap line art images into infinitely scalable SVG vector paths.
"""

import sys
import os
import glob
import math
from PIL import Image

def ramer_douglas_peucker(points, epsilon):
    """Simplifies polyline points using Ramer-Douglas-Peucker algorithm"""
    if len(points) < 3:
        return points

    dmax = 0
    index = 0
    end = len(points) - 1

    x1, y1 = points[0]
    x2, y2 = points[end]
    
    dx = x2 - x1
    dy = y2 - y1
    denom = math.sqrt(dx * dx + dy * dy)

    for i in range(1, end):
        px, py = points[i]
        if denom == 0:
            d = math.sqrt((px - x1)**2 + (py - y1)**2)
        else:
            d = abs(dy * px - dx * py + x2 * y1 - y2 * x1) / denom
        if d > dmax:
            index = i
            dmax = d

    if dmax > epsilon:
        rec1 = ramer_douglas_peucker(points[:index+1], epsilon)
        rec2 = ramer_douglas_peucker(points[index:], epsilon)
        return rec1[:-1] + rec2
    else:
        return [points[0], points[end]]

def trace_image_to_svg_vector(input_path, output_path):
    """
    Traces black line art image into clean scalable SVG vector file.
    """
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Threshold black line pixels (r, g, b < 100 and a > 100)
    grid = []
    for y in range(height):
        row = []
        for x in range(width):
            r, g, b, a = img.getpixel((x, y))
            is_black = (r < 120 and g < 120 and b < 120 and a > 120)
            row.append(1 if is_black else 0)
        grid.append(row)

    visited = set()
    paths = []

    # Simple 8-neighbor boundary tracing
    for y in range(height):
        for x in range(width):
            if grid[y][x] == 1 and (x, y) not in visited:
                # Trace contour
                contour = []
                curr_x, curr_y = x, y
                
                # Simple walk
                while (curr_x, curr_y) not in visited:
                    visited.add((curr_x, curr_y))
                    contour.append((curr_x, curr_y))
                    
                    found_next = False
                    for dx, dy in [(-1,0), (1,0), (0,-1), (0,1), (-1,-1), (1,1), (-1,1), (1,-1)]:
                        nx, ny = curr_x + dx, curr_y + dy
                        if 0 <= nx < width and 0 <= ny < height:
                            if grid[ny][nx] == 1 and (nx, ny) not in visited:
                                curr_x, curr_y = nx, ny
                                found_next = True
                                break
                    if not found_next:
                        break
                        
                if len(contour) > 4:
                    simplified = ramer_douglas_peucker(contour, 1.2)
                    paths.append(simplified)

    # Build SVG content
    svg_lines = [
        f'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">'
    ]
    
    for path in paths:
        if not path:
            continue
        d_pts = [f"M {path[0][0]} {path[0][1]}"]
        for px, py in path[1:]:
            d_pts.append(f"L {px} {py}")
        d_str = " ".join(d_pts)
        svg_lines.append(f'  <path d="{d_str}" fill="none" stroke="black" stroke-width="8.8" stroke-linecap="round" stroke-linejoin="round"/>')

    svg_lines.append('</svg>')

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(svg_lines))

    print(f"  ✅ Converted vector SVG: {output_path} ({len(paths)} paths)")

def main():
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    
    # Convert AI images into true vector SVGs
    items = [
        "ai_ghost", "ai_cauldron", "ai_witch_hat", "ai_pumpkin_cat",
        "ai_school_bus", "ai_backpack", "ai_pencil_character", "ai_apple_books", "ai_cute_puppy"
    ]
    
    for item in items:
        bw_png = os.path.join(project_root, "public", "emoji", "bw", f"{item}.png")
        color_png = os.path.join(project_root, "public", "emoji", "color", f"{item}.png")
        
        bw_svg = os.path.join(project_root, "public", "emoji", "bw", f"{item}.svg")
        color_svg = os.path.join(project_root, "public", "emoji", "color", f"{item}.svg")
        
        if os.path.exists(bw_png):
            trace_image_to_svg_vector(bw_png, bw_svg)
        if os.path.exists(color_png):
            trace_image_to_svg_vector(color_png, color_svg)

if __name__ == "__main__":
    main()
