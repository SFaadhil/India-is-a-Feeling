const pptxgen = require("pptxgenjs");

const C = {
  DARK:    "0B1D3A",
  NAVY:    "152D57",
  GOLD:    "D4A847",
  GOLD_L:  "F0D99E",
  WHITE:   "FFFFFF",
  LIGHT:   "F4F6F9",
  CARD:    "FFFFFF",
  TEXT:    "1A2A4A",
  MUTED:   "6B7B8D",
  DIVIDER: "E2E8F0",
  TEAL:    "0D7C8C",
  GREEN:   "10B981",
  ORANGE:  "E86A2A",
  PURPLE:  "7C3AED",
};

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "NxtWave Partnership Proposal – AIESEC × Jagriti Yatra";
pres.author = "AIESEC in India";

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.10 });

function addLightFooter(slide, pageNum) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.27, w: 10, h: 0.355,
    fill: { color: C.DIVIDER }, line: { color: C.DIVIDER }
  });
  slide.addText(`AIESEC × Jagriti Yatra  |  NxtWave Strategic Partnership Proposal  |  Confidential`, {
    x: 0.3, y: 5.27, w: 7.5, h: 0.355,
    fontSize: 8.5, color: C.MUTED, valign: "middle", margin: 0
  });
  slide.addText(String(pageNum).padStart(2, "0"), {
    x: 9.4, y: 5.27, w: 0.5, h: 0.355,
    fontSize: 11, bold: true, color: C.MUTED, valign: "middle", align: "center", margin: 0
  });
}

function addDarkFooter(slide, pageNum) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.27, w: 10, h: 0.355,
    fill: { color: C.NAVY }, line: { color: C.NAVY }
  });
  slide.addText("AIESEC × Jagriti Yatra  |  NxtWave Strategic Partnership Proposal  |  Confidential", {
    x: 0.3, y: 5.27, w: 7.5, h: 0.355,
    fontSize: 8.5, color: C.GOLD_L, valign: "middle", margin: 0
  });
  slide.addText(String(pageNum).padStart(2, "0"), {
    x: 9.4, y: 5.27, w: 0.5, h: 0.355,
    fontSize: 11, bold: true, color: C.GOLD, valign: "middle", align: "center", margin: 0
  });
}

function addSectionHeader(slide, title) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.3, w: 0.06, h: 0.42,
    fill: { color: C.GOLD }, line: { color: C.GOLD }
  });
  slide.addText(title.toUpperCase(), {
    x: 0.6, y: 0.3, w: 9.0, h: 0.42,
    fontSize: 16, bold: true, color: C.TEXT, valign: "middle", charSpacing: 1, margin: 0
  });
}

// ─────────────────────────────────────────────────
//  SLIDE 1 — COVER
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.DARK };

  // Left accent panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.3, h: 5.625, fill: { color: C.NAVY }, line: { color: C.NAVY } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.GOLD }, line: { color: C.GOLD } });

  // Left: orgs
  s.addText("FROM", { x: 0.28, y: 0.45, w: 2.8, h: 0.28, fontSize: 8, color: C.GOLD, bold: true, charSpacing: 3, margin: 0 });
  s.addText("AIESEC\nIN INDIA", { x: 0.28, y: 0.8, w: 2.85, h: 0.85, fontSize: 22, bold: true, color: C.WHITE, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 1.72, w: 2.7, h: 0.04, fill: { color: C.GOLD_L }, line: { color: C.GOLD_L } });
  s.addText("IN COLLABORATION WITH", { x: 0.28, y: 1.83, w: 2.85, h: 0.24, fontSize: 7.5, color: C.GOLD_L, charSpacing: 1.5, margin: 0 });
  s.addText("JAGRITI\nYATRA", { x: 0.28, y: 2.12, w: 2.85, h: 0.8, fontSize: 20, bold: true, color: C.WHITE, margin: 0 });

  // Contact placeholder
  s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 4.5, w: 2.7, h: 0.04, fill: { color: C.GOLD_L }, line: { color: C.GOLD_L } });
  s.addText("[Name, Designation]\n[email@aiesec.in]  |  [+91 XXXXX]", { x: 0.28, y: 4.6, w: 2.85, h: 0.55, fontSize: 9, color: C.MUTED, margin: 0 });

  // Right: main headline
  s.addText("STRATEGIC PARTNERSHIP PROPOSAL", {
    x: 3.55, y: 0.75, w: 6.1, h: 0.35,
    fontSize: 9.5, bold: true, color: C.GOLD, charSpacing: 2.5, margin: 0
  });
  s.addText("Building India's\nLargest Youth\nEmployability &\nFuture Skills\nMovement", {
    x: 3.55, y: 1.15, w: 6.1, h: 3.1,
    fontSize: 30, bold: true, color: C.WHITE, lineSpacingMultiple: 1.15, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.55, y: 4.4, w: 2.8, h: 0.04, fill: { color: C.GOLD }, line: { color: C.GOLD } });
  s.addText("Presented to NxtWave Leadership  ·  June 2026  ·  Confidential", {
    x: 3.55, y: 4.52, w: 6.1, h: 0.3, fontSize: 9.5, color: C.MUTED, margin: 0
  });

  // Stat strip bottom-right
  const stats = [["4,000+", "Students"], ["8", "Cities"], ["1", "Movement"]];
  stats.forEach(([n, l], i) => {
    const sx = 3.55 + i * 2.1;
    s.addShape(pres.shapes.RECTANGLE, { x: sx, y: 4.9, w: 1.95, h: 0.65, fill: { color: C.NAVY }, line: { color: "1E3560" } });
    s.addText(n, { x: sx + 0.08, y: 4.93, w: 1.8, h: 0.32, fontSize: 16, bold: true, color: C.GOLD, align: "center", margin: 0 });
    s.addText(l, { x: sx + 0.08, y: 5.25, w: 1.8, h: 0.25, fontSize: 8.5, color: C.WHITE, align: "center", margin: 0 });
  });
}

