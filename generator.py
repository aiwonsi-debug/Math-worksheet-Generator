import os
import sys
import json
import random
import zipfile
import asyncio
from pathlib import Path
from pypdf import PdfWriter

# Force UTF-8 stdout on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

def generate_problems(config):
    op_min = config.get("operand_min", 0)
    op_max = config.get("operand_max", 10)
    max_sum = config.get("max_sum", 10)
    items_per_page = config.get("items_per_page", 12)
    num_versions = config.get("num_versions", 5)

    all_possible = []
    for a in range(op_min, op_max + 1):
        for b in range(op_min, op_max + 1):
            if a + b <= max_sum:
                all_possible.append((a, b))

    versions = []
    for v in range(1, num_versions + 1):
        random.seed(42 + v * 101)  # Reproducible seed per version
        selected = []
        # Ensure balanced distribution
        shuffled = list(all_possible)
        random.shuffle(shuffled)
        
        while len(selected) < items_per_page:
            for p in shuffled:
                if len(selected) < items_per_page:
                    selected.append(p)
                else:
                    break
        versions.append((v, selected))
    return versions

def render_dots_svg(count, color):
    if count <= 0:
        return ""
    
    dots_html = []
    # Grid arrangement: max 5 per row
    rows = []
    remaining = count
    while remaining > 0:
        rows.append(min(remaining, 5))
        remaining -= 5

    for r in rows:
        row_dots = "".join([
            f'<div class="dot" style="background-color: {color};"></div>'
            for _ in range(r)
        ])
        dots_html.append(f'<div class="dot-row">{row_dots}</div>')
    
    return f'<div class="dots-group">{"".join(dots_html)}</div>'

