import os

# Output directory
out_dir = r"c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\Logo_Concepts"
if not os.path.exists(out_dir):
    os.makedirs(out_dir)

COLORS = {
    'red': '#E53935',
    'orange': '#FF9800',
    'black': '#212121',
    'blue': '#03A9F4',
    'white': '#FFFFFF',
}

def get_style(dark=False):
    t_bar = '#FFFFFF' if dark else '#212121'
    t_you = '#FFFFFF' if dark else '#212121'
    t_sub = '#B0BEC5' if dark else '#757575'
    return f"""
    <defs>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;900&amp;display=swap');
            .t-bar {{ font-family: 'Outfit', system-ui, sans-serif; font-weight: 900; fill: {t_bar}; }}
            .t-bq {{ font-family: 'Outfit', system-ui, sans-serif; font-weight: 900; fill: #E53935; }}
            .t-4 {{ font-family: 'Outfit', system-ui, sans-serif; font-weight: 700; fill: #03A9F4; }}
            .t-you {{ font-family: 'Outfit', system-ui, sans-serif; font-weight: 700; fill: {t_you}; }}
            .t-sub {{ font-family: 'Outfit', system-ui, sans-serif; font-weight: 500; fill: {t_sub}; letter-spacing: 3px; }}
        </style>
    </defs>
    """

def get_icon(dark=False):
    stroke_clr = '#FFFFFF' if dark else '#212121'
    return f"""
    <g>
        <!-- Flame Base -->
        <path d="M50 5 C50 5 15 45 15 70 C15 89.33 30.67 105 50 105 C69.33 105 85 89.33 85 70 C85 45 50 5 50 5 Z" fill="{COLORS['red']}" />
        <!-- Inner Flame -->
        <path d="M50 35 C50 35 30 60 30 78 C30 89.04 38.96 98 50 98 C61.04 98 70 89.04 70 78 C70 60 50 35 50 35 Z" fill="{COLORS['orange']}" />
        
        <!-- Snowflake Cutout / Overlay -->
        <g transform="translate(50, 75) scale(0.35)" stroke="{COLORS['white']}" stroke-width="7" stroke-linecap="round">
           <line x1="0" y1="-35" x2="0" y2="35" />
           <line x1="-30.31" y1="-17.5" x2="30.31" y2="17.5" />
           <line x1="-30.31" y1="17.5" x2="30.31" y2="-17.5" />
           <path d="M -12 -22 L 0 -34 L 12 -22" fill="none" />
           <path d="M -12 22 L 0 34 L 12 22" fill="none" />
           <path d="M 25.06 -4.43 L 29.44 -17 L 16.89 -21.38" fill="none" />
           <path d="M -25.06 4.43 L -29.44 17 L -16.89 21.38" fill="none" />
           <path d="M -25.06 -4.43 L -29.44 -17 L -16.89 -21.38" fill="none" />
           <path d="M 25.06 4.43 L 29.44 17 L 16.89 21.38" fill="none" />
        </g>
        
        <!-- Grill Grates -->
        <g stroke="{stroke_clr}" stroke-width="5" stroke-linecap="round">
            <path d="M 20 115 L 80 115" />
            <path d="M 25 125 L 75 125" />
            <path d="M 35 115 L 35 125" stroke-width="4" />
            <path d="M 50 115 L 50 125" stroke-width="4" />
            <path d="M 65 115 L 65 125" stroke-width="4" />
        </g>
    </g>
    """

def get_wordmark():
    return f"""
    <g>
        <text x="0" y="60">
            <tspan class="t-bar" font-size="72">Bar</tspan><tspan class="t-bq" font-size="72">BQ</tspan>
            <tspan class="t-bar" font-size="72"> </tspan>
            <tspan class="t-4" font-size="54" dy="-5">4</tspan>
            <tspan class="t-you" font-size="54" dy="0"> You</tspan>
        </text>
        <text x="5" y="90" class="t-sub" font-size="14">FROZEN FOODS &amp; CATERING</text>
    </g>
    """

def wrap_svg(content, width, height, viewbox, dark=False):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="{viewbox}">
    {get_style(dark)}
    {content}
</svg>"""

# 1. Icon Only
icon_only = wrap_svg(get_icon(), 200, 260, "0 0 100 130")

# 2. Wordmark Only
wordmark_only = wrap_svg(get_wordmark(), 400, 120, "0 0 400 120")

# 3. Primary (Horizontal)
primary_content = f"""
    <g transform="translate(0, 5) scale(0.9)">
        {get_icon()}
    </g>
    <g transform="translate(100, 15)">
        {get_wordmark()}
    </g>
"""
primary = wrap_svg(primary_content, 500, 125, "0 0 500 125")

# 3b. Primary (Horizontal Dark)
primary_dark_content = f"""
    <g transform="translate(0, 5) scale(0.9)">
        {get_icon(dark=True)}
    </g>
    <g transform="translate(100, 15)">
        {get_wordmark()}
    </g>
"""
primary_dark = wrap_svg(primary_dark_content, 500, 125, "0 0 500 125", dark=True)

# 4. Stacked (Vertical)
stacked_content = f"""
    <g transform="translate(150, 0) scale(1)">
        {get_icon()}
    </g>
    <g transform="translate(25, 140) scale(1)">
        {get_wordmark()}
    </g>