// ─────────────────────────────────────────────────
//  SLIDE 2 — EXECUTIVE SUMMARY
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.LIGHT };
  addSectionHeader(s, "Executive Summary");

  s.addText("A Strategic Partnership Opportunity at National Scale", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.42, fontSize: 17, bold: true, color: C.TEXT, margin: 0
  });
  s.addText(
    "AIESEC in India and Jagriti Yatra invite NxtWave to co-create India's most impactful youth employability initiative — reaching 4,000 university students across 8 cities through curated skill development, career readiness, and future-skills programming. No financial commitment is required; this is a pure value-for-value partnership.",
    { x: 0.45, y: 1.35, w: 9.1, h: 0.62, fontSize: 11, color: C.TEXT, margin: 0 }
  );

  const cards = [
    {
      title: "The Initiative",
      body: "A multi-city youth impact programme co-delivered by AIESEC — the world's largest youth-led organisation — and Jagriti Yatra, India's premier entrepreneurship journey, spanning 8 cities in a single cohesive campaign."
    },
    {
      title: "The Ask",
      body: "NxtWave to serve as the exclusive Employability & Skill Development Partner — providing training modules, career readiness content, and certification for all 4,000 participants. Zero financial outlay."
    },
    {
      title: "The Return",
      body: "Branding across 8 cities, 8 dedicated speaker slots, 20+ co-branded success stories, qualified lead access, a full impact report, and co-ownership of a nationally recognised youth skilling movement."
    }
  ];

  cards.forEach((card, i) => {
    const cx = 0.45 + i * 3.12;
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 2.1, w: 2.97, h: 2.95, fill: { color: C.CARD }, line: { color: C.DIVIDER, width: 0.5 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 2.1, w: 2.97, h: 0.07, fill: { color: C.GOLD }, line: { color: C.GOLD } });
    s.addText(`0${i + 1}`, { x: cx + 0.15, y: 2.22, w: 0.45, h: 0.32, fontSize: 13, bold: true, color: C.GOLD, margin: 0 });
    s.addText(card.title.toUpperCase(), { x: cx + 0.15, y: 2.57, w: 2.65, h: 0.3, fontSize: 10, bold: true, color: C.TEXT, charSpacing: 1, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: cx + 0.15, y: 2.9, w: 2.65, h: 0.03, fill: { color: C.DIVIDER }, line: { color: C.DIVIDER } });
    s.addText(card.body, { x: cx + 0.15, y: 3.0, w: 2.65, h: 1.9, fontSize: 10, color: C.TEXT, margin: 0 });
  });

  addLightFooter(s, 2);
}

// ─────────────────────────────────────────────────
//  SLIDE 3 — ABOUT AIESEC & JAGRITI YATRA
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.LIGHT };
  addSectionHeader(s, "About the Partners");

  s.addText("Two of India's Most Trusted Youth Platforms — Together", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.4, fontSize: 16, bold: true, color: C.TEXT, margin: 0
  });

  // AIESEC card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: 1.42, w: 4.45, h: 3.65, fill: { color: C.DARK }, line: { color: C.DARK }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: 1.42, w: 0.08, h: 3.65, fill: { color: C.GOLD }, line: { color: C.GOLD } });
  s.addText("AIESEC IN INDIA", { x: 0.65, y: 1.58, w: 4.1, h: 0.38, fontSize: 14, bold: true, color: C.WHITE, margin: 0 });
  s.addText("World's Largest Youth-Led Organisation", { x: 0.65, y: 2.0, w: 4.1, h: 0.28, fontSize: 9.5, color: C.GOLD, italic: true, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.65, y: 2.33, w: 3.9, h: 0.03, fill: { color: "1E3560" }, line: { color: "1E3560" } });

  [
    "120+ countries, 100+ cities across India",
    "Internship exchanges, leadership & development programmes",
    "35,000+ active members in India",
    "Trusted partner of Fortune 500 companies globally",
    "Aligned with UN Sustainable Development Goals"
  ].forEach((pt, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.65, y: 2.52 + i * 0.42, w: 0.07, h: 0.07, fill: { color: C.GOLD }, line: { color: C.GOLD } });
    s.addText(pt, { x: 0.82, y: 2.46 + i * 0.42, w: 3.9, h: 0.38, fontSize: 10, color: C.WHITE, margin: 0 });
  });

  // Jagriti card
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.42, w: 4.45, h: 3.65, fill: { color: C.DARK }, line: { color: C.DARK }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.42, w: 0.08, h: 3.65, fill: { color: C.TEAL }, line: { color: C.TEAL } });
  s.addText("JAGRITI YATRA", { x: 5.3, y: 1.58, w: 4.1, h: 0.38, fontSize: 14, bold: true, color: C.WHITE, margin: 0 });
  s.addText("India's Premier Youth Entrepreneurship Journey", { x: 5.3, y: 2.0, w: 4.1, h: 0.28, fontSize: 9.5, color: C.TEAL, italic: true, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 2.33, w: 3.9, h: 0.03, fill: { color: "1E3560" }, line: { color: "1E3560" } });

  [
    "15-day train journey connecting youth across India",
    "Exposes students to grassroots entrepreneurs & changemakers",
    "15+ years of national-scale proven impact",
    "Alumni in India's top organisations and startups",
    "Platform for discovery, enterprise and social purpose"
  ].forEach((pt, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 2.52 + i * 0.42, w: 0.07, h: 0.07, fill: { color: C.TEAL }, line: { color: C.TEAL } });
    s.addText(pt, { x: 5.47, y: 2.46 + i * 0.42, w: 3.9, h: 0.38, fontSize: 10, color: C.WHITE, margin: 0 });
  });

  addLightFooter(s, 3);
}

// ─────────────────────────────────────────────────
//  SLIDE 4 — THE OPPORTUNITY
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.DARK };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.GOLD }, line: { color: C.GOLD } });

  s.addText("THE OPPORTUNITY", { x: 0.5, y: 0.22, w: 9, h: 0.32, fontSize: 9.5, bold: true, color: C.GOLD, charSpacing: 3, margin: 0 });
  s.addText("One Partnership.\nNational-Scale Impact.\nA Generation Transformed.", {
    x: 0.5, y: 0.65, w: 5.6, h: 1.65, fontSize: 26, bold: true, color: C.WHITE, margin: 0, lineSpacingMultiple: 1.2
  });
  s.addText(
    "The convergence of AIESEC's operational reach and Jagriti Yatra's inspirational platform creates a unique channel to deliver NxtWave's employability curriculum to India's most motivated students — at a scale and authenticity no other partnership can replicate.",
    { x: 0.5, y: 2.45, w: 5.5, h: 1.0, fontSize: 11, color: C.GOLD_L, margin: 0 }
  );

  const oppStats = [
    ["4,000+", "Students Reached"],
    ["8", "Cities Simultaneously"],
    ["100%", "Verified Youth Audience"],
    ["₹0", "Financial Outlay Required"]
  ];
  oppStats.forEach(([num, label], i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const bx = 6.1 + col * 1.92;
    const by = 0.65 + row * 2.25;
    s.addShape(pres.shapes.RECTANGLE, { x: bx, y: by, w: 1.78, h: 1.92, fill: { color: C.NAVY }, line: { color: "1E3560" } });
    s.addShape(pres.shapes.RECTANGLE, { x: bx, y: by, w: 1.78, h: 0.06, fill: { color: C.GOLD }, line: { color: C.GOLD } });
    s.addText(num, { x: bx + 0.1, y: by + 0.42, w: 1.58, h: 0.7, fontSize: 26, bold: true, color: C.GOLD, align: "center", margin: 0 });
    s.addText(label, { x: bx + 0.1, y: by + 1.18, w: 1.58, h: 0.55, fontSize: 9, color: C.WHITE, align: "center", margin: 0 });
  });

  addDarkFooter(s, 4);
}

