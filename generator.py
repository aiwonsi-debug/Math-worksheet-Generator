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

EMOJI_DIR = Path("public/emoji/bw")

THEMES = {
    "halloween-2026": ["1f383", "1f47b", "1f577", "1f480", "1f47d"],
    "back-to-school-2026": ["1f392", "1f393", "1f4da", "270f", "1f4d0"],
    "autumn-2026": ["1f342", "1f343", "1f330", "1f98a", "1f33d"],
    "space-2026": ["1f680", "1f6f8", "1f319", "2b50", "1fa90"]
}

def is_bw(config):
    """Black & white is the default print style unless a topic explicitly
    opts into color with `"color_mode": "color"`."""
    return config.get("color_mode", "bw") != "color"


def load_clipart_svg(code, width=28, height=28):
    svg_path = EMOJI_DIR / f"{code}.svg"
    if not svg_path.exists():
        return ""
    try:
        content = svg_path.read_text(encoding="utf-8")
        # Ensure width and height are injected cleanly
        if "<svg" in content:
            content = content.replace("<svg", f'<svg width="{width}" height="{height}" class="clipart-icon"', 1)
        return content
    except Exception:
        return ""

def get_theme_cliparts(config, count=2):
    if is_bw(config):
        return []
    codes = config.get("clipart_codes", [])
    if not codes and "clipart_theme" in config:
        codes = THEMES.get(config["clipart_theme"], [])
    if not codes:
        return []
    return [load_clipart_svg(c) for c in codes[:count] if load_clipart_svg(c)]

def get_cover_cliparts(config):
    if is_bw(config):
        return []
    codes = config.get("clipart_codes", [])
    if not codes and "clipart_theme" in config:
        codes = THEMES.get(config["clipart_theme"], [])
    if not codes:
        return []
    return [load_clipart_svg(c, width=44, height=44) for c in codes if load_clipart_svg(c, width=44, height=44)]

OP_SYMBOLS = {"+": "+", "-": "−", "×": "×", "*": "×", "÷": "÷", "/": "÷"}


def generate_problems(config):
    operation = config.get("operation", "+")
    op_min = config.get("operand_min", 0)
    op_max = config.get("operand_max", 10)
    max_sum = config.get("max_sum", 10)
    items_per_page = config.get("items_per_page", 12)
    num_versions = config.get("num_versions", 5)

    all_possible = []
    if operation == "+":
        for a in range(op_min, op_max + 1):
            for b in range(op_min, op_max + 1):
                if a + b <= max_sum:
                    all_possible.append((a, b, a + b))
    elif operation == "-":
        # a - b, kept non-negative: a is drawn up to max_sum so results
        # stay in a comparable range to the other operations.
        for a in range(op_min, max(op_max, max_sum) + 1):
            for b in range(op_min, op_max + 1):
                if b <= a and a <= max_sum:
                    all_possible.append((a, b, a - b))
    elif operation in ("×", "*"):
        max_product = config.get("max_product", max_sum)
        for a in range(op_min, op_max + 1):
            for b in range(op_min, op_max + 1):
                if a * b <= max_product:
                    all_possible.append((a, b, a * b))
    elif operation in ("÷", "/"):
        # Build from clean divisions only: a = b * q, b != 0.
        max_quotient = config.get("max_quotient", op_max)
        for b in range(max(op_min, 1), op_max + 1):
            for q in range(op_min, max_quotient + 1):
                a = b * q
                if a <= config.get("max_product", op_max * max_quotient):
                    all_possible.append((a, b, q))
    else:
        raise ValueError(f"Unsupported operation: {operation!r} (expected one of + - × ÷)")

    if not all_possible:
        raise ValueError(
            f"Topic config produces zero valid problems for operation {operation!r} "
            f"(operand_min={op_min}, operand_max={op_max}, max_sum={max_sum}). "
            f"Check that the range/max settings are reachable for this operation."
        )

    versions = []
    for v in range(1, num_versions + 1):
        random.seed(42 + v * 101)  # Reproducible seed per version
        selected = []
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

