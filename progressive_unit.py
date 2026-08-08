"""
Progressive 10-Page Master Unit Generator for Math Worksheets
Generates 10 distinct, pedagogically structured worksheet pages:
1. Picture Addition (Visual Objects)
2. Ten-Frame Addition
3. Number Line Addition (0-10)
4. Domino & Dice Addition
5. Number Bonds (Part-Part-Whole)
6. Classic Horizontal Drills
7. Vertical Stacked Math
8. Missing Addend Fill-in Boxes
9. Illustrated Word Problems
10. Color-by-Math Review Challenge
"""

import random

# Fixed reproducible seed generator per page
def get_page_problems(page_num, count=12, op_min=0, op_max=10, max_sum=10):
    random.seed(100 + page_num * 17)
    valid = []
    for a in range(op_min, op_max + 1):
        for b in range(op_min, op_max + 1):
            if a + b <= max_sum:
                valid.append((a, b, a + b))
    
    probs = []
    while len(probs) < count:
        random.shuffle(valid)
        for p in valid:
            if len(probs) < count:
                probs.append(p)
            else:
                break
    return probs

def render_ten_frame_svg(count, is_bw=True):
    dots_html = []
    for i in range(10):
        filled = i < count
        dot_style = "background-color: #1A1A1A;" if (filled and is_bw) else ("background-color: #4C4592;" if filled else "background-color: transparent;")
        border_style = "border: 1px solid #1A1A1A;" if is_bw else "border: 1px solid #CBD5E1;"
        dots_html.append(f'<div style="width: 18px; height: 18px; border-radius: 50%; {dot_style} margin: auto;"></div>')
    
    cells = "".join([f'<div style="border: 1.5px solid #333; display: flex; align-items: center; justify-content: center;">{d}</div>' for d in dots_html])
    return f'''
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(2, 1fr); width: 110px; height: 48px; border: 2px solid #000; border-radius: 4px; overflow: hidden; background: #FFF;">
        {cells}
    </div>
    '''

def render_domino_svg(a, b):
    def make_dots(n):
        return "".join(['<div style="width:10px; height:10px; border-radius:50%; background:#1A1A1A;"></div>' for _ in range(n)])
    
    return f'''
    <div style="display: flex; width: 100px; height: 50px; border: 2.5px solid #1A1A1A; border-radius: 8px; background: #FFF; overflow: hidden;">
        <div style="flex: 1; display: flex; flex-wrap: wrap; gap: 4px; align-content: center; justify-content: center; padding: 4px; border-right: 2px solid #1A1A1A;">
            {make_dots(a)}
        </div>
        <div style="flex: 1; display: flex; flex-wrap: wrap; gap: 4px; align-content: center; justify-content: center; padding: 4px;">
            {make_dots(b)}
        </div>
    </div>
    '''

def render_number_line_svg(a, b, sum_val, is_answer=False):
    ticks = "".join([f'''
        <g transform="translate({25 + i*32}, 25)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#1A1A1A" stroke-width="2"/>
            <text x="0" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="#1A1A1A">{i}</text>
        </g>
    ''' for i in range(11)])

    curve_path = ""
    if is_answer and a + b <= 10:
        x1 = 25 + a * 32
        x2 = 25 + (a + b) * 32
        cx = (x1 + x2) / 2
        curve_path = f'''
        <path d="M {x1} 25 Q {cx} 2 {x2} 25" stroke="#2E7D32" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
        '''

    return f'''
    <svg width="370" height="55" viewBox="0 0 370 55" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#2E7D32"/>
            </marker>
        </defs>
        <line x1="15" y1="25" x2="355" y2="25" stroke="#1A1A1A" stroke-width="2.5"/>
        {ticks}
        {curve_path}
    </svg>
    '''