// ─────────────────────────────────────────────────
//  SLIDE 5 — PROBLEM STATEMENT
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.LIGHT };
  addSectionHeader(s, "Problem Statement");

  s.addText("India's Youth Employability Crisis Is Structural — Not Cyclical", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.4, fontSize: 16, bold: true, color: C.TEXT, margin: 0
  });

  const problems = [
    ["51.3%", "of Indian graduates are not job-ready", "India Skills Report 2023"],
    ["65%",   "of employers cite skills gap as top hiring challenge", "NASSCOM Talent Report"],
    ["47M",   "youth expected to enter the workforce by 2030", "World Bank India"],
    ["<12%",  "STEM graduates have industry-relevant digital skills", "AICTE Data"]
  ];

  problems.forEach(([stat, label, src], i) => {
    const py = 1.42 + i * 0.92;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: py, w: 4.65, h: 0.82, fill: { color: C.CARD }, line: { color: C.DIVIDER, width: 0.5 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: py, w: 0.07, h: 0.82, fill: { color: C.GOLD }, line: { color: C.GOLD } });
    s.addText(stat, { x: 0.62, y: py + 0.08, w: 1.1, h: 0.48, fontSize: 22, bold: true, color: C.DARK, margin: 0 });
    s.addText(label, { x: 1.78, y: py + 0.07, w: 3.05, h: 0.38, fontSize: 10.5, bold: true, color: C.TEXT, margin: 0 });
    s.addText(src, { x: 1.78, y: py + 0.49, w: 3.05, h: 0.25, fontSize: 8.5, color: C.MUTED, italic: true, margin: 0 });
  });

  // Right chart
  s.addShape(pres.shapes.RECTANGLE, { x: 5.38, y: 1.38, w: 4.17, h: 3.72, fill: { color: C.CARD }, line: { color: C.DIVIDER, width: 0.5 }, shadow: makeShadow() });
  s.addText("% Employable Graduates by Stream (India)", {
    x: 5.53, y: 1.52, w: 3.87, h: 0.3, fontSize: 9.5, bold: true, color: C.TEXT, margin: 0
  });
  s.addText("Source: India Skills Report 2023  |  *Indicative", {
    x: 5.53, y: 1.83, w: 3.87, h: 0.22, fontSize: 7.5, color: C.MUTED, italic: true, margin: 0
  });

  s.addChart(pres.charts.BAR, [{
    name: "% Job Ready",
    labels: ["Engineering", "Commerce", "Arts", "Sciences", "Mgmt"],
    values: [52, 38, 27, 42, 61]
  }], {
    x: 5.38, y: 2.1, w: 4.17, h: 2.95,
    barDir: "col",
    chartColors: ["D4A847"],
    chartArea: { fill: { color: "FFFFFF" } },
    catAxisLabelColor: "6B7B8D",
    valAxisLabelColor: "6B7B8D",
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: "1A2A4A",
    showLegend: false,
    valAxisMaxVal: 100
  });

  addLightFooter(s, 5);
}

// ─────────────────────────────────────────────────
//  SLIDE 6 — WHY NXTWAVE
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.LIGHT };
  addSectionHeader(s, "Why NxtWave");

  s.addText("The Only Platform Positioned to Deliver This at Scale", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.4, fontSize: 16, bold: true, color: C.TEXT, margin: 0
  });
  s.addText("NxtWave's industry-aligned curriculum, vernacular delivery, and outcome-driven model makes it uniquely suited to serve India's most diverse youth cohort.", {
    x: 0.45, y: 1.3, w: 9.1, h: 0.38, fontSize: 10.5, color: C.MUTED, margin: 0
  });

  const reasons = [
    ["01", "Outcome-First Curriculum", "Built around real hiring outcomes. Modules close the exact skill gaps flagged by India's top employers — not generic content."],
    ["02", "Vernacular-First Delivery", "Available in 10+ Indian languages — ensuring zero students are excluded regardless of academic background or home state."],
    ["03", "Proven at Scale", "500,000+ learners. 700+ hiring companies. A track record that speaks directly to the transformation this partnership aims to drive."],
    ["04", "Career-Linked Learning", "Every module connects to an employability outcome — internships, certifications, placement support — not just knowledge transfer."],
    ["05", "Student-Centric Design", "Bite-sized, mobile-first, self-paced modules built for the lifestyle of university students, not just working professionals."],
    ["06", "Brand Resonance with Youth", "One of India's most recognised ed-tech brands among 18–25 year-olds — the exact demographic of our cohort."]
  ];

  const colors = [C.GOLD, C.TEAL, C.ORANGE, C.GOLD, C.TEAL, C.ORANGE];

  reasons.forEach(([num, title, body], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const rx = 0.45 + col * 3.15;
    const ry = 1.82 + row * 1.65;
    s.addShape(pres.shapes.RECTANGLE, { x: rx, y: ry, w: 3.0, h: 1.55, fill: { color: C.CARD }, line: { color: C.DIVIDER, width: 0.5 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: rx, y: ry, w: 3.0, h: 0.06, fill: { color: colors[i] }, line: { color: colors[i] } });
    s.addText(num, { x: rx + 0.15, y: ry + 0.12, w: 0.5, h: 0.28, fontSize: 11, bold: true, color: colors[i], margin: 0 });
    s.addText(title, { x: rx + 0.15, y: ry + 0.42, w: 2.7, h: 0.3, fontSize: 11, bold: true, color: C.TEXT, margin: 0 });
    s.addText(body, { x: rx + 0.15, y: ry + 0.76, w: 2.7, h: 0.7, fontSize: 9.5, color: C.MUTED, margin: 0 });
  });

  addLightFooter(s, 6);
}