def render_dots_svg(count, color, config=None, is_right=False):
    if count <= 0:
        return ""
    
    # Check for clipart SVG theme
    clipart_svg = ""
    codes = config.get("clipart_codes", []) if config else []
    if not codes and config and "clipart_theme" in config:
        codes = THEMES.get(config["clipart_theme"], [])
    if codes:
        code_idx = 1 if is_right and len(codes) > 1 else 0
        clipart_svg = load_clipart_svg(codes[code_idx], width=16, height=16)

    dots_html = []
    rows = []
    remaining = count
    while remaining > 0:
        rows.append(min(remaining, 5))
        remaining -= 5

    for r in rows:
        if clipart_svg:
            row_items = "".join([f'<div class="dot-clip">{clipart_svg}</div>' for _ in range(r)])
        else:
            row_items = "".join([f'<div class="dot" style="background-color: {color};"></div>' for _ in range(r)])
        dots_html.append(f'<div class="dot-row">{row_items}</div>')
    
    return f'<div class="dots-group">{"".join(dots_html)}</div>'

def generate_dots_worksheet_html(version, problems, config, is_answer_key=False):
    title = config.get("title", "Untitled Worksheet")
    subtitle = config.get("subtitle", "")
    author = config.get("author", "Attapol.k")
    footer = config.get("footer", f"Created by {author} · For classroom or home use")
    theme = config.get("theme", {})
    primary_color = theme.get("primary_color", "#4C4592")
    if is_bw(config):
        primary_color = "#1A1A1A"
    dot_colors = theme.get("dot_colors", ["#F5A623", "#E53935"])
    card_border = theme.get("card_border", "#C4C0E5")
    if is_bw(config):
        dot_colors = ["#1A1A1A", "#1A1A1A"]
        card_border = "#333333"
    
    page_title = f"{title} — Answer Key" if is_answer_key else title

    op_symbol = OP_SYMBOLS.get(config.get("operation", "+"), "+")
    grid_items = []
    for idx, prob in enumerate(problems, 1):
        a = prob[0]
        b = prob[1]
        result = prob[2] if len(prob) > 2 else (
            a + b if op_symbol == "+" else
            a - b if op_symbol == "−" else
            a * b if op_symbol == "×" else
            a // b if (op_symbol == "÷" and b != 0) else 0
        )
        left_dots = render_dots_svg(a, dot_colors[0], config, is_right=False)
        right_dots = render_dots_svg(b, dot_colors[1], config, is_right=True)
        
        if is_answer_key:
            eq_text = f'{a} {op_symbol} {b} = <span class="answer-val">{result}</span>'
            dots_markup = ""
            card_class = "card answer-card"
        else:
            eq_text = f'{a} {op_symbol} {b} = <span class="blank-line">___</span>'
            card_class = "card"
            
            if a > 0 and b > 0:
                dots_markup = f'''
                <div class="manipulatives-row">
                    {left_dots}
                    <div class="plus-sign">{op_symbol}</div>
                    {right_dots}
                </div>
                '''
            elif a > 0 and b == 0:
                dots_markup = f'''
                <div class="manipulatives-row">
                    {left_dots}
                    <div class="plus-sign">{op_symbol}</div>
                </div>
                '''
            elif a == 0 and b > 0:
                dots_markup = f'''
                <div class="manipulatives-row">
                    <div class="plus-sign">{op_symbol}</div>
                    {right_dots}
                </div>
                '''
            else:
                dots_markup = f'''
                <div class="manipulatives-row">
                    <div class="plus-sign">{op_symbol}</div>
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

        .dot-clip {{
            display: inline-flex;
            align-items: center;
            justify-content: center;
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

def generate_classic_worksheet_html(version, problems, config, is_answer_key=False):
    title = config.get("title", "Untitled Worksheet")
    subtitle = config.get("subtitle", "")
    author = config.get("author", "Attapol.k")
    footer = config.get("footer", f"Created by {author} · For classroom or home use")
    theme = config.get("theme", {})
    primary_color = theme.get("primary_color", "#1E293B")
    if is_bw(config):
        primary_color = "#1A1A1A"
    card_border = theme.get("card_border", "#CBD5E1")
    answer_bg = theme.get("answer_key_bg", "#EBF7ED")
    answer_border = theme.get("answer_key_border", "#A3E0B2")
    answer_text = theme.get("answer_key_text", "#2E7D32")
    if is_bw(config):
        card_border = "#333333"
        answer_bg = "#F2F2F2"
        answer_border = "#999999"
        answer_text = "#1A1A1A"
    missing_part = config.get("missing_part", "answer")

    page_title = f"{title} — Answer Key" if is_answer_key else title

    clipart_accents = get_theme_cliparts(config, count=2)
    accent_left = clipart_accents[0] if len(clipart_accents) > 0 else ""
    accent_right = clipart_accents[1] if len(clipart_accents) > 1 else accent_left

    op_symbol = OP_SYMBOLS.get(config.get("operation", "+"), "+")
    grid_items = []
    for idx, prob in enumerate(problems, 1):
        a = prob[0]
        b = prob[1]
        result = prob[2] if len(prob) > 2 else (
            a + b if op_symbol == "+" else
            a - b if op_symbol == "−" else
            a * b if op_symbol == "×" else
            a // b if (op_symbol == "÷" and b != 0) else 0
        )

        if is_answer_key:
            if missing_part == "first":
                eq_html = f'<span class="ans-box">{a}</span> {op_symbol} {b} = {result}'
            elif missing_part == "second":
                eq_html = f'{a} {op_symbol} <span class="ans-box">{b}</span> = {result}'
            else:
                eq_html = f'{a} {op_symbol} {b} = <span class="ans-box">{result}</span>'
            card_class = "classic-card answer-card"
        else:
            if missing_part == "first":
                eq_html = f'<div class="blank-box"></div> {op_symbol} {b} = {result}'
            elif missing_part == "second":
                eq_html = f'{a} {op_symbol} <div class="blank-box"></div> = {result}'
            else:
                eq_html = f'{a} {op_symbol} {b} = <div class="blank-box"></div>'
            card_class = "classic-card"

        grid_items.append(f'''
        <div class="{card_class}">
            <div class="prob-num-circle">#{idx}</div>
            <div class="classic-eq">{eq_html}</div>
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

    title_markup = f'''
    <div class="title-with-accents">
        {f'<div class="header-accent">{accent_left}</div>' if accent_left else ''}
        <h1>{page_title}</h1>
        {f'<div class="header-accent">{accent_right}</div>' if accent_right else ''}
    </div>
    '''

    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{page_title} - Version {version}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
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
            font-family: 'Comic Neue', cursive, sans-serif;
            color: #1E293B;
            background: #ffffff;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }}

        .header {{
            text-align: center;
            margin-bottom: 14px;
        }}

        .title-with-accents {{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
        }}

        .header h1 {{
            color: {primary_color};
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 2px;
        }}

        .header .subtitle {{
            color: #64748B;
            font-size: 14px;
            font-weight: 400;
        }}

        .student-meta {{
            display: flex;
            justify-content: space-between;
            margin-top: 14px;
            padding: 0 8px;
            font-size: 14px;
            color: #475569;
        }}

        .grid {{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 12px;
        }}

        .classic-card {{
            border: 2.5px dashed {card_border};
            border-radius: 14px;
            padding: 16px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 175px;
            position: relative;
            background: #ffffff;
        }}

        .answer-card {{
            background-color: {answer_bg};
            border: 2.5px dashed {answer_border};
        }}

        .prob-num-circle {{
            position: absolute;
            top: 10px;
            left: 12px;
            font-size: 13px;
            font-weight: 700;
            color: #64748B;
            background: #F1F5F9;
            border-radius: 12px;
            padding: 2px 8px;
        }}

        .classic-eq {{
            font-size: 26px;
            font-weight: 700;
            color: #0F172A;
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 10px;
        }}

        .blank-box {{
            width: 48px;
            height: 44px;
            border: 2px solid #94A3B8;
            border-radius: 8px;
            background-color: #F8FAFC;
            display: inline-block;
        }}

        .ans-box {{
            color: {answer_text};
            font-weight: 700;
            background-color: #D1FAE5;
            border: 2px solid #34D399;
            border-radius: 8px;
            padding: 2px 10px;
            display: inline-block;
        }}

        .footer {{
            text-align: center;
            font-size: 11px;
            color: #94A3B8;
            padding-top: 4px;
        }}
    </style>