"""
stacked = wrap_svg(stacked_content, 400, 260, "0 0 400 260")

# 5. Monochrome Black
mono_style = """
<defs>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;900&amp;display=swap');
        .t-bar, .t-bq, .t-4, .t-you { font-family: 'Outfit', system-ui, sans-serif; font-weight: 900; fill: #000000; }
        .t-4, .t-you { font-weight: 700; }
        .t-sub { font-family: 'Outfit', system-ui, sans-serif; font-weight: 500; fill: #000000; letter-spacing: 3px; }
        .flame-base { fill: none; stroke: #000000; stroke-width: 4;}
        .flame-inner { fill: none; stroke: #000000; stroke-width: 3;}
        .flake { stroke: #000000; }
        .grates { stroke: #000000; }
    </style>
</defs>
"""
mono_icon = f"""
    <g>
        <path class="flame-base" d="M50 5 C50 5 15 45 15 70 C15 89.33 30.67 105 50 105 C69.33 105 85 89.33 85 70 C85 45 50 5 50 5 Z" />
        <path class="flame-inner" d="M50 35 C50 35 30 60 30 78 C30 89.04 38.96 98 50 98 C61.04 98 70 89.04 70 78 C70 60 50 35 50 35 Z" />
        
        <g class="flake" transform="translate(50, 75) scale(0.35)" stroke-width="7" stroke-linecap="round">
           <line x1="0" y1="-35" x2="0" y2="35" />
           <line x1="-30.31" y1="-17.5" x2="30.31" y2="17.5" />
           <line x1="-30.31" y1="17.5" x2="30.31" y2="-17.5" />
           <path d="M -12 -22 L 0 -34 L 12 -22" fill="none" />
           <path d="M -12 22 L 0 34 L 12 22" fill="none" />
           <path d="M 25.06 -4.43 L 29.44 -17 L 16.89 -21.38" fill="none" />
           <path d="M -25.06 4.43 L -29.44 17 L -16.89 21.38" fill="none" />
           <path d="M -25.06 -4.43 L -29.44 -17 L -16.89 -21.38" fill="none" />
           <path d="M 25.06 4.43 L 29.44 17 L 16.89 21.38" fill="none" />
        </g>
        
        <g class="grates" stroke-width="5" stroke-linecap="round">
            <path d="M 20 115 L 80 115" />
            <path d="M 25 125 L 75 125" />
            <path d="M 35 115 L 35 125" stroke-width="4" />
            <path d="M 50 115 L 50 125" stroke-width="4" />
            <path d="M 65 115 L 65 125" stroke-width="4" />
        </g>
    </g>
"""

mono_stacked_content = f"""
    {mono_style}
    <g transform="translate(150, 0) scale(1)">
        {mono_icon}
    </g>
    <g transform="translate(25, 140) scale(1)">
        <text x="0" y="60">
            <tspan class="t-bar" font-size="72">Bar</tspan><tspan class="t-bq" font-size="72">BQ</tspan>
            <tspan class="t-bar" font-size="72"> </tspan>
            <tspan class="t-4" font-size="54" dy="-5">4</tspan>
            <tspan class="t-you" font-size="54" dy="0"> You</tspan>
        </text>
        <text x="5" y="90" class="t-sub" font-size="14">FROZEN FOODS &amp; CATERING</text>
    </g>
"""
mono_logo = f"""<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
    {mono_stacked_content}
</svg>"""

with open(os.path.join(out_dir, "icon_only.svg"), "w") as f: f.write(icon_only)
with open(os.path.join(out_dir, "wordmark_only.svg"), "w") as f: f.write(wordmark_only)
with open(os.path.join(out_dir, "primary_horizontal.svg"), "w", encoding="utf-8") as f: f.write(primary)
with open(os.path.join(out_dir, "primary_horizontal_dark.svg"), "w", encoding="utf-8") as f: f.write(primary_dark)
with open(os.path.join(out_dir, "secondary_stacked.svg"), "w", encoding="utf-8") as f: f.write(stacked)
with open(os.path.join(out_dir, "monochrome_stacked.svg"), "w", encoding="utf-8") as f: f.write(mono_logo)

# Generate HTML preview
html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BarBQ 4 You - Logo Concepts</title>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
            color: #333;
            margin: 0;
            padding: 40px;
        }}
        h1 {{
            text-align: center;
            color: #111;
        }}
        .grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
        }}
        .card {{
            background: #fff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            text-align: center;
        }}
        .card.dark {{
            background: #212121;
            color: #fff;
        }}
        .card h3 {{
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 18px;
            color: #666;
        }}
        .card.dark h3 {{
            color: #aaa;
        }}
        .img-container {{
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
        }}
    </style>
</head>
<body>
    <h1>BarBQ 4 You - Vector Logo Concepts</h1>
    
    <div class="grid">
        <div class="card">
            <h3>Primary Layout (Horizontal)</h3>
            <div class="img-container">
                <img src="primary_horizontal.svg" alt="Primary Logo">
            </div>
        </div>
        
        <div class="card">
            <h3>Secondary Layout (Stacked)</h3>
            <div class="img-container">
                <img src="secondary_stacked.svg" alt="Stacked Logo">
            </div>
        </div>
        
        <div class="card dark">
            <h3>Primary Layout (Dark Mode)</h3>
            <div class="img-container">
                <img src="primary_horizontal_dark.svg" alt="Primary Logo Dark">
            </div>
        </div>
        
        <div class="card">
            <h3>Icon Only</h3>
            <div class="img-container">
                <img src="icon_only.svg" alt="Icon Only" style="height:150px;">
            </div>
        </div>
        
        <div class="card">
            <h3>Wordmark Only</h3>
            <div class="img-container">
                <img src="wordmark_only.svg" alt="Wordmark Only">
            </div>
        </div>
        
        <div class="card">
            <h3>Monochrome (Black/White)</h3>
            <div class="img-container">
                <img src="monochrome_stacked.svg" alt="Monochrome">
            </div>
        </div>
    </div>
</body>
</html>'''

with open(os.path.join(out_dir, "preview.html"), "w", encoding="utf-8") as f:
    f.write(html)

print("Files generated successfully at " + out_dir)