// ─────────────────────────────────────────────────
//  SLIDE 7 — PROPOSED PARTNERSHIP MODEL
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.DARK };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.GOLD }, line: { color: C.GOLD } });

  s.addText("PROPOSED PARTNERSHIP MODEL", { x: 0.5, y: 0.2, w: 9, h: 0.32, fontSize: 9.5, bold: true, color: C.GOLD, charSpacing: 2.5, margin: 0 });
  s.addText("A Three-Way Value Exchange", { x: 0.5, y: 0.62, w: 9, h: 0.45, fontSize: 20, bold: true, color: C.WHITE, margin: 0 });

  const pillars = [
    {
      org: "AIESEC × JAGRITI", color: C.GOLD,
      items: ["Student mobilisation across 8 cities", "Programme facilitation & logistics", "Branding & marketing platform", "Impact documentation & reporting", "Post-event community engagement"]
    },
    {
      org: "JOINT OUTCOMES", color: C.TEAL, center: true,
      items: ["4,000 employable graduates", "NxtWave brand presence in 8 cities", "20+ documented success stories", "National recognition as skills partner", "Shared data-driven impact report"]
    },
    {
      org: "NXTWAVE", color: C.ORANGE,
      items: ["Curated training content & delivery", "Certification for all participants", "Career readiness modules", "Technical skills exposure sessions", "Internship readiness support"]
    }
  ];

  pillars.forEach((p, i) => {
    const px = 0.42 + i * 3.15;
    s.addShape(pres.shapes.RECTANGLE, { x: px, y: 1.25, w: 3.0, h: 3.9, fill: { color: C.NAVY }, line: { color: "1E3560" } });
    s.addShape(pres.shapes.RECTANGLE, { x: px, y: 1.25, w: 3.0, h: 0.07, fill: { color: p.color }, line: { color: p.color } });
    s.addText(p.org, { x: px + 0.15, y: 1.35, w: 2.7, h: 0.38, fontSize: 11, bold: true, color: p.color, charSpacing: 1, margin: 0 });

    p.items.forEach((item, j) => {
      s.addShape(pres.shapes.RECTANGLE, { x: px + 0.15, y: 1.92 + j * 0.58, w: 0.07, h: 0.07, fill: { color: p.color }, line: { color: p.color } });
      s.addText(item, { x: px + 0.3, y: 1.86 + j * 0.58, w: 2.52, h: 0.48, fontSize: 9.5, color: C.WHITE, margin: 0 });
    });
  });

  // arrows between pillars
  [3.4, 6.55].forEach(ax => {
    s.addShape(pres.shapes.RECTANGLE, { x: ax, y: 3.12, w: 0.18, h: 0.03, fill: { color: C.GOLD_L }, line: { color: C.GOLD_L } });
  });

  addDarkFooter(s, 7);
}

// ─────────────────────────────────────────────────
//  SLIDE 8 — DELIVERABLES FROM NXTWAVE
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.LIGHT };
  addSectionHeader(s, "Deliverables from NxtWave");

  s.addText("What We Are Requesting — No Financial Commitment Required", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.4, fontSize: 16, bold: true, color: C.TEXT, margin: 0
  });
  s.addText("In-kind partnership: curated training, career enablement, and certification across all 4,000 students.", {
    x: 0.45, y: 1.3, w: 9.1, h: 0.3, fontSize: 10.5, color: C.MUTED, italic: true, margin: 0
  });

  const items = [
    ["01", "Training Delivery", "Curated learning experience for all 4,000 students across 8 cities — in-person, hybrid, or digital as mutually agreed."],
    ["02", "Employability Modules", "Future-skills and career readiness curriculum: resume building, interview preparation, professional communication."],
    ["03", "Technical Skill Sessions", "Domain-specific exposure sessions covering full-stack, AI tools, data fundamentals, and digital literacy."],
    ["04", "Internship Readiness", "Structured module equipping students with skills and confidence to pursue and excel in internship opportunities."],
    ["05", "Certification", "NxtWave-branded certificates issued upon completion — adding verifiable credential value to each student's profile."],
    ["06", "Advanced Pathway Access", "[Optional] Preferential or discounted access to NxtWave advanced programmes for interested participants."]
  ];

  items.forEach(([num, title, desc], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const dx = 0.45 + col * 4.77;
    const dy = 1.72 + row * 1.2;
    s.addShape(pres.shapes.RECTANGLE, { x: dx, y: dy, w: 4.57, h: 1.1, fill: { color: C.CARD }, line: { color: C.DIVIDER, width: 0.5 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: dx, y: dy, w: 0.52, h: 1.1, fill: { color: C.DARK }, line: { color: C.DARK } });
    s.addText(num, { x: dx, y: dy + 0.36, w: 0.52, h: 0.38, fontSize: 13, bold: true, color: C.GOLD, align: "center", margin: 0 });
    s.addText(title, { x: dx + 0.62, y: dy + 0.07, w: 3.8, h: 0.3, fontSize: 11, bold: true, color: C.TEXT, margin: 0 });
    s.addText(desc, { x: dx + 0.62, y: dy + 0.42, w: 3.8, h: 0.62, fontSize: 9.5, color: C.MUTED, margin: 0 });
  });

  addLightFooter(s, 8);
}