def generate_progressive_page_html(page_num, config, is_answer_key=False):
    title = config.get("title", "Addition Within 10")
    author = config.get("author", "Attapol.k")
    footer = config.get("footer", f"Created by {author} · For classroom or home use")
    
    page_titles = [
        "Picture Addition (Counting Objects)",
        "Ten-Frame Addition (Visual Sense)",
        "Number Line Addition (0 to 10)",
        "Domino Dot Addition",
        "Number Bonds (Composing 10)",
        "Classic Horizontal Addition Drills",
        "Vertical Addition Practice",
        "Missing Addend Box Fill",
        "Addition Story Word Problems",
        "Color-by-Math Fact Review"
    ]
    
    current_page_title = page_titles[page_num - 1]
    if is_answer_key:
        current_page_title += " — Answer Key"

    header_meta = "" if is_answer_key else '''
    <div style="display: flex; justify-content: space-between; margin-top: 10px; font-weight: bold; font-size: 14px; color: #333;">
        <span>Name: ______________________</span>
        <span>Date: __________</span>
        <span>Score: _____ / 10</span>
    </div>
    '''

    # Generate Page Body Content based on page_num
    body_content = ""
    
    if page_num == 1:
        # Picture Addition
        probs = get_page_problems(1, count=6)
        icons = ["🍎", "⭐", "🚗", "🎈", "🐱", "🌸"]
        cards = []
        for idx, (a, b, s) in enumerate(probs, 1):
            icon = icons[(idx - 1) % len(icons)]
            str_a = " ".join([icon] * a) if a > 0 else "0"
            str_b = " ".join([icon] * b) if b > 0 else "0"
            ans_box = f'<span style="color:#2E7D32; font-weight:bold; background:#D1FAE5; padding:2px 10px; border-radius:6px; border:2px solid #34D399;">{s}</span>' if is_answer_key else '<div style="width:40px; height:36px; border:2px solid #333; border-radius:6px; background:#F8FAFC;"></div>'
            cards.append(f'''
            <div style="border: 2px solid #CBD5E1; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; background: #FFF;">
                <div style="font-weight: bold; color: #64748B; align-self: flex-start; font-size: 12px;">#{idx}</div>
                <div style="display: flex; align-items: center; gap: 12px; font-size: 22px; margin: 8px 0;">
                    <div style="background:#F1F5F9; padding: 6px 12px; border-radius: 8px; font-size: 20px;">{str_a}</div>
                    <div style="font-weight:bold;">+</div>
                    <div style="background:#F1F5F9; padding: 6px 12px; border-radius: 8px; font-size: 20px;">{str_b}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; font-size: 20px; font-weight: bold;">
                    <span>{a} + {b} =</span> {ans_box}
                </div>
            </div>
            ''')
        body_content = f'<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">{"".join(cards)}</div>'

    elif page_num == 2:
        # Ten Frame Addition
        probs = get_page_problems(2, count=6)
        cards = []
        for idx, (a, b, s) in enumerate(probs, 1):
            tf_a = render_ten_frame_svg(a)
            tf_b = render_ten_frame_svg(b)
            ans_box = f'<span style="color:#2E7D32; font-weight:bold; background:#D1FAE5; padding:2px 10px; border-radius:6px; border:2px solid #34D399;">{s}</span>' if is_answer_key else '<div style="width:40px; height:36px; border:2px solid #333; border-radius:6px; background:#F8FAFC;"></div>'
            cards.append(f'''
            <div style="border: 2px solid #CBD5E1; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; background: #FFF;">
                <div style="font-weight: bold; color: #64748B; align-self: flex-start; font-size: 12px;">#{idx}</div>
                <div style="display: flex; align-items: center; gap: 10px; margin: 8px 0;">
                    {tf_a}
                    <div style="font-size: 22px; font-weight: bold;">+</div>
                    {tf_b}
                </div>
                <div style="display: flex; align-items: center; gap: 8px; font-size: 20px; font-weight: bold;">
                    <span>{a} + {b} =</span> {ans_box}
                </div>
            </div>
            ''')
        body_content = f'<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">{"".join(cards)}</div>'

    elif page_num == 3:
        # Number Line Addition
        probs = get_page_problems(3, count=5)
        cards = []
        for idx, (a, b, s) in enumerate(probs, 1):
            nl_svg = render_number_line_svg(a, b, s, is_answer=is_answer_key)
            ans_box = f'<span style="color:#2E7D32; font-weight:bold; background:#D1FAE5; padding:2px 10px; border-radius:6px; border:2px solid #34D399;">{s}</span>' if is_answer_key else '<div style="width:40px; height:34px; border:2px solid #333; border-radius:6px; background:#F8FAFC;"></div>'
            cards.append(f'''
            <div style="border: 2px solid #CBD5E1; border-radius: 12px; padding: 10px 14px; display: flex; flex-direction: column; align-items: center; background: #FFF;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; margin-bottom: 4px;">
                    <div style="font-weight: bold; color: #64748B; font-size: 12px;">#{idx}</div>
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 20px; font-weight: bold;">
                        <span>{a} + {b} =</span> {ans_box}
                    </div>
                </div>
                {nl_svg}
            </div>
            ''')
        body_content = f'<div style="display: flex; flex-direction: column; gap: 12px;">{"".join(cards)}</div>'

    elif page_num == 4:
        # Domino Addition
        probs = get_page_problems(4, count=8)
        cards = []
        for idx, (a, b, s) in enumerate(probs, 1):
            dom_svg = render_domino_svg(a, b)
            ans_box = f'<span style="color:#2E7D32; font-weight:bold; background:#D1FAE5; padding:2px 10px; border-radius:6px; border:2px solid #34D399;">{s}</span>' if is_answer_key else '<div style="width:40px; height:34px; border:2px solid #333; border-radius:6px; background:#F8FAFC;"></div>'
            cards.append(f'''
            <div style="border: 2px solid #CBD5E1; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; background: #FFF;">
                <div style="font-weight: bold; color: #64748B; align-self: flex-start; font-size: 12px;">#{idx}</div>
                {dom_svg}
                <div style="display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: bold; margin-top: 8px;">
                    <span>{a} + {b} =</span> {ans_box}
                </div>
            </div>
            ''')
        body_content = f'<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;">{"".join(cards)}</div>'

    elif page_num == 5:
        # Number Bonds
        probs = get_page_problems(5, count=8)
        cards = []
        for idx, (a, b, s) in enumerate(probs, 1):
            # Alternating missing whole vs missing part
            missing_type = idx % 3 # 0: whole, 1: partA, 2: partB
            if is_answer_key:
                val_top = f'<span style="color:#2E7D32; font-weight:bold;">{s}</span>'
                val_left = f'<span style="color:#2E7D32; font-weight:bold;">{a}</span>'
                val_right = f'<span style="color:#2E7D32; font-weight:bold;">{b}</span>'
            else:
                val_top = str(s) if missing_type != 0 else "?"
                val_left = str(a) if missing_type != 1 else "?"
                val_right = str(b) if missing_type != 2 else "?"

            cards.append(f'''
            <div style="border: 2px solid #CBD5E1; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; align-items: center; background: #FFF;">
                <div style="font-weight: bold; color: #64748B; align-self: flex-start; font-size: 12px;">#{idx}</div>
                <svg width="120" height="110" viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg">
                    <line x1="60" y1="35" x2="30" y2="80" stroke="#333" stroke-width="2.5"/>
                    <line x1="60" y1="35" x2="90" y2="80" stroke="#333" stroke-width="2.5"/>
                    <circle cx="60" cy="25" r="20" fill="#F1F5F9" stroke="#333" stroke-width="2.5"/>
                    <text x="60" y="31" text-anchor="middle" font-size="16" font-weight="bold">{val_top}</text>
                    <circle cx="30" cy="85" r="18" fill="#FFF" stroke="#333" stroke-width="2"/>
                    <text x="30" y="90" text-anchor="middle" font-size="15" font-weight="bold">{val_left}</text>
                    <circle cx="90" cy="85" r="18" fill="#FFF" stroke="#333" stroke-width="2"/>
                    <text x="90" y="90" text-anchor="middle" font-size="15" font-weight="bold">{val_right}</text>
                </svg>
            </div>
            ''')
        body_content = f'<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;">{"".join(cards)}</div>'

    elif page_num == 6:
        # Classic Horizontal Drills
        probs = get_page_problems(6, count=12)
        cards = []
        for idx, (a, b, s) in enumerate(probs, 1):
            ans = f'<span style="color:#2E7D32; font-weight:bold; background:#D1FAE5; padding:2px 10px; border-radius:6px; border:2px solid #34D399;">{s}</span>' if is_answer_key else '<div style="width:44px; height:38px; border:2px solid #94A3B8; border-radius:8px; background:#F8FAFC;"></div>'
            cards.append(f'''
            <div style="border: 2px solid #CBD5E1; border-radius: 12px; padding: 16px 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 160px; background: #FFF;">
                <div style="position: absolute; top: 10px; left: 12px; font-weight: bold; color: #64748B; font-size: 12px; background: #F1F5F9; padding: 2px 8px; border-radius: 10px;">#{idx}</div>
                <div style="font-size: 24px; font-weight: bold; display: flex; align-items: center; gap: 8px; margin-top: 10px;">
                    <span>{a} + {b} =</span> {ans}
                </div>
            </div>
            ''')
        body_content = f'<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">{"".join(cards)}</div>'

    elif page_num == 7:
        # Vertical Addition Practice
        probs = get_page_problems(7, count=12)
        cards = []
        for idx, (a, b, s) in enumerate(probs, 1):
            ans_val = f'<span style="color:#2E7D32; font-weight:bold; font-size:24px;">{s}</span>' if is_answer_key else ''
            cards.append(f'''
            <div style="border: 2px solid #CBD5E1; border-radius: 12px; padding: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 160px; background: #FFF; position: relative;">
                <div style="position: absolute; top: 8px; left: 10px; font-weight: bold; color: #64748B; font-size: 12px;">#{idx}</div>
                <div style="font-size: 26px; font-weight: bold; text-align: right; width: 70px; line-height: 1.2;">
                    <div>{a}</div>
                    <div>+ {b}</div>
                    <div style="border-top: 3px solid #1A1A1A; margin-top: 4px; padding-top: 4px; min-height: 36px;">{ans_val}</div>
                </div>
            </div>
            ''')
        body_content = f'<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">{"".join(cards)}</div>'

    elif page_num == 8:
        # Missing Addend Box Fill
        probs = get_page_problems(8, count=12)
        cards = []
        for idx, (a, b, s) in enumerate(probs, 1):
            missing_first = idx % 2 == 1
            if is_answer_key:
                box_a = f'<span style="color:#2E7D32; font-weight:bold; background:#D1FAE5; padding:2px 10px; border-radius:6px; border:2px solid #34D399;">{a}</span>' if missing_first else str(a)
                box_b = str(b) if missing_first else f'<span style="color:#2E7D32; font-weight:bold; background:#D1FAE5; padding:2px 10px; border-radius:6px; border:2px solid #34D399;">{b}</span>'
            else:
                blank = '<div style="width:44px; height:38px; border:2px solid #333; border-radius:8px; background:#F8FAFC; display:inline-block;"></div>'
                box_a = blank if missing_first else str(a)
                box_b = str(b) if missing_first else blank

            cards.append(f'''
            <div style="border: 2px solid #CBD5E1; border-radius: 12px; padding: 16px 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 160px; background: #FFF; position: relative;">
                <div style="position: absolute; top: 10px; left: 12px; font-weight: bold; color: #64748B; font-size: 12px; background: #F1F5F9; padding: 2px 8px; border-radius: 10px;">#{idx}</div>
                <div style="font-size: 22px; font-weight: bold; display: flex; align-items: center; gap: 8px; margin-top: 10px;">
                    {box_a} <span>+</span> {box_b} <span>= {s}</span>
                </div>
            </div>
            ''')
        body_content = f'<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">{"".join(cards)}</div>'

    elif page_num == 9:
        # Illustrated Word Problems
        stories = [
            ("Emma saw 3 yellow birds on a fence. 4 more red birds joined them. How many birds are there in all?", 3, 4, 7),
            ("Leo collected 5 smooth pebbles on Monday and 3 pebbles on Tuesday. How many pebbles did Leo collect altogether?", 5, 3, 8),
            ("Mia baked 6 chocolate cupcakes and 2 vanilla cupcakes. How many cupcakes did Mia bake in total?", 6, 2, 8),
            ("Noah has 4 star stickers. His teacher gives him 5 more star stickers. How many stickers does Noah have now?", 4, 5, 9)
        ]
        cards = []
        for idx, (text, a, b, s) in enumerate(stories, 1):
            ans_val = f'<span style="color:#2E7D32; font-weight:bold; background:#D1FAE5; padding:2px 12px; border-radius:6px; border:2px solid #34D399;">{s}</span>' if is_answer_key else '<div style="width:50px; height:36px; border:2px solid #333; border-radius:6px; background:#F8FAFC;"></div>'
            cards.append(f'''
            <div style="border: 2px solid #CBD5E1; border-radius: 12px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; background: #FFF;">
                <div style="font-weight: bold; color: #4C4592; font-size: 14px;">Problem #{idx}</div>
                <div style="font-size: 15px; margin: 6px 0; color: #1E293B; line-height: 1.4;">{text}</div>
                <div style="border: 1.5px dashed #94A3B8; border-radius: 8px; height: 60px; display: flex; align-items: center; justify-content: center; color: #94A3B8; font-size: 13px;">
                    [ Draw picture here ]
                </div>
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px; font-size: 18px; font-weight: bold; margin-top: 8px;">
                    <span>Equation: {a} + {b} =</span> {ans_val}
                </div>
            </div>
            ''')
        body_content = f'<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">{"".join(cards)}</div>'

    elif page_num == 10:
        # Color-by-Math Fact Review
        probs = get_page_problems(10, count=12)
        cards = []
        colors = {5: "Blue 🔵", 6: "Red 🔴", 7: "Green 🟢", 8: "Yellow 🟡", 9: "Purple 🟣", 10: "Orange 🟧"}
        for idx, (a, b, s) in enumerate(probs, 1):
            target_color = colors.get(s, "Gray ⚪")
            ans_val = f'<div style="color:#2E7D32; font-weight:bold; margin-top:4px;">Sum = {s} ({target_color})</div>' if is_answer_key else f'<div style="color:#64748B; font-size:12px; margin-top:4px;">Color: ________</div>'
            cards.append(f'''
            <div style="border: 2px solid #CBD5E1; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 130px; background: #FFF;">
                <div style="font-size: 22px; font-weight: bold;">{a} + {b} = ?</div>
                {ans_val}
            </div>
            ''')
        
        color_legend = '''
        <div style="border: 2px solid #333; border-radius: 10px; padding: 10px; margin-bottom: 12px; background: #F8FAFC; display: flex; justify-content: space-around; font-weight: bold; font-size: 13px;">
            <span>5 = Blue 🔵</span>
            <span>6 = Red 🔴</span>
            <span>7 = Green 🟢</span>
            <span>8 = Yellow 🟡</span>
            <span>9 = Purple 🟣</span>
            <span>10 = Orange 🟧</span>
        </div>
        '''
        body_content = color_legend + f'<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">{"".join(cards)}</div>'

    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{current_page_title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
        
        @page {{
            size: letter portrait;
            margin: 10mm 12mm 10mm 12mm;
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
            margin-bottom: 10px;
        }}

        .header h1 {{
            color: #1E293B;
            font-size: 24px;
            font-weight: 700;
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
            <h1>{current_page_title}</h1>
            {header_meta}
        </div>

        {body_content}
    </div>

    <div class="footer">
        {footer}
    </div>
</body>
</html>
'''
    return html_content
