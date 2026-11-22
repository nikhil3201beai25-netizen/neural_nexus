import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    # 16:9 widescreen
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Colors
    DARK_BG = RGBColor(18, 21, 23)        # #121517
    LIGHT_BG = RGBColor(248, 250, 252)    # #f8fafc
    WHITE = RGBColor(255, 255, 255)
    ACCENT_GREEN = RGBColor(74, 222, 128) # #4ade80 / bright green
    DARK_GREEN = RGBColor(22, 163, 74)    # #16a34a
    PALE_GREEN = RGBColor(240, 253, 244)  # #f0fdf4
    TEXT_DARK = RGBColor(15, 23, 42)      # #0f172a
    TEXT_MUTED = RGBColor(100, 116, 139)  # #64748b
    BORDER_LIGHT = RGBColor(226, 232, 240)# #e2e8f0

    def set_bg(slide, color):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, number_str, title_str, subtitle_str):
        # Header text frame
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.6), Inches(11.7), Inches(1.3))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        p = tf.paragraphs[0]
        r1 = p.add_run()
        r1.text = number_str + " "
        r1.font.bold = True
        r1.font.size = Pt(28)
        r1.font.color.rgb = ACCENT_GREEN
        r1.font.name = "Arial"
        
        r2 = p.add_run()
        r2.text = title_str
        r2.font.bold = True
        r2.font.size = Pt(28)
        r2.font.color.rgb = TEXT_DARK
        r2.font.name = "Arial"
        
        if subtitle_str:
            p2 = tf.add_paragraph()
            p2.space_before = Pt(8)
            r3 = p2.add_run()
            r3.text = subtitle_str
            r3.font.size = Pt(13)
            r3.font.color.rgb = TEXT_MUTED
            r3.font.name = "Arial"

    # ==========================================
    # SLIDE 1: Cover (Dark theme)
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    set_bg(s1, DARK_BG)

    tb1 = s1.shapes.add_textbox(Inches(0.9), Inches(1.8), Inches(11.5), Inches(4.5))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    
    # Tag
    p_tag = tf1.paragraphs[0]
    r_tag = p_tag.add_run()
    r_tag.text = "THE BUILDER'S THEORY 1.0 • HACKERS CULT × NEXERA"
    r_tag.font.bold = True
    r_tag.font.size = Pt(11)
    r_tag.font.color.rgb = ACCENT_GREEN
    r_tag.font.name = "Arial"

    # Title
    p_title = tf1.add_paragraph()
    p_title.space_before = Pt(24)
    r_title = p_title.add_run()
    r_title.text = "AgriConnect"
    r_title.font.bold = True
    r_title.font.size = Pt(64)
    r_title.font.color.rgb = WHITE
    r_title.font.name = "Arial"

    # Subtitle
    p_sub = tf1.add_paragraph()
    p_sub.space_before = Pt(18)
    r_sub = p_sub.add_run()
    r_sub.text = "Centralized platform matching regional climate and seasons with certified\nseeds, fertilizers, and agricultural equipment across India."
    r_sub.font.size = Pt(16)
    r_sub.font.color.rgb = RGBColor(203, 213, 225)
    r_sub.font.name = "Arial"

    # Line shape
    line = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.9), Inches(4.8), Inches(1.2), Inches(0.04))
    line.fill.solid()
    line.fill.fore_color.rgb = ACCENT_GREEN
    line.line.color.rgb = ACCENT_GREEN

    # Team Box
    tb_team = s1.shapes.add_textbox(Inches(0.9), Inches(5.1), Inches(11.5), Inches(1.2))
    tf_team = tb_team.text_frame
    p_t1 = tf_team.paragraphs[0]
    r_t1 = p_t1.add_run()
    r_t1.text = "TEAM AGRICONNECT"
    r_t1.font.bold = True
    r_t1.font.size = Pt(11)
    r_t1.font.color.rgb = ACCENT_GREEN
    
    p_t2 = tf_team.add_paragraph()
    p_t2.space_before = Pt(4)
    r_t2 = p_t2.add_run()
    r_t2.text = "Nikhil • Vanshika • Parneet • Maan • Yash"
    r_t2.font.size = Pt(12)
    r_t2.font.color.rgb = RGBColor(148, 163, 184)

    # ==========================================
    # SLIDE 2: The Problem (Light theme)
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    set_bg(s2, LIGHT_BG)
    add_header(s2, "02", "The Problem", "No centralized platform matches seasonal climate realities with verified inputs, stalling farmer prosperity.")

    cards_s2 = [
        ("The Core Problem", "Fragmented agro-climatic guidance and unaddressed regional soil vulnerabilities.", "🌾"),
        ("Who Is Affected", "Smallholder farmers, rural FPOs, and village panchayat communities.", "👥"),
        ("Why Options Fall Short", "Generic recommendations ignore local weather; duplicate inputs flood markets.", "📦")
    ]
    card_w = Inches(3.6)
    card_h = Inches(3.4)
    top_y = Inches(2.7)
    gap = Inches(0.4)
    start_x = Inches(0.8)

    for i, (title, desc, icon) in enumerate(cards_s2):
        x = start_x + i * (card_w + gap)
        box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, top_y, card_w, card_h)
        box.fill.solid()
        box.fill.fore_color.rgb = WHITE
        box.line.color.rgb = BORDER_LIGHT
        box.line.width = Pt(1)

        tb = s2.shapes.add_textbox(x + Inches(0.3), top_y + Inches(0.3), card_w - Inches(0.6), card_h - Inches(0.6))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p0 = tf.paragraphs[0]
        r0 = p0.add_run()
        r0.text = icon + "\n"
        r0.font.size = Pt(24)

        p1 = tf.add_paragraph()
        p1.space_before = Pt(8)
        r1 = p1.add_run()
        r1.text = title
        r1.font.bold = True
        r1.font.size = Pt(16)
        r1.font.color.rgb = TEXT_DARK

        p2 = tf.add_paragraph()
        p2.space_before = Pt(8)
        r2 = p2.add_run()
        r2.text = desc
        r2.font.size = Pt(12)
        r2.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 3: The Solution (Light theme)
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    set_bg(s3, LIGHT_BG)
    add_header(s3, "03", "The Solution", "")

    # Left Box (Tinted)
    left_w = Inches(4.5)
    left_h = Inches(3.8)
    l_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.4), left_w, left_h)
    l_box.fill.solid()
    l_box.fill.fore_color.rgb = PALE_GREEN
    l_box.line.color.rgb = RGBColor(187, 247, 208)

    l_tb = s3.shapes.add_textbox(Inches(1.2), Inches(2.8), left_w - Inches(0.8), left_h - Inches(0.8))
    l_tf = l_tb.text_frame
    l_tf.word_wrap = True
    
    lp0 = l_tf.paragraphs[0]
    lr0 = lp0.add_run()
    lr0.text = "THE CORE ENGINE\n"
    lr0.font.bold = True
    lr0.font.size = Pt(10)
    lr0.font.color.rgb = DARK_GREEN

    lp1 = l_tf.add_paragraph()
    lr1 = lp1.add_run()
    lr1.text = "End-to-End Smart\nAgri Ecosystem\n"
    lr1.font.bold = True
    lr1.font.size = Pt(22)
    lr1.font.color.rgb = TEXT_DARK

    lp2 = l_tf.add_paragraph()
    lp2.space_before = Pt(10)
    lr2 = lp2.add_run()
    lr2.text = "Connects seasonal climate predictions with verified seeds, fertilizers, and subsidized tools."
    lr2.font.size = Pt(13)
    lr2.font.color.rgb = RGBColor(51, 65, 85)

    # Right side 3 features
    feats = [
        ("Smart Climate Matching", "Recommends best-fit crops based on North, South, West, and East agro-climatic zones.", "🌱"),
        ("Certified Input Store", "Verified high-yield seeds, water-soluble fertilizers, and subsidized small equipment.", "🛡️"),
        ("Live Farmer Guard", "Calculates precision NPK bags, monitors 7-day weather, and dispatches to villages.", "📈")
    ]
    r_start_y = Inches(2.4)
    r_gap = Inches(1.3)
    for i, (title, desc, icon) in enumerate(feats):
        y = r_start_y + i * r_gap
        # Icon badge
        badge = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.8), y + Inches(0.05), Inches(0.6), Inches(0.6))
        badge.fill.solid()
        badge.fill.fore_color.rgb = PALE_GREEN
        badge.line.color.rgb = RGBColor(187, 247, 208)
        b_tb = s3.shapes.add_textbox(Inches(5.8), y + Inches(0.05), Inches(0.6), Inches(0.6))
        b_tf = b_tb.text_frame
        b_p = b_tf.paragraphs[0]
        b_p.alignment = PP_ALIGN.CENTER
        b_r = b_p.add_run()
        b_r.text = icon
        b_r.font.size = Pt(14)

        # Text
        f_tb = s3.shapes.add_textbox(Inches(6.6), y, Inches(5.9), Inches(1.2))
        f_tf = f_tb.text_frame
        f_tf.word_wrap = True
        fp1 = f_tf.paragraphs[0]
        fr1 = fp1.add_run()
        fr1.text = title + "\n"
        fr1.font.bold = True
        fr1.font.size = Pt(14)
        fr1.font.color.rgb = TEXT_DARK

        fp2 = f_tf.add_paragraph()
        fr2 = fp2.add_run()
        fr2.text = desc
        fr2.font.size = Pt(11)
        fr2.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 4: How It Works (Light theme)
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    set_bg(s4, LIGHT_BG)
    add_header(s4, "04", "How It Works", "End-to-end system flow connecting farmers to verified agricultural prosperity.")

    steps = [
        ("01 • INPUT", "Zone & Land Profile", "Farmer enters Indian region, state, soil type, and cropping season."),
        ("02 • PROCESS", "Climate Matching", "Recommends high-yielding hybrid varieties & optimal sowing window."),
        ("03 • CORE LOGIC", "Precise Input Sizing", "Calculates commercial NPK bags and suggests compatible tools."),
        ("04 • OUTPUT", "Doorstep Delivery", "Direct village dispatch with Cash on Delivery & KCC financing.")
    ]
    s_w = Inches(2.6)
    s_h = Inches(3.4)
    s_y = Inches(2.7)
    s_start_x = Inches(0.8)
    s_gap = Inches(0.4)

    for i, (tag, title, desc) in enumerate(steps):
        x = s_start_x + i * (s_w + s_gap)
        box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, s_y, s_w, s_h)
        box.fill.solid()
        box.fill.fore_color.rgb = WHITE
        box.line.color.rgb = BORDER_LIGHT

        tb = s4.shapes.add_textbox(x + Inches(0.2), s_y + Inches(0.3), s_w - Inches(0.4), s_h - Inches(0.6))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p0 = tf.paragraphs[0]
        r0 = p0.add_run()
        r0.text = tag + "\n"
        r0.font.bold = True
        r0.font.size = Pt(10)
        r0.font.color.rgb = DARK_GREEN

        p1 = tf.add_paragraph()
        p1.space_before = Pt(6)
        r1 = p1.add_run()
        r1.text = title + "\n"
        r1.font.bold = True
        r1.font.size = Pt(14)
        r1.font.color.rgb = TEXT_DARK

        p2 = tf.add_paragraph()
        p2.space_before = Pt(6)
        r2 = p2.add_run()
        r2.text = desc
        r2.font.size = Pt(11)
        r2.font.color.rgb = TEXT_MUTED

        if i < 3:
            # Arrow indicator
            arrow_x = x + s_w + Inches(0.1)
            atb = s4.shapes.add_textbox(arrow_x, s_y + Inches(1.4), Inches(0.3), Inches(0.4))
            atf = atb.text_frame
            ap = atf.paragraphs[0]
            ar = ap.add_run()
            ar.text = "→"
            ar.font.bold = True
            ar.font.size = Pt(18)
            ar.font.color.rgb = ACCENT_GREEN

    # ==========================================
    # SLIDE 5: Business Model & Value (Light theme)
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    set_bg(s5, LIGHT_BG)
    add_header(s5, "05", "Business Model & Value", "")

    # Left Section
    tb_b_l = s5.shapes.add_textbox(Inches(0.8), Inches(2.3), Inches(5.2), Inches(4.5))
    tf_b_l = tb_b_l.text_frame
    tf_b_l.word_wrap = True

    p_u1 = tf_b_l.paragraphs[0]
    r_u1 = p_u1.add_run()
    r_u1.text = "01 • PRIMARY USERS\n"
    r_u1.font.bold = True
    r_u1.font.size = Pt(10)
    r_u1.font.color.rgb = DARK_GREEN

    p_u2 = tf_b_l.add_paragraph()
    r_u2 = p_u2.add_run()
    r_u2.text = "Two-Sided Rural Ecosystem\n"
    r_u2.font.bold = True
    r_u2.font.size = Pt(18)
    r_u2.font.color.rgb = TEXT_DARK

    p_u3 = tf_b_l.add_paragraph()
    r_u3 = p_u3.add_run()
    r_u3.text = "Smallholder farmers access certified inputs and advisory; seed producers and equipment makers reach village clusters directly.\n\n"
    r_u3.font.size = Pt(12)
    r_u3.font.color.rgb = TEXT_MUTED

    p_c1 = tf_b_l.add_paragraph()
    r_c1 = p_c1.add_run()
    r_c1.text = "02 • PRACTICAL USE CASE\n"
    r_c1.font.bold = True
    r_c1.font.size = Pt(10)
    r_c1.font.color.rgb = DARK_GREEN

    p_c2 = tf_b_l.add_paragraph()
    r_c2 = p_c2.add_run()
    r_c2.text = "Punjab & Nashik Farm Pilots\n"
    r_c2.font.bold = True
    r_c2.font.size = Pt(18)
    r_c2.font.color.rgb = TEXT_DARK

    p_c3 = tf_b_l.add_paragraph()
    r_c3 = p_c3.add_run()
    r_c3.text = "Farmer selects HD-3086 seed, sizes precise DAP bags, and claims 40% SMAM equipment subsidy."
    r_c3.font.size = Pt(12)
    r_c3.font.color.rgb = TEXT_MUTED

    # Right Card (Tinted)
    r_box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.5), Inches(2.3), Inches(6.0), Inches(4.3))
    r_box.fill.solid()
    r_box.fill.fore_color.rgb = PALE_GREEN
    r_box.line.color.rgb = RGBColor(187, 247, 208)

    tb_b_r = s5.shapes.add_textbox(Inches(6.8), Inches(2.6), Inches(5.4), Inches(3.8))
    tf_b_r = tb_b_r.text_frame
    tf_b_r.word_wrap = True

    pr0 = tf_b_r.paragraphs[0]
    rr0 = pr0.add_run()
    rr0.text = "03 • VALUE CREATED & SUSTAINABILITY\n"
    rr0.font.bold = True
    rr0.font.size = Pt(10)
    rr0.font.color.rgb = DARK_GREEN

    pr1 = tf_b_r.add_paragraph()
    rr1 = pr1.add_run()
    rr1.text = "Measurable Agricultural ROI\n\n"
    rr1.font.bold = True
    rr1.font.size = Pt(20)
    rr1.font.color.rgb = TEXT_DARK

    points = [
        ("Zero Middleman Markup: ", "Direct supply chain cuts farmer input costs by 15-20%."),
        ("30-40% Yield Boost: ", "Scientific variety selection prevents catastrophic seasonal failures."),
        ("B2B & FPO Partnerships: ", "Monetizes bulk procurement commissions and equipment rentals."),
        ("Govt Scheme Enablement: ", "Facilitates SMAM subsidies & KCC concessional credit.")
    ]
    for bold_text, normal_text in points:
        p = tf_b_r.add_paragraph()
        p.space_before = Pt(6)
        r_b = p.add_run()
        r_b.text = bold_text
        r_b.font.bold = True
        r_b.font.size = Pt(11)
        r_b.font.color.rgb = TEXT_DARK
        
        r_n = p.add_run()
        r_n.text = normal_text
        r_n.font.size = Pt(11)
        r_n.font.color.rgb = RGBColor(51, 65, 85)

    # ==========================================
    # SLIDE 6: Tech Stack (Light theme)
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    set_bg(s6, LIGHT_BG)
    add_header(s6, "06", "Tech Stack", "Factual, rapid-deployment architecture powering the AgriConnect platform.")

    techs = [
        ("FRONTEND", "React 18 + Tailwind", "Fast, responsive bilingual UI (English/Hindi).", "</>"),
        ("BACKEND", "Node.js + Vite", "High-performance modular runtime & live dev server.", "🗄️"),
        ("AGRONOMY ENGINE", "Zone Heuristic Logic", "Climate, soil, and NPK calculation algorithms.", "🧠"),
        ("AUTHENTICATION", "Mobile OTP + KCC", "Verified farmer profiles & village checkout.", "🛡️")
    ]
    t_w = Inches(2.6)
    t_h = Inches(3.4)
    t_y = Inches(2.7)

    for i, (tag, title, desc, icon) in enumerate(techs):
        x = s_start_x + i * (t_w + s_gap)
        box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, t_y, t_w, t_h)
        box.fill.solid()
        box.fill.fore_color.rgb = WHITE
        box.line.color.rgb = BORDER_LIGHT

        tb = s6.shapes.add_textbox(x + Inches(0.2), t_y + Inches(0.3), t_w - Inches(0.4), t_h - Inches(0.6))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        r0 = p0.add_run()
        r0.text = icon + "\n\n"
        r0.font.size = Pt(18)

        p1 = tf.add_paragraph()
        r1 = p1.add_run()
        r1.text = tag + "\n"
        r1.font.bold = True
        r1.font.size = Pt(9)
        r1.font.color.rgb = DARK_GREEN

        p2 = tf.add_paragraph()
        p2.space_before = Pt(4)
        r2 = p2.add_run()
        r2.text = title + "\n"
        r2.font.bold = True
        r2.font.size = Pt(14)
        r2.font.color.rgb = TEXT_DARK

        p3 = tf.add_paragraph()
        p3.space_before = Pt(6)
        r3 = p3.add_run()
        r3.text = desc
        r3.font.size = Pt(11)
        r3.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 7: The Rollout Plan (Light theme)
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    set_bg(s7, LIGHT_BG)
    add_header(s7, "07", "The Rollout Plan", "Credible roadmap from verified prototype to multi-state rural adoption.")

    plans = [
        ("01 • NOW", "Build & Validate", "Complete working prototype with North, South, West & East zones and store.", True),
        ("02 • NEXT", "Regional District Pilot", "Onboard 500+ farmers and 10 village FPOs across Punjab and Maharashtra.", False),
        ("03 • THEN", "Scale & Subsidies", "Full integration with SMAM portal and state agricultural universities (KVKs).", False)
    ]
    p_w = Inches(3.6)
    p_h = Inches(3.2)
    p_y = Inches(2.7)

    for i, (tag, title, desc, is_active) in enumerate(plans):
        x = start_x + i * (p_w + gap)
        box = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, p_y, p_w, p_h)
        box.fill.solid()
        box.fill.fore_color.rgb = PALE_GREEN if is_active else WHITE
        box.line.color.rgb = RGBColor(187, 247, 208) if is_active else BORDER_LIGHT

        tb = s7.shapes.add_textbox(x + Inches(0.3), p_y + Inches(0.3), p_w - Inches(0.6), p_h - Inches(0.6))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        r0 = p0.add_run()
        r0.text = tag + "\n"
        r0.font.bold = True
        r0.font.size = Pt(10)
        r0.font.color.rgb = DARK_GREEN

        p1 = tf.add_paragraph()
        p1.space_before = Pt(6)
        r1 = p1.add_run()
        r1.text = title + "\n"
        r1.font.bold = True
        r1.font.size = Pt(16)
        r1.font.color.rgb = TEXT_DARK

        p2 = tf.add_paragraph()
        p2.space_before = Pt(8)
        r2 = p2.add_run()
        r2.text = desc
        r2.font.size = Pt(12)
        r2.font.color.rgb = TEXT_MUTED

    # ==========================================
    # SLIDE 8: Demo & Closing (Dark theme)
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    set_bg(s8, DARK_BG)

    tb8 = s8.shapes.add_textbox(Inches(0.9), Inches(0.8), Inches(11.5), Inches(5.8))
    tf8 = tb8.text_frame
    tf8.word_wrap = True

    p8_0 = tf8.paragraphs[0]
    r8_0a = p8_0.add_run()
    r8_0a.text = "08 "
    r8_0a.font.bold = True
    r8_0a.font.size = Pt(28)
    r8_0a.font.color.rgb = ACCENT_GREEN

    r8_0b = p8_0.add_run()
    r8_0b.text = "Pre-Loaded Demo Features"
    r8_0b.font.bold = True
    r8_0b.font.size = Pt(28)
    r8_0b.font.color.rgb = WHITE

    p8_sub = tf8.add_paragraph()
    p8_sub.space_before = Pt(6)
    r8_sub = p8_sub.add_run()
    r8_sub.text = "5 real-world modules ready for live demonstration on AgriConnect."
    r8_sub.font.size = Pt(13)
    r8_sub.font.color.rgb = RGBColor(148, 163, 184)

    demos = [
        ("01", "4-Zone Climate Crop Recommender: ", "North, South, West & East seasonal crop intelligence."),
        ("02", "Certified Input Store: ", "High-yield seeds, fertilizers & small tools with SMAM subsidy."),
        ("03", "Precision Soil NPK Calculator: ", "Exact bags of Urea, DAP, MOP & Zinc with 3-stage split schedule."),
        ("04", "7-Day Agro-Weather Bulletin: ", "Pest warnings (Aphids, Late Blight, BPH) & rain forecasts."),
        ("05", "Farmer Portal & Village Delivery: ", "Mobile OTP login, KCC financing & doorstep tracking.")
    ]

    for num, bold_t, rest_t in demos:
        p = tf8.add_paragraph()
        p.space_before = Pt(14)
        
        rn = p.add_run()
        rn.text = num + " "
        rn.font.bold = True
        rn.font.size = Pt(13)
        rn.font.color.rgb = ACCENT_GREEN

        rb = p.add_run()
        rb.text = bold_t
        rb.font.bold = True
        rb.font.size = Pt(13)
        rb.font.color.rgb = WHITE

        rr = p.add_run()
        rr.text = rest_t
        rr.font.size = Pt(13)
        rr.font.color.rgb = RGBColor(203, 213, 225)

    p8_end = tf8.add_paragraph()
    p8_end.space_before = Pt(28)
    r8_end = p8_end.add_run()
    r8_end.text = "THANK YOU • READY FOR LIVE DEMO & Q&A"
    r8_end.font.bold = True
    r8_end.font.size = Pt(11)
    r8_end.font.color.rgb = ACCENT_GREEN

    # Save presentations
    output_path = "/Users/nikhilsheoran093gmail.com/Desktop/agriconnect/AgriConnect_Presentation.pptx"
    prs.save(output_path)
    print(f"Saved: {output_path}")

create_presentation()