// ─────────────────────────────────────────────────
//  SLIDE 9 — DELIVERABLES FROM AIESEC × JAGRITI
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.LIGHT };
  addSectionHeader(s, "Deliverables from AIESEC × Jagriti");

  s.addText("What NxtWave Receives in Return", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.4, fontSize: 16, bold: true, color: C.TEXT, margin: 0
  });
  s.addText("A comprehensive visibility, access, and impact package — delivered consistently across all 8 city chapters.", {
    x: 0.45, y: 1.3, w: 9.1, h: 0.3, fontSize: 10.5, color: C.MUTED, italic: true, margin: 0
  });

  const items2 = [
    ["01", "Exclusive Category Partnership", "NxtWave named as sole Employability & Skill Development Partner. No competing ed-tech brand in the programme."],
    ["02", "Reach to 4,000 Students", "Direct, verified access to 4,000 university students actively seeking career growth — across engineering, management, and arts institutions."],
    ["03", "Branding Across 8 Cities", "NxtWave branding on all programme materials, event spaces, digital communications, and social posts across all city chapters."],
    ["04", "8 Speaking Opportunities", "Dedicated speaker slot at each city chapter — direct engagement with students via product demos or career inspiration talks."],
    ["05", "20 Co-Branded Success Stories", "Curated student impact testimonials documented by AIESEC & Jagriti, co-branded and cleared for NxtWave marketing use."],
    ["06", "Data, Leads & Impact Report", "Post-programme lead list of interested students, participant engagement data, and a full co-branded impact report."]
  ];

  items2.forEach(([num, title, desc], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const dx = 0.45 + col * 4.77;
    const dy = 1.72 + row * 1.2;
    s.addShape(pres.shapes.RECTANGLE, { x: dx, y: dy, w: 4.57, h: 1.1, fill: { color: C.CARD }, line: { color: C.DIVIDER, width: 0.5 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: dx, y: dy, w: 0.52, h: 1.1, fill: { color: C.TEAL }, line: { color: C.TEAL } });
    s.addText(num, { x: dx, y: dy + 0.36, w: 0.52, h: 0.38, fontSize: 13, bold: true, color: C.WHITE, align: "center", margin: 0 });
    s.addText(title, { x: dx + 0.62, y: dy + 0.07, w: 3.8, h: 0.3, fontSize: 11, bold: true, color: C.TEXT, margin: 0 });
    s.addText(desc, { x: dx + 0.62, y: dy + 0.42, w: 3.8, h: 0.62, fontSize: 9.5, color: C.MUTED, margin: 0 });
  });

  addLightFooter(s, 9);
}

// ─────────────────────────────────────────────────
//  SLIDE 10 — STUDENT ENGAGEMENT JOURNEY
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.LIGHT };
  addSectionHeader(s, "Student Engagement Journey");

  s.addText("From Discovery to Career Readiness — Five Stages", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.4, fontSize: 16, bold: true, color: C.TEXT, margin: 0
  });

  // Timeline bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.95, w: 8.4, h: 0.06, fill: { color: C.GOLD }, line: { color: C.GOLD } });

  const stages = [
    ["1", "DISCOVER", "Student joins AIESEC × Jagriti city programme. Introduced to NxtWave as the official skills partner."],
    ["2", "ORIENT", "Orientation session on the future of work, in-demand skills, and the NxtWave learning pathway."],
    ["3", "LEARN", "Structured NxtWave training: technical skills, employability tools, career readiness modules."],
    ["4", "CERTIFY", "Student completes assessment. Receives a NxtWave-branded certificate of programme completion."],
    ["5", "CONVERT", "Motivated students are introduced to NxtWave advanced programmes. Warm lead handed over with consent."]
  ];

  stages.forEach(([num, title, desc], i) => {
    const sx = 0.72 + i * 1.77;

    // Circle node on timeline
    s.addShape(pres.shapes.OVAL, { x: sx + 0.5, y: 2.72, w: 0.52, h: 0.52, fill: { color: C.DARK }, line: { color: C.GOLD, width: 2 } });
    s.addText(num, { x: sx + 0.5, y: 2.72, w: 0.52, h: 0.52, fontSize: 14, bold: true, color: C.GOLD, align: "center", valign: "middle", margin: 0 });

    // Stage card below timeline
    s.addShape(pres.shapes.RECTANGLE, { x: sx, y: 3.2, w: 1.65, h: 1.9, fill: { color: C.CARD }, line: { color: C.DIVIDER, width: 0.5 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: sx, y: 3.2, w: 1.65, h: 0.06, fill: { color: C.GOLD }, line: { color: C.GOLD } });
    s.addText(title, { x: sx + 0.1, y: 3.3, w: 1.45, h: 0.28, fontSize: 9, bold: true, color: C.GOLD, charSpacing: 1, margin: 0 });
    s.addText(desc, { x: sx + 0.1, y: 3.65, w: 1.45, h: 1.35, fontSize: 9, color: C.TEXT, margin: 0 });

    // Label above timeline
    s.addText(title, { x: sx, y: 1.55, w: 1.65, h: 0.28, fontSize: 8.5, bold: true, color: C.TEXT, align: "center", charSpacing: 1, margin: 0 });
    // Vertical connector
    s.addShape(pres.shapes.RECTANGLE, { x: sx + 0.76, y: 1.85, w: 0.02, h: 0.86, fill: { color: C.DIVIDER }, line: { color: C.DIVIDER } });
  });

  addLightFooter(s, 10);
}

// ─────────────────────────────────────────────────
//  SLIDE 11 — VISIBILITY & BRAND INTEGRATION
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.DARK };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.GOLD }, line: { color: C.GOLD } });

  s.addText("PARTNERSHIP VISIBILITY & BRAND INTEGRATION", { x: 0.5, y: 0.2, w: 9, h: 0.32, fontSize: 9.5, bold: true, color: C.GOLD, charSpacing: 2, margin: 0 });
  s.addText("Every Touchpoint. Every City. Every Student.", { x: 0.5, y: 0.62, w: 9, h: 0.45, fontSize: 20, bold: true, color: C.WHITE, margin: 0 });

  const visCategories = [
    { cat: "DIGITAL", color: C.GOLD, items: ["Social media across Instagram, LinkedIn, Twitter", "Email campaigns to student communities", "Programme micro-website co-branding", "Digital certificate with NxtWave branding"] },
    { cat: "ON-GROUND", color: C.TEAL, items: ["Event banners & backdrops at all 8 cities", "Roll-up standees at all training sessions", "Welcome kits / student handouts co-branded", "Stage branding at key city events"] },
    { cat: "CONTENT", color: C.ORANGE, items: ["20 co-branded student success stories", "8 post-event city impact social posts", "Co-branded impact report (full NxtWave logo)", "Minimum 5 video testimonials"] },
    { cat: "SPEAKING", color: C.PURPLE, items: ["1 dedicated NxtWave speaker slot per city", "Introduction as Official Skills Partner by host", "Live Q&A / interactive career session", "Optional live demo of the NxtWave platform"] }
  ];

  visCategories.forEach((v, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const vx = 0.5 + col * 4.75;
    const vy = 1.22 + row * 2.05;
    s.addShape(pres.shapes.RECTANGLE, { x: vx, y: vy, w: 4.5, h: 1.88, fill: { color: C.NAVY }, line: { color: "1E3560" } });
    s.addShape(pres.shapes.RECTANGLE, { x: vx, y: vy, w: 4.5, h: 0.07, fill: { color: v.color }, line: { color: v.color } });
    s.addText(v.cat, { x: vx + 0.15, y: vy + 0.1, w: 4.2, h: 0.3, fontSize: 10, bold: true, color: v.color, charSpacing: 2, margin: 0 });
    v.items.forEach((item, j) => {
      s.addShape(pres.shapes.RECTANGLE, { x: vx + 0.15, y: vy + 0.55 + j * 0.31, w: 0.06, h: 0.06, fill: { color: v.color }, line: { color: v.color } });
      s.addText(item, { x: vx + 0.28, y: vy + 0.49 + j * 0.31, w: 4.07, h: 0.28, fontSize: 9.5, color: C.WHITE, margin: 0 });
    });
  });

  addDarkFooter(s, 11);
}