</head>
<body>
    <div>
        <div class="header">
            {title_markup}
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

def generate_worksheet_html(version, problems, config, is_answer_key=False):
    style = config.get("style", "classic_boxes")
    if style == "dots":
        return generate_dots_worksheet_html(version, problems, config, is_answer_key)
    return generate_classic_worksheet_html(version, problems, config, is_answer_key)

def generate_tou_html(config):
    style = config.get("style", "classic_boxes")
    font_family = "'Comic Neue', cursive, sans-serif" if style == "classic_boxes" else "'Mali', sans-serif"
    
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Terms of Use & Credits</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Mali:wght@400;700&display=swap');
        
        @page {{
            size: letter portrait;
            margin: 15mm 20mm 15mm 20mm;
        }}

        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}

        body {{
            font-family: {font_family};
            color: #1E293B;
            background: #ffffff;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px 10px;
        }}

        .tou-title {{
            font-size: 32px;
            font-weight: 700;
            color: #0F172A;
            text-align: center;
            margin-bottom: 24px;
            border-bottom: 2px solid #E2E8F0;
            padding-bottom: 12px;
        }}

        .tou-section {{
            margin-bottom: 20px;
            line-height: 1.6;
        }}

        .tou-section h2 {{
            font-size: 18px;
            font-weight: 700;
            color: #334155;
            margin-bottom: 8px;
        }}

        .tou-section p {{
            font-size: 13.5px;
            color: #475569;
            margin-bottom: 10px;
        }}

        .copyright-highlight {{
            font-weight: 700;
            color: #0F172A;
        }}

        .footer {{
            text-align: center;
            font-size: 11px;
            color: #94A3B8;
            border-top: 1px solid #E2E8F0;
            padding-top: 12px;
        }}
    </style>