def generate_worksheet_html(version, problems, config, is_answer_key=False):
    title = config["title"]
    subtitle = config["subtitle"]
    author = config.get("author", "Attapol.k")
    footer = config.get("footer", f"Created by {author} · For classroom or home use")
    theme = config.get("theme", {})
    primary_color = theme.get("primary_color", "#4C4592")
    dot_colors = theme.get("dot_colors", ["#F5A623", "#E53935"])
    card_border = theme.get("card_border", "#C4C0E5")
    
    page_title = f"{title} — Answer Key" if is_answer_key else title

    grid_items = []
    for idx, (a, b) in enumerate(problems, 1):
        sum_val = a + b
        left_dots = render_dots_svg(a, dot_colors[0])
        right_dots = render_dots_svg(b, dot_colors[1])
        
        if is_answer_key:
            eq_text = f'{a} + {b} = <span class="answer-val">{sum_val}</span>'
            dots_markup = ""
            card_class = "card answer-card"
        else:
            eq_text = f'{a} + {b} = <span class="blank-line">___</span>'
            card_class = "card"
            
            # Manipulative layout logic
            if a > 0 and b > 0:
                dots_markup = f'''
                <div class="manipulatives-row">
                    {left_dots}
                    <div class="plus-sign">+</div>
                    {right_dots}
                </div>
                '''
            elif a > 0 and b == 0:
                dots_markup = f'''
                <div class="manipulatives-row">
                    {left_dots}
                    <div class="plus-sign">+</div>
                </div>
                '''
            elif a == 0 and b > 0:
                dots_markup = f'''
                <div class="manipulatives-row">
                    <div class="plus-sign">+</div>
                    {right_dots}
                </div>
                '''
            else:
                dots_markup = f'''
                <div class="manipulatives-row">
                    <div class="plus-sign">+</div>
                </div>
                '''

        grid_items.append(f'''
        <div class="{card_class}">
            <div class="card-num">#{idx}</div>
            <div class="equation">{eq_text}</div>
            {dots_markup}
            <div class="card-line"></div>
        </div>
        ''')

    header_meta = ""
    if not is_answer_key:
        header_meta = '''
        <div class="student-meta">
            <span>Name: ______________________</span>
            <span>Date: __________</span>
        </div>
        '''

    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{page_title} - Version {version}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Mali:wght@400;600;700&display=swap');
        
        @page {{
            size: letter portrait;
            margin: 12mm 15mm 12mm 15mm;
        }}

        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}

        body {{
            font-family: 'Mali', sans-serif;
            color: #333333;
            background: #ffffff;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }}

        .header {{
            text-align: center;
            margin-bottom: 12px;
        }}

        .header h1 {{
            color: {primary_color};
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 2px;
        }}

        .header .subtitle {{
            color: #666666;
            font-size: 13px;
            font-weight: 400;
        }}

        .student-meta {{
            display: flex;
            justify-content: space-between;
            margin-top: 14px;
            padding: 0 8px;
            font-size: 14px;
            color: #444444;
        }}

        .grid {{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(4, 1fr);
            gap: 14px;
            margin-bottom: 12px;
        }}

        .card {{
            border: 2px dashed {card_border};
            border-radius: 16px;
            padding: 12px 10px 8px 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 175px;
            position: relative;
            background: #ffffff;
        }}

        .answer-card {{
            background-color: #EBF7ED;
            border: 2px dashed #A3E0B2;
            height: 175px;
            justify-content: center;
            gap: 8px;
        }}

        .card-num {{
            font-size: 15px;
            font-weight: 700;
            color: #555555;
        }}

        .equation {{
            font-size: 22px;
            font-weight: 700;
            color: #222222;
            margin-top: 2px;
        }}

        .blank-line {{
            color: #555555;
        }}

        .answer-val {{
            color: #2E7D32;
            font-weight: 700;
        }}

        .manipulatives-row {{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: 6px;
            min-height: 44px;
        }}

        .dots-group {{
            display: flex;
            flex-direction: column;
            gap: 4px;
            align-items: center;
        }}

        .dot-row {{
            display: flex;
            gap: 5px;
        }}

        .dot {{
            width: 14px;
            height: 14px;
            border-radius: 50%;
            display: inline-block;
        }}

        .plus-sign {{
            font-size: 18px;
            font-weight: 700;
            color: #666666;
        }}

        .card-line {{
            width: 90%;
            height: 1.5px;
            background-color: #D1D5DB;
            margin-top: auto;
        }}

        .footer {{
            text-align: center;
            font-size: 11px;
            color: #888888;
            padding-top: 4px;
        }}
    </style>
</head>
<body>
    <div>
        <div class="header">
            <h1>{page_title}</h1>
            <div class="subtitle">{subtitle} · Version {version}</div>
            {header_meta}
        </div>

        <div class="grid">
            {"".join(grid_items)}
        </div>
    </div>

    <div class="footer">
        {footer}
    </div>
</body>
</html>
'''
    return html_content

def generate_cover_html(config):
    title = config["title"]
    subtitle = config["subtitle"]
    theme = config.get("theme", {})
    primary_color = theme.get("primary_color", "#4C4592")
    cover_dots = config.get("cover", {}).get("dots", ["#F5B000", "#E53935", "#E53935", "#E59400"])
    pill_text = config.get("cover", {}).get("pill_text", "Addition within 10 • Number sense • Basic facts fluency")

    dots_html = "".join([
        f'<div class="cover-dot" style="background-color: {c};"></div>'
        for c in cover_dots
    ])

    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cover - {title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Mali:wght@400;600;700&display=swap');
        
        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}

        body {{
            font-family: 'Mali', sans-serif;
            width: 1200px;
            height: 1200px;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px;
            text-align: center;
        }}

        .title {{
            font-size: 64px;
            font-weight: 700;
            color: {primary_color};
            margin-bottom: 12px;
            letter-spacing: -0.5px;
        }}

        .subtitle {{
            font-size: 32px;
            font-weight: 400;
            color: #666666;
            margin-bottom: 50px;
        }}

        .dots-row {{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 24px;
            margin-bottom: 60px;
        }}

        .cover-dot {{
            width: 48px;
            height: 48px;
            border-radius: 50%;
        }}

        .pill-badge {{
            background-color: {primary_color};
            color: #ffffff;
            font-size: 22px;
            font-weight: 600;
            padding: 16px 40px;
            border-radius: 50px;
            box-shadow: 0 4px 14px rgba(76, 69, 146, 0.25);
            display: inline-block;
        }}
    </style>
</head>
<body>
    <div class="title">{title}</div>
    <div class="subtitle">{subtitle}</div>
    <div class="dots-row">
        {dots_html}
    </div>
    <div class="pill-badge">
        {pill_text}
    </div>
</body>
</html>
'''
    return html_content

def generate_listing_md(config):
    listing = config.get("tpt_listing", {})
    title = listing.get("title", f"{config['title']} Worksheets Bundle")
    bullets = "\n".join([f"- {b}" for b in listing.get("bullet_points", [])])
    keywords = ", ".join(listing.get("keywords", []))

    return f'''# TPT Listing Draft: {config['title']}

## Product Title
`{title}`

## Highlights & Bullet Points
{bullets}

## Product Description
{listing.get("description", "")}

## Search Keywords & Tags
`{keywords}`

## Product Package Summary
- **Format**: PDF + PNG Cover
- **Page Count**: 10 Pages (5 Worksheets + 5 Answer Keys) + 1 Cover PNG
- **Target Grade**: {config.get("grade", "Grade 1")}
- **Subject**: Elementary Math / Fact Fluency / Number Sense
'''

async def render_pdf_and_cover_async(output_dir, config, versions_data):
    from playwright.async_api import async_playwright

    ws_dir = output_dir / "worksheets"
    ak_dir = output_dir / "answer_keys"
    ws_dir.mkdir(parents=True, exist_ok=True)
    ak_dir.mkdir(parents=True, exist_ok=True)

    ws_pdf_paths = []
    ak_pdf_paths = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # 1. Render Worksheets and Answer Keys
        for version, problems in versions_data:
            # Worksheet
            ws_html = generate_worksheet_html(version, problems, config, is_answer_key=False)
            ws_html_path = ws_dir / f"worksheet_v{version}.html"
            ws_pdf_path = ws_dir / f"worksheet_v{version}.pdf"
            ws_html_path.write_text(ws_html, encoding="utf-8")

            await page.goto(ws_html_path.resolve().as_uri(), wait_until="networkidle")
            await page.pdf(
                path=str(ws_pdf_path),
                format="Letter",
                print_background=True,
                margin={"top": "12mm", "bottom": "12mm", "left": "12mm", "right": "12mm"}
            )
            ws_pdf_paths.append(ws_pdf_path)

            # Answer Key
            ak_html = generate_worksheet_html(version, problems, config, is_answer_key=True)
            ak_html_path = ak_dir / f"answer_key_v{version}.html"
            ak_pdf_path = ak_dir / f"answer_key_v{version}.pdf"
            ak_html_path.write_text(ak_html, encoding="utf-8")

            await page.goto(ak_html_path.resolve().as_uri(), wait_until="networkidle")
            await page.pdf(
                path=str(ak_pdf_path),
                format="Letter",
                print_background=True,
                margin={"top": "12mm", "bottom": "12mm", "left": "12mm", "right": "12mm"}
            )
            ak_pdf_paths.append(ak_pdf_path)

        # 2. Render Square Cover Image
        cover_html = generate_cover_html(config)
        cover_html_path = output_dir / "cover.html"
        cover_png_path = output_dir / "cover.png"
        cover_html_path.write_text(cover_html, encoding="utf-8")

        await page.set_viewport_size({"width": 1200, "height": 1200})
        await page.goto(cover_html_path.resolve().as_uri(), wait_until="networkidle")
        await page.screenshot(path=str(cover_png_path))

        await browser.close()

    return ws_pdf_paths, ak_pdf_paths, cover_png_path

def merge_pdfs(pdf_paths, output_path):
    merger = PdfWriter()
    for path in pdf_paths:
        merger.append(str(path))
    merger.write(str(output_path))
    merger.close()

def build_zip_package(topic_id, output_dir, complete_pdf, cover_png, listing_md_path):
    zip_path = output_dir / f"{topic_id}-tpt-bundle.zip"
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        z.write(complete_pdf, arcname=complete_pdf.name)
        z.write(cover_png, arcname=cover_png.name)
        z.write(listing_md_path, arcname=listing_md_path.name)
        
        # Include individual worksheets and answer keys
        for ws in (output_dir / "worksheets").glob("*.pdf"):
            z.write(ws, arcname=f"worksheets/{ws.name}")
        for ak in (output_dir / "answer_keys").glob("*.pdf"):
            z.write(ak, arcname=f"answer_keys/{ak.name}")
    return zip_path

def main():
    if len(sys.argv) < 2:
        print("Usage: python generator.py <path-to-topic.json>")
        sys.exit(1)

    config_path = Path(sys.argv[1])
    if not config_path.exists():
        print(f"Error: Topic config file not found: {config_path}")
        sys.exit(1)

    with open(config_path, "r", encoding="utf-8") as f:
        config = json.load(f)

    topic_id = config.get("id", config_path.stem)
    output_dir = Path("output") / topic_id
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"🚀 Starting TPT Generator Pipeline for: {config['title']}")

    # 1. Generate Math Problems
    versions_data = generate_problems(config)

    # 2. Render PDFs and Cover PNG via Playwright
    ws_pdfs, ak_pdfs, cover_png = asyncio.run(render_pdf_and_cover_async(output_dir, config, versions_data))

    # 3. Merge PDFs
    ws_bundle = output_dir / f"{topic_id}-worksheets.pdf"
    ak_bundle = output_dir / f"{topic_id}-answer-keys.pdf"
    complete_bundle = output_dir / f"{topic_id}-complete.pdf"

    merge_pdfs(ws_pdfs, ws_bundle)
    merge_pdfs(ak_pdfs, ak_bundle)
    merge_pdfs(ws_pdfs + ak_pdfs, complete_bundle)

    # 4. Generate Listing Copy
    listing_content = generate_listing_md(config)
    listing_path = output_dir / "listing.md"
    listing_path.write_text(listing_content, encoding="utf-8")

    # 5. Build ZIP Package
    zip_path = build_zip_package(topic_id, output_dir, complete_bundle, cover_png, listing_path)

    print("\n✅ TPT Generator Pipeline Completed Successfully!")
    print(f"  ├── Worksheets PDF Bundle: {ws_bundle}")
    print(f"  ├── Answer Keys PDF Bundle: {ak_bundle}")
    print(f"  ├── Complete Combined PDF: {complete_bundle}")
    print(f"  ├── Square Cover PNG: {cover_png}")
    print(f"  ├── TPT Listing Copy: {listing_path}")
    print(f"  └── Ready-to-Upload ZIP: {zip_path}")

if __name__ == "__main__":
    main()