// ─────────────────────────────────────────────────
//  SLIDE 12 — EXPECTED OUTCOMES & KPIs
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.LIGHT };
  addSectionHeader(s, "Expected Outcomes & KPIs");

  s.addText("Measuring Impact. Proving Value. Building a Scalable Model.", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.4, fontSize: 16, bold: true, color: C.TEXT, margin: 0
  });

  // Top stat strip
  const kpiStats = [["4,000", "Students Trained"], ["8", "City Chapters"], ["20+", "Success Stories"], ["≥80%", "Completion Rate Target"]];
  kpiStats.forEach(([val, label], i) => {
    const kx = 0.45 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, { x: kx, y: 1.32, w: 2.12, h: 1.05, fill: { color: C.DARK }, line: { color: C.DARK }, shadow: makeShadow() });
    s.addText(val, { x: kx + 0.1, y: 1.38, w: 1.92, h: 0.52, fontSize: 26, bold: true, color: C.GOLD, align: "center", margin: 0 });
    s.addText(label, { x: kx + 0.1, y: 1.9, w: 1.92, h: 0.35, fontSize: 9, color: C.WHITE, align: "center", margin: 0 });
  });

  // KPI table
  const rows = [
    [{ text: "KPI METRIC", options: { bold: true, color: "FFFFFF", fill: { color: C.DARK } } },
     { text: "TARGET", options: { bold: true, color: "FFFFFF", fill: { color: C.DARK } } },
     { text: "MEASUREMENT METHOD", options: { bold: true, color: "FFFFFF", fill: { color: C.DARK } } }],
    ["Student Attendance per City", "≥ 85%", "AIESEC chapter attendance records"],
    ["Module Completion Rate", "≥ 80% of registered students", "NxtWave platform analytics"],
    ["Assessment Pass Rate", "≥ 75%", "NxtWave certification system"],
    ["Student Satisfaction / NPS", "≥ 8.0 / 10", "Post-event digital survey"],
    ["Warm Leads for NxtWave", "≥ 500 consented leads", "Consent-based data collection form"],
    ["Social Media Reach", "≥ 100,000 impressions", "Combined platform analytics"],
    ["Success Stories Documented", "20 co-branded stories", "AIESEC & Jagriti content team"]
  ];

  s.addTable(rows, {
    x: 0.45, y: 2.5, w: 9.1, h: 2.6,
    border: { pt: 0.5, color: C.DIVIDER },
    fontSize: 9.5,
    color: C.TEXT,
    align: "left",
    valign: "middle",
    rowH: 0.33
  });

  addLightFooter(s, 12);
}

// ─────────────────────────────────────────────────
//  SLIDE 13 — TIMELINE
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.LIGHT };
  addSectionHeader(s, "Partnership Timeline");

  s.addText("From Alignment to Impact — A Four-Phase Rollout", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.4, fontSize: 16, bold: true, color: C.TEXT, margin: 0
  });

  // Central timeline line
  s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: 2.55, w: 9.1, h: 0.05, fill: { color: C.DIVIDER }, line: { color: C.DIVIDER } });

  const phases = [
    { ph: "PHASE 1", label: "Agreement & Setup", dur: "Month 1", color: C.GOLD, tasks: ["MOU Signing", "Curriculum Alignment", "Brand Exchange", "Logistics Planning"] },
    { ph: "PHASE 2", label: "Pre-Programme", dur: "Month 2", color: C.TEAL, tasks: ["City Onboarding", "Student Registration", "Platform Access Setup", "Speaker Scheduling"] },
    { ph: "PHASE 3", label: "Programme Delivery", dur: "Month 3–4", color: C.ORANGE, tasks: ["8 City Events", "Training Delivery", "Technical Sessions", "Certification"] },
    { ph: "PHASE 4", label: "Post-Programme", dur: "Month 5", color: C.PURPLE, tasks: ["Impact Data", "Lead Handover", "Success Stories", "Co-Branded Report"] }
  ];

  phases.forEach((p, i) => {
    const px = 0.45 + i * 2.35;

    // Dot on timeline
    s.addShape(pres.shapes.OVAL, { x: px + 0.87, y: 2.38, w: 0.34, h: 0.34, fill: { color: p.color }, line: { color: p.color } });

    // Card above
    s.addShape(pres.shapes.RECTANGLE, { x: px, y: 1.32, w: 2.22, h: 1.12, fill: { color: C.DARK }, line: { color: "1E3560" } });
    s.addText(p.ph, { x: px + 0.12, y: 1.4, w: 2.0, h: 0.25, fontSize: 9, bold: true, color: p.color, charSpacing: 1, margin: 0 });
    s.addText(p.label, { x: px + 0.12, y: 1.67, w: 2.0, h: 0.3, fontSize: 11, bold: true, color: C.WHITE, margin: 0 });
    s.addText(p.dur, { x: px + 0.12, y: 1.97, w: 2.0, h: 0.25, fontSize: 9.5, color: p.color, margin: 0 });

    // Connector
    s.addShape(pres.shapes.RECTANGLE, { x: px + 1.03, y: 2.44, w: 0.02, h: 0.11, fill: { color: p.color }, line: { color: p.color } });

    // Tasks card below
    s.addShape(pres.shapes.RECTANGLE, { x: px, y: 2.75, w: 2.22, h: 2.32, fill: { color: C.CARD }, line: { color: C.DIVIDER, width: 0.5 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: px, y: 2.75, w: 2.22, h: 0.06, fill: { color: p.color }, line: { color: p.color } });
    p.tasks.forEach((t, j) => {
      s.addShape(pres.shapes.RECTANGLE, { x: px + 0.15, y: 2.95 + j * 0.5, w: 0.07, h: 0.07, fill: { color: p.color }, line: { color: p.color } });
      s.addText(t, { x: px + 0.28, y: 2.9 + j * 0.5, w: 1.8, h: 0.42, fontSize: 9.5, color: C.TEXT, margin: 0 });
    });
  });

  addLightFooter(s, 13);
}