</head>
<body>
    <div>
        <div class="tou-title">Terms of Use & Credits</div>

        <div class="tou-section">
            <p><strong>Thank you for downloading this resource!</strong></p>
        </div>

        <div class="tou-section">
            <h2>Terms of Use:</h2>
            <p class="copyright-highlight">© 2026 Attapol.k.</p>
            <p>
                All rights reserved. Purchase or download of this item entitles the purchaser the right to reproduce the pages in limited quantities for single classroom use only. Duplication for an entire school, an entire school system, or commercial purposes is strictly forbidden without written permission from the author.
            </p>
            <p>
                Copying any part of this product and placing it on the internet in any form (even a personal/classroom website) is strictly forbidden and is a violation of the Digital Millennium Copyright Act (DMCA).
            </p>
        </div>

        <div class="tou-section">
            <h2>Credits:</h2>
            <p>
                Fonts provided by Google Fonts (Comic Neue and Mali).<br>
                Clipart and vector art provided under open license.
            </p>
        </div>
    </div>

    <div class="footer">
        Created by Attapol.k · For classroom or home use
    </div>
</body>
</html>
'''
    return html_content

def generate_cover_html(config):
    title = config.get("title", "Untitled Worksheet")
    subtitle = config.get("subtitle", "")
    theme = config.get("theme", {})
    primary_color = theme.get("primary_color", "#1E293B")
    if is_bw(config):
        primary_color = "#1A1A1A"
    card_border = theme.get("card_border", "#CBD5E1")
    if is_bw(config):
        card_border = "#333333"
    pill_text = config.get("cover", {}).get("pill_text", "Addition within 10 • Grade 1 Math Practice")

    cover_cliparts = get_cover_cliparts(config)
    if cover_cliparts:
        cliparts_html = "".join([f'<div class="cover-clip-item">{c}</div>' for c in cover_cliparts])
        icons_row = f'<div class="cover-cliparts-row">{cliparts_html}</div>'
    else:
        cover_dots = config.get("cover", {}).get("dots", ["#F5B000", "#E53935", "#E53935", "#E59400"])
        if is_bw(config):
            cover_dots = ["#1A1A1A", "#4D4D4D", "#808080", "#B3B3B3"]
        dots_html = "".join([f'<div class="cover-dot" style="background-color: {c};"></div>' for c in cover_dots])
        icons_row = f'<div class="dots-row">{dots_html}</div>'

    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cover - {title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
        
        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}

        body {{
            font-family: 'Comic Neue', cursive, sans-serif;
            width: 1200px;
            height: 1200px;
            background-color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 50px;
        }}

        .cover-box {{
            width: 100%;
            height: 100%;
            border: 4px dashed {card_border};
            border-radius: 36px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px;
            text-align: center;
            background: #ffffff;
        }}

        .title {{
            font-size: 68px;
            font-weight: 700;
            color: {primary_color};
            margin-bottom: 16px;
            letter-spacing: -0.5px;
        }}

        .subtitle {{
            font-size: 34px;
            font-weight: 400;
            color: #64748B;
            margin-bottom: 50px;
        }}

        .cover-cliparts-row {{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 28px;
            margin-bottom: 60px;
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
            font-size: 24px;
            font-weight: 700;
            padding: 18px 44px;
            border-radius: 50px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
            display: inline-block;
        }}
    </style>
</head>
<body>
    <div class="cover-box">
        <div class="title">{title}</div>
        <div class="subtitle">{subtitle}</div>
        {icons_row}
        <div class="pill-badge">
            {pill_text}
        </div>
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
- **Page Count**: 11 Pages (5 Worksheets + 5 Answer Keys + 1 TOU Page) + 1 Cover PNG
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

        # 2. Render Terms of Use PDF Page
        tou_html = generate_tou_html(config)
        tou_html_path = output_dir / "tou.html"
        tou_pdf_path = output_dir / "tou.pdf"
        tou_html_path.write_text(tou_html, encoding="utf-8")

        await page.goto(tou_html_path.resolve().as_uri(), wait_until="networkidle")
        await page.pdf(
            path=str(tou_pdf_path),
            format="Letter",
            print_background=True,
            margin={"top": "15mm", "bottom": "15mm", "left": "20mm", "right": "20mm"}
        )

        # 3. Render Square Cover Image
        cover_html = generate_cover_html(config)
        cover_html_path = output_dir / "cover.html"
        cover_png_path = output_dir / "cover.png"
        cover_html_path.write_text(cover_html, encoding="utf-8")

        await page.set_viewport_size({"width": 1200, "height": 1200})
        await page.goto(cover_html_path.resolve().as_uri(), wait_until="networkidle")
        await page.screenshot(path=str(cover_png_path))

        await browser.close()

    return ws_pdf_paths, ak_pdf_paths, tou_pdf_path, cover_png_path

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

    required_keys = ["title", "operation", "operand_min", "operand_max", "max_sum"]
    missing = [k for k in required_keys if k not in config]
    if missing:
        print(f"Error: topic config is missing required key(s): {', '.join(missing)}")
        sys.exit(1)

    topic_id = config.get("id", config_path.stem)
    output_dir = Path("output") / topic_id
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"🚀 Starting TPT Generator Pipeline for: {config['title']}")

    # 1. Generate Math Problems
    versions_data = generate_problems(config)

    # 2. Render PDFs and Cover PNG via Playwright
    ws_pdfs, ak_pdfs, tou_pdf, cover_png = asyncio.run(render_pdf_and_cover_async(output_dir, config, versions_data))

    # 3. Merge PDFs (Append TOU PDF page to all bundles)
    ws_bundle = output_dir / f"{topic_id}-worksheets.pdf"
    ak_bundle = output_dir / f"{topic_id}-answer-keys.pdf"
    complete_bundle = output_dir / f"{topic_id}-complete.pdf"

    merge_pdfs(ws_pdfs + [tou_pdf], ws_bundle)
    merge_pdfs(ak_pdfs + [tou_pdf], ak_bundle)
    merge_pdfs(ws_pdfs + ak_pdfs + [tou_pdf], complete_bundle)

    # 4. Generate Listing Copy
    listing_content = generate_listing_md(config)
    listing_path = output_dir / "listing.md"
    listing_path.write_text(listing_content, encoding="utf-8")

    # 5. Build ZIP Package
    zip_path = build_zip_package(topic_id, output_dir, complete_bundle, cover_png, listing_path)

    print("\n✅ TPT Generator Pipeline Completed Successfully!")
    print(f"  ├── Worksheets PDF Bundle (+TOU): {ws_bundle}")
    print(f"  ├── Answer Keys PDF Bundle (+TOU): {ak_bundle}")
    print(f"  ├── Complete Combined PDF (+TOU): {complete_bundle}")
    print(f"  ├── Square Cover PNG: {cover_png}")
    print(f"  ├── TPT Listing Copy: {listing_path}")
    print(f"  └── Ready-to-Upload ZIP: {zip_path}")

if __name__ == "__main__":
    main()