// ─────────────────────────────────────────────────
//  SLIDE 14 — GOVERNANCE STRUCTURE
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.LIGHT };
  addSectionHeader(s, "Governance Structure");

  s.addText("Clear Ownership. Shared Accountability. Zero Ambiguity.", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.4, fontSize: 16, bold: true, color: C.TEXT, margin: 0
  });

  // Top: Joint Steering Committee
  s.addShape(pres.shapes.RECTANGLE, { x: 3.1, y: 1.42, w: 3.8, h: 0.8, fill: { color: C.DARK }, line: { color: C.DARK }, shadow: makeShadow() });
  s.addText("JOINT STEERING COMMITTEE", { x: 3.1, y: 1.52, w: 3.8, h: 0.3, fontSize: 10, bold: true, color: C.GOLD, align: "center", charSpacing: 1, margin: 0 });
  s.addText("AIESEC National  ·  Jagriti Leadership  ·  NxtWave BD Head", { x: 3.1, y: 1.82, w: 3.8, h: 0.28, fontSize: 8.5, color: C.WHITE, align: "center", margin: 0 });

  // Connector
  s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 2.22, w: 0.02, h: 0.38, fill: { color: C.GOLD }, line: { color: C.GOLD } });
  // Horizontal bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.95, y: 2.6, w: 8.1, h: 0.04, fill: { color: C.DIVIDER }, line: { color: C.DIVIDER } });

  const leads = [
    { title: "Programme Lead", org: "AIESEC in India", color: C.GOLD, x: 0.45,
      resp: ["City chapter coordination", "Student mobilisation", "Logistics & scheduling", "Attendance tracking"] },
    { title: "Experience Lead", org: "Jagriti Yatra", color: C.TEAL, x: 3.65,
      resp: ["Narrative & storytelling", "Success story capture", "Brand ambassadors", "Post-event documentation"] },
    { title: "Content Lead", org: "NxtWave", color: C.ORANGE, x: 6.85,
      resp: ["Curriculum delivery", "Platform access", "Certification issuance", "Lead qualification"] }
  ];

  leads.forEach((l) => {
    // Dot on bar
    s.addShape(pres.shapes.OVAL, { x: l.x + 1.25, y: 2.47, w: 0.28, h: 0.28, fill: { color: l.color }, line: { color: l.color } });
    // Lead card
    s.addShape(pres.shapes.RECTANGLE, { x: l.x, y: 2.75, w: 2.7, h: 2.32, fill: { color: C.CARD }, line: { color: C.DIVIDER, width: 0.5 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: l.x, y: 2.75, w: 2.7, h: 0.07, fill: { color: l.color }, line: { color: l.color } });
    s.addText(l.title, { x: l.x + 0.15, y: 2.88, w: 2.4, h: 0.3, fontSize: 11, bold: true, color: C.TEXT, margin: 0 });
    s.addText(l.org, { x: l.x + 0.15, y: 3.2, w: 2.4, h: 0.25, fontSize: 9, color: l.color, italic: true, margin: 0 });
    l.resp.forEach((r, j) => {
      s.addShape(pres.shapes.RECTANGLE, { x: l.x + 0.15, y: 3.55 + j * 0.35, w: 0.07, h: 0.07, fill: { color: l.color }, line: { color: l.color } });
      s.addText(r, { x: l.x + 0.28, y: 3.5 + j * 0.35, w: 2.3, h: 0.3, fontSize: 9.5, color: C.TEXT, margin: 0 });
    });
  });

  addLightFooter(s, 14);
}

// ─────────────────────────────────────────────────
//  SLIDE 15 — SUCCESS MEASUREMENT
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.LIGHT };
  addSectionHeader(s, "Success Measurement Framework");

  s.addText("How We Define, Track, and Report Success Together", {
    x: 0.45, y: 0.85, w: 9.1, h: 0.4, fontSize: 16, bold: true, color: C.TEXT, margin: 0
  });

  const pillars2 = [
    { title: "Quantitative Metrics", color: C.GOLD, items: ["Students trained per city", "Module completion & certification rates", "Assessment scores and pass rates", "Lead volume for NxtWave pipeline"] },
    { title: "Qualitative Metrics", color: C.TEAL, items: ["Student satisfaction & NPS", "Quality of co-branded success stories", "NxtWave brand recall post-programme", "Employer perception (optional survey)"] },
    { title: "Conversion Metrics", color: C.ORANGE, items: ["Students enrolled in advanced NxtWave plans", "Internships / placements linked to training", "Social media reach & engagement", "Media coverage / press mentions"] }
  ];

  pillars2.forEach((p2, i) => {
    const p2y = 1.38 + i * 1.3;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: p2y, w: 5.1, h: 1.2, fill: { color: C.CARD }, line: { color: C.DIVIDER, width: 0.5 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.45, y: p2y, w: 0.07, h: 1.2, fill: { color: p2.color }, line: { color: p2.color } });
    s.addText(p2.title, { x: 0.65, y: p2y + 0.08, w: 4.75, h: 0.3, fontSize: 11, bold: true, color: C.TEXT, margin: 0 });
    p2.items.forEach((item, j) => {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.65, y: p2y + 0.48 + j * 0.19, w: 0.06, h: 0.06, fill: { color: p2.color }, line: { color: p2.color } });
      s.addText(item, { x: 0.78, y: p2y + 0.44 + j * 0.19, w: 4.62, h: 0.2, fontSize: 9.5, color: C.MUTED, margin: 0 });
    });
  });

  // Right: Reporting Cadence
  s.addShape(pres.shapes.RECTANGLE, { x: 5.78, y: 1.38, w: 3.77, h: 3.72, fill: { color: C.DARK }, line: { color: C.DARK }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.78, y: 1.38, w: 3.77, h: 0.07, fill: { color: C.GOLD }, line: { color: C.GOLD } });
  s.addText("REPORTING CADENCE", { x: 5.95, y: 1.5, w: 3.42, h: 0.3, fontSize: 10, bold: true, color: C.GOLD, charSpacing: 2, margin: 0 });

  const cadence = [
    ["Weekly", "City chapter progress via shared dashboard"],
    ["Post-City", "Individual city impact report after each event"],
    ["Mid-Point", "Consolidated review at the 4-city mark"],
    ["Final", "Full impact report: data, stories, leads, media"]
  ];

  cadence.forEach(([freq, detail], i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.95, y: 1.98 + i * 0.82, w: 0.95, h: 0.3, fill: { color: C.GOLD }, line: { color: C.GOLD } });
    s.addText(freq, { x: 5.95, y: 1.98 + i * 0.82, w: 0.95, h: 0.3, fontSize: 8.5, bold: true, color: C.DARK, align: "center", valign: "middle", margin: 0 });
    s.addText(detail, { x: 7.0, y: 1.98 + i * 0.82, w: 2.38, h: 0.55, fontSize: 9.5, color: C.WHITE, margin: 0 });
  });

  addLightFooter(s, 15);
}

// ─────────────────────────────────────────────────
//  SLIDE 16 — CALL TO ACTION
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.DARK };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.GOLD }, line: { color: C.GOLD } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.GOLD }, line: { color: C.GOLD } });

  s.addText("THE NEXT STEP", { x: 0.5, y: 0.25, w: 9, h: 0.32, fontSize: 9.5, bold: true, color: C.GOLD, charSpacing: 3, align: "center", margin: 0 });
  s.addText("Let's Build This Together.", { x: 0.5, y: 0.72, w: 9, h: 0.72, fontSize: 34, bold: true, color: C.WHITE, align: "center", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 1.6, w: 3.0, h: 0.05, fill: { color: C.GOLD }, line: { color: C.GOLD } });
  s.addText(
    "We invite NxtWave leadership to a 30-minute discovery call to explore how this partnership can be structured for maximum mutual impact. A formal MOU can be ready within two weeks of alignment.",
    { x: 1.0, y: 1.75, w: 8.0, h: 0.65, fontSize: 11.5, color: C.GOLD_L, align: "center", margin: 0 }
  );

  // 3 steps
  const steps = [
    ["01", "Schedule a 30-min discovery call"],
    ["02", "Align on programme structure & MOU"],
    ["03", "Launch planning & kick off delivery"]
  ];
  steps.forEach(([num, action], i) => {
    const ax = 1.4 + i * 2.62;
    s.addShape(pres.shapes.RECTANGLE, { x: ax, y: 2.62, w: 2.32, h: 1.22, fill: { color: C.NAVY }, line: { color: "1E3560" } });
    s.addShape(pres.shapes.RECTANGLE, { x: ax, y: 2.62, w: 2.32, h: 0.06, fill: { color: C.GOLD }, line: { color: C.GOLD } });
    s.addText(num, { x: ax + 0.15, y: 2.72, w: 0.45, h: 0.36, fontSize: 18, bold: true, color: C.GOLD, margin: 0 });
    s.addText(action, { x: ax + 0.15, y: 3.12, w: 2.0, h: 0.65, fontSize: 10.5, color: C.WHITE, margin: 0 });
  });

  s.addText("CONTACT US", { x: 0.5, y: 4.1, w: 9, h: 0.28, fontSize: 9, bold: true, color: C.GOLD, charSpacing: 3, align: "center", margin: 0 });
  s.addText("[Name, Designation]  —  AIESEC in India", { x: 0.5, y: 4.42, w: 9, h: 0.28, fontSize: 11, color: C.WHITE, align: "center", margin: 0 });
  s.addText("[email@aiesec.in]   |   [+91 XXXXX XXXXX]   |   www.aiesec.in", { x: 0.5, y: 4.73, w: 9, h: 0.28, fontSize: 10.5, color: C.MUTED, align: "center", margin: 0 });

  addDarkFooter(s, 16);
}

// ─────────────────────────────────────────────────
//  SLIDE 17 — CLOSING PAGE
// ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.DARK };

  // Left panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.14, h: 5.625, fill: { color: C.GOLD }, line: { color: C.GOLD } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.14, y: 0, w: 4.0, h: 5.625, fill: { color: C.NAVY }, line: { color: C.NAVY } });

  s.addText("AIESEC\nIN INDIA", { x: 0.38, y: 0.55, w: 3.6, h: 0.85, fontSize: 22, bold: true, color: C.WHITE, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.38, y: 1.48, w: 3.2, h: 0.04, fill: { color: C.GOLD_L }, line: { color: C.GOLD_L } });
  s.addText("IN COLLABORATION WITH\nJAGRITI YATRA", { x: 0.38, y: 1.58, w: 3.6, h: 0.62, fontSize: 11, color: C.GOLD_L, margin: 0 });

  s.addText("CONTACT", { x: 0.38, y: 2.52, w: 3.6, h: 0.28, fontSize: 9, bold: true, color: C.GOLD, charSpacing: 2, margin: 0 });
  [
    "[Name], National President — AIESEC in India",
    "[email@aiesec.in]",
    "[+91 XXXXX XXXXX]",
    "www.aiesec.in"
  ].forEach((c, i) => {
    s.addText(c, { x: 0.38, y: 2.88 + i * 0.35, w: 3.6, h: 0.32, fontSize: 10, color: C.WHITE, margin: 0 });
  });

  // Right content
  s.addText("Thank You.", { x: 4.4, y: 1.1, w: 5.3, h: 1.0, fontSize: 44, bold: true, color: C.WHITE, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.4, y: 2.25, w: 2.5, h: 0.06, fill: { color: C.GOLD }, line: { color: C.GOLD } });
  s.addText(
    "Together, we can equip 4,000 young Indians with the skills, confidence, and clarity to thrive in the careers of tomorrow.",
    { x: 4.4, y: 2.45, w: 5.2, h: 0.85, fontSize: 13, color: C.GOLD_L, italic: true, margin: 0 }
  );
  s.addText("Strategic Partnership Proposal  ·  June 2026  ·  Confidential", {
    x: 4.4, y: 4.65, w: 5.2, h: 0.35, fontSize: 9, color: C.MUTED, margin: 0
  });
}

// ─────────────────────────────────────────────────
//  WRITE FILE
// ─────────────────────────────────────────────────
pres.writeFile({ fileName: "NxtWave_Partnership_Proposal_AIESEC_Jagriti.pptx" })
  .then(() => console.log("SUCCESS: NxtWave_Partnership_Proposal_AIESEC_Jagriti.pptx"))
  .catch(err => { console.error(err); process.exit(1); });
