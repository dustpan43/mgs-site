# MGS Communications — AI Image Prompts (2026 Design Upgrade)
### Ready-to-run set for Grok (Imagine) & Google Gemini (Imagen / "Nano Banana")

This is the **primary, current** prompt set, written to fill every real photo gap on the site as part of the design upgrade. It supersedes the shorter March set in [`ai-image-prompts.md`](./ai-image-prompts.md) (which still has useful creative-spin + article-diagram ideas worth keeping).

---

## HOW TO USE (read once)

1. **Pick a prompt** from the set below.
2. **Paste the HOUSE STYLE block first**, then paste the prompt beneath it. (The house style is what makes all 25 images feel like one cohesive shoot.)
3. **For the 5 logo scenes** tagged `[LOGO: feed as reference]` — attach the MGS logo file in the same generation and use the instruction included in that prompt. For everything else, generate as-is (logo-free) or leave the blank surface noted (`[LOGO-READY]`) to drop the real logo on later.
4. **Generate big, then downscale** to the target dimensions (small logos/text garble first).

> **Brand facts to keep accurate** — MGS Communications, family-owned, Albuquerque NM, est. 1996 by Missy Martinez. 3505 Carlisle Blvd NE, ABQ NM 87110 · (505) 888-2034. Authorized Kenwood & Motorola dealer + security systems. **Real logo = glossy yellow `#FFD700` rounded-rectangle badge, green `#009E49` block "M·G·S" letters, black "Communications, Inc." beneath.**

---

## HOUSE STYLE — paste this ABOVE every prompt

```
MGS HOUSE STYLE: Photorealistic editorial commercial photography for a family-owned
Albuquerque, New Mexico communications + security company (established 1996). Warm,
trustworthy, real working tone — NOT sterile corporate stock, NOT glossy luxury.
New Mexico high-desert locale: clean blue skies, tan stucco / adobe-style architecture,
warm sandy daylight, Sandia Mountains on the horizon where an exterior is visible.
Natural, slightly warm color grade with subtle brand-harmonized accents of green
(#009E49) and warm yellow (#FFD700). True-to-life skin tones, realistic textures and
materials, believable working props, natural imperfections. Diverse, authentic-looking
New Mexico working people (mix of ages and ethnicities). 35mm full-frame look, true
depth of field, no HDR halos, no oversaturation, no AI sheen; shot on a professional
DSLR/mirrorless camera.
Avoid: warped or gibberish text, extra fingers or limbs, plastic/waxy skin, garbled
logos, cartoon oversaturation, floating or duplicated objects, fake lens flare.
```

**Hero note (for any 16:9 hero image):** build the visual interest in the **right 55–60%** of the frame and keep the **left third simpler and a little darker** — the website lays a heavy deep-green gradient with white headline text over the left side. Do **not** add your own dark overlay or any text; shoot a touch brighter/higher-contrast so the image survives being tinted deep green.

---

## LOGO HANDLING

| Tag | Meaning | Scenes |
|-----|---------|--------|
| `[LOGO: feed as reference]` | Attach the logo file; scene has a large, flat, head-on surface for it | #1, #11, #19, #20, #24 |
| `[LOGO-READY]` | Leave the noted surface blank so the real logo can be composited later | #3, #15, #18, #22, #25 |
| `[LOGO-FREE]` | No branding — a logo would be tiny/angled/garbled | all others |

**White logo variant (make this once):** the site only ships `images/mgs-logo.png` (full color). For dark surfaces/overlays you'll want a white version. Open `MGS-Hub\docs\brand\MGS Logo No Background.svg` in Inkscape (free) or Illustrator → select all → set fill to `#FFFFFF` → export `images/mgs-logo-white.svg` + a 2× PNG (~600px tall). On light surfaces (white van door, light polo, sunny sign) feed the **color** logo; reserve the white one for dark-surface composites. (CSS stopgap for the footer only: `filter: brightness(0) invert(1)`.)

---

## GROK vs GEMINI — which tool for which shot

- **People / action (#1–4, 10, 15–20, 24):** **Gemini** usually wins on believable diverse faces, natural hands, and editorial light. Grok is a strong second pass and is often more permissive with "worker holding a device."
- **Hardware / clean-surface / on-screen UI (#5–9, 12–14, 21–23, 25):** either; **Gemini** holds device geometry and screen UI cleaner (fewer melted buttons / less gibberish). Use Grok for a grittier, more photographic feel on bench/monitoring shots.
- **Logo-reference scenes (#1, 11, 19, 20, 24):** **Gemini** maps an attached reference onto a flat plane more reliably. Attach the logo and add: *"Use the attached MGS logo as a flat, undistorted decal, head-on; do not alter its colors or text."* If it still warps, generate the `[LOGO-READY]` blank version instead and composite the real PNG in post (zero-garble guarantee).

---

## IMAGE PLAN — what to generate & where it lands

Heroes **1920×1080 (16:9)** · cards **800×600 (4:3)** · content **1200×800 (3:2)**. New folders: `images/people/`, `images/security/`, `images/fleet/`, `images/team/`.

| # | Save as | Lands on | Dims | Pri | Logo |
|---|---------|----------|------|-----|------|
| 1 | `hero/homepage-connected-protected.jpg` | Homepage hero (replaces reused radio-lineup) | 16:9 | P1 | ref |
| 2 | `hero/technician-repair-bench.jpg` | Service & Repair hero | 16:9 | P1 | free |
| 3 | `hero/radio-in-use-jobsite.jpg` | Two-Way Radios hero | 16:9 | P1 | ready |
| 4 | `people/technician-radio-repair-hands.jpg` | Service & Repair body + homepage "Service & Repairs" card | 3:2 | P1 | free |
| 5 | `security/camera-on-stucco-building.jpg` | Homepage "Security Systems" card + camera-placement article | 4:3 | P1 | free |
| 6 | `hero/security-systems-cameras.jpg` | Security Systems index hero | 16:9 | P2 | free |
| 7 | `hero/video-surveillance-control-room.jpg` | Video Surveillance hero | 16:9 | P2 | free |
| 8 | `hero/access-control-keypad.jpg` | Access Control hero | 16:9 | P2 | free |
| 9 | `hero/fire-burglar-alarm-panel.jpg` | Fire & Burglar Alarms hero | 16:9 | P2 | free |
| 10 | `hero/monitoring-247-center.jpg` | 24/7 Monitoring hero | 16:9 | P2 | free |
| 11 | `hero/commercial-security-storefront.jpg` | Commercial Security hero | 16:9 | P2 | ref |
| 12 | `security/access-control-reader-detail.jpg` | Security index card + CCTV-vs-IP inline | 4:3 | P2 | free |
| 13 | `security/alarm-control-panel-wall.jpg` | Security index card + fire-alarms inline | 4:3 | P2 | free |
| 14 | `security/ip-dome-camera-closeup.jpg` | CCTV vs IP article hero | 16:9 | P2 | free |
| 15 | `people/construction-crew-radios-jobsite.jpg` | Radios industries + rental guide | 3:2 | P3 | ready |
| 16 | `people/hospitality-staff-radio-earpiece.jpg` | Radios industries + choosing-radios | 3:2 | P3 | free |
| 17 | `people/warehouse-worker-radio.jpg` | Radios industries / logistics | 3:2 | P3 | free |
| 18 | `people/event-security-staff-radio.jpg` | Events + rental guide | 3:2 | P3 | ready |
| 19 | `team/mgs-team-showroom.jpg` | About Us "Our Team" + Why Us | 3:2 | P3 | ref |
| 20 | `fleet/service-van-exterior.jpg` | Service Areas / fleet / Contact | 3:2 | P3 | ref |
| 21 | `fleet/mobile-radio-dash-install.jpg` | Two-Way Radios mobile section | 3:2 | P3 | free |
| 22 | `hero/secure-payment-invoice.jpg` | Pay page hero (currently gradient only) | 16:9 | P4 | ready |
| 23 | `hero/resources-knowledge-hub.jpg` | Resources hub hero | 16:9 | P4 | free |
| 24 | `people/showroom-customer-consult.jpg` | Why Us / About Us proof | 3:2 | P4 | ref |
| 25 | `fleet/rental-fleet-charging-bank.jpg` | Rental guide / Events proof | 3:2 | P4 | ready |

---

# THE PROMPTS

> Each block below is paste-ready. Remember: **House Style first, then the block.**

## P1 — Homepage + highest-impact

### #1 · `hero/homepage-connected-protected.jpg` · 1920×1080 (16:9) · [LOGO: feed as reference]
```
A friendly MGS field technician in a dark-green embroidered polo shirt stands
confidently beside the open side door of a clean white service van, holding a black
Kenwood handheld two-way radio, mid-conversation with a genuine slight smile. Setting:
the MGS storefront parking lot in Albuquerque — tan stucco building, clean blue sky,
Sandia Mountains on the horizon, warm golden morning light with soft shadows. Wide
environmental portrait; the technician and van sit in the RIGHT 55% of the frame with
open sky and lot filling the left third; focal point on the technician's face and the
radio; rule-of-thirds. Shot wide on a 35mm lens at f/4 with deep-enough focus to keep
the van and mountains legible. Palette: deep-green polo and van accent, warm tan
building, blue sky, a subtle yellow lanyard accent.
LOGO: place the attached MGS logo as a clean, flat, head-on decal on the van's large
side-door panel (parallel to camera, unobstructed) and a small embroidered version on
the polo's left chest; keep both surfaces simple and front-facing. Real mark = glossy
yellow (#FFD700) rounded-rectangle badge with green (#009E49) block "M·G·S" letters and
black "Communications, Inc." beneath.
Avoid: warped logo or text, extra fingers, plastic skin, oversaturation, clutter on the door.
Output 1920×1080, 16:9.
```

### #2 · `hero/technician-repair-bench.jpg` · 1920×1080 (16:9) · [LOGO-FREE]
```
A focused repair technician (dark-green work shirt, rolled-up sleeves) bends over a
two-way radio opened on an anti-static mat, probing the circuit board with a digital
multimeter, a soldering iron resting in its stand. Setting: a real, lived-in electronics
repair workshop — pegboard of tools, labeled parts bins, a coiled antenna, an adjustable
desk lamp; warm and organized, not a sterile lab. Wide shot; the technician and bench
occupy the RIGHT 60% with the tool wall behind, the left side falling into softer shop
shadow. Focal point on the hands and the radio internals. 35mm lens at f/2.8, bench
tack-sharp, background gently soft. Lighting: warm tungsten workshop light from the lamp
plus soft ambient fill, with pools of warm light. Palette: warm amber workshop tones,
the green work shirt tying to the brand.
Avoid: warped tool-label text, extra fingers, melted-looking components, plastic skin, oversaturation.
Output 1920×1080, 16:9.
```

### #3 · `hero/radio-in-use-jobsite.jpg` · 1920×1080 (16:9) · [LOGO-READY]
```
A worker's hand and forearm grip a rugged black handheld two-way radio, thumb on the
push-to-talk button, raised toward the mouth mid-transmission; the worker wears a
high-visibility safety vest. Setting: an active New Mexico jobsite/yard under a big blue
sky — steel framing or stacked materials softly blurred behind, bright desert light.
Tight-to-medium action shot; the radio and hand are RIGHT-of-center, the vest shoulder
anchors the right edge, open blurred sky-and-site fills the left for headline text.
Focal point on the radio and the PTT thumb. 50mm lens at f/2.5, shallow depth of field,
fast-shutter crispness on the hand. Lighting: bright midday desert sun, warm, with a
clean highlight on the radio body. Palette: hi-vis yellow-green vest naturally echoing
the brand, blue sky.
LOGO-READY: keep the radio's small front label area plain/blank and the vest unbranded
so a real MGS sticker/logo can be composited later.
Avoid: warped radio text, extra fingers, plastic skin, duplicated buttons, oversaturation.
Output 1920×1080, 16:9.
```

### #4 · `people/technician-radio-repair-hands.jpg` · 1200×800 (3:2) · [LOGO-FREE]
```
Extreme close-up, slightly overhead, of skilled hands using a precision screwdriver to
reseat a tiny board inside a disassembled handheld two-way radio; the battery, back
housing, and a small screw tray sit beside it. Setting: the same warm repair bench
(anti-static mat, soft tool clutter), shallow context. Top-down three-quarter macro;
hands and radio fill the frame in a diagonal flow of tools; focal point where the
screwdriver tip meets the board. 60mm macro lens at f/4, crisp center, soft edges.
Lighting: warm directional desk-lamp light with gentle fill and small specular glints on
metal. Palette: warm amber bench, optional green anti-static mat to nod to the brand.
Avoid: warped tiny board text, extra fingers, impossibly clean/plastic parts, oversaturation.
Output 1200×800, 3:2.
```

### #5 · `security/camera-on-stucco-building.jpg` · 800×600 (4:3) · [LOGO-FREE]
```
A white commercial dome/turret security camera cleanly mounted under the eave of a
tan-stucco southwestern building, lens angled down over an entrance. Setting: the
exterior corner of an Albuquerque commercial building, blue sky with a few clouds, warm
desert light. Shot from slightly below looking up; the camera is the sharp focal point
in the upper-right, with stucco wall and eave shadow filling the frame and clean sky
negative space. 50mm lens at f/5.6, camera tack-sharp, background crisp. Lighting: bright
natural New Mexico sunshine with clean shadows under the eave. Palette: tan and blue with
a crisp white camera. Keep the subject center-safe (this crops to a short card).
Avoid: warped camera-brand text, duplicated cameras, plastic look, oversaturated sky.
Output 800×600, 4:3.
```

## P2 — Security suite

### #6 · `hero/security-systems-cameras.jpg` · 1920×1080 (16:9) · [LOGO-FREE]
```
Two modern security cameras (a dome and a bullet) mounted on the corner of a tan-stucco
commercial building, surveying a clean parking area — conveying whole-property
protection. Setting: an Albuquerque commercial exterior, blue sky, Sandias faint on the
horizon, warm late-morning light. Wide shot; the cameras and building corner anchored
RIGHT, parking and sky opening LEFT for headline text; focal point on the foreground
camera with a gentle downward sightline. Wide 24–28mm architectural lens at f/8, deep
focus, minimal distortion. Lighting: clean late-morning sun, even, slightly bright to
survive a deep-green overlay. Palette: tan + blue + crisp white hardware, a subtle green
landscaping accent.
Avoid: warped camera-brand text, duplicated/floating cameras, fisheye distortion, oversaturation.
Output 1920×1080, 16:9.
```

### #7 · `hero/video-surveillance-control-room.jpg` · 1920×1080 (16:9) · [LOGO-FREE]
```
A tidy monitoring desk with two large displays showing a clean grid of live CCTV feeds
(parking lot, entrance, hallway, loading dock); keyboard and mouse on a clean desk; no
people. Setting: a small professional back-office monitoring nook, low ambient light, the
monitors providing the glow. Slight angle; the monitor wall anchored RIGHT, the darker
room falling LEFT for text; focal point on the crisp feed grid. 35mm lens at f/4, screens
sharp and legible, room softly soft. Lighting: cool monitor glow balanced by one warm low
ambient lamp — moody but accessible, not a sci-fi war room. Believable generic
camera-grid UI with NO readable brand text. Palette: cool screen blues with one warm
lamp; subtle green status dots.
Avoid: gibberish on-screen text, warped UI, duplicated monitors, plastic sheen, oversaturation.
Output 1920×1080, 16:9.
```

### #8 · `hero/access-control-keypad.jpg` · 1920×1080 (16:9) · [LOGO-FREE]
```
A sleek black access-control keypad and card reader mounted on a tan-stucco wall beside a
commercial glass door; a hand just presenting a key fob, the green "access granted" LED
lit. Setting: an Albuquerque commercial entrance, bright interior visible through the
glass, warm exterior daylight. The reader and door anchored RIGHT, wall and sky opening
LEFT for text; shallow focus pulling the reader razor-sharp; focal point on the LED and
fob. 50mm lens at f/2.8, shallow depth of field, sharp reader, soft background. Lighting:
mixed warm daylight and cool interior spill, clean, no harsh glass glare. Keep the reader
face simple with no readable brand. Palette: black hardware + green "granted" LED tying to
the brand, tan wall.
Avoid: warped keypad numerals, extra fingers, duplicated readers, plastic skin, oversaturation.
Output 1920×1080, 16:9.
```

### #9 · `hero/fire-burglar-alarm-panel.jpg` · 1920×1080 (16:9) · [LOGO-FREE]
```
A modern wall-mounted alarm touchscreen showing a clean "Armed — Away" status with a green
checkmark; a small white smoke/heat detector visible on the ceiling above in soft focus.
Setting: a clean residential/commercial interior hallway, neutral wall, warm home-like
light. The panel anchored RIGHT at eye level, the hallway receding LEFT for text; focal
point on the bright, readable screen with subtle leading lines. 35mm lens at f/4, panel
sharp, hallway gently soft. Lighting: soft even interior light, the screen self-lit and
legible. Minimal clean UI text ("Armed — Away") only. Palette: white panel + green status
accent, warm neutral walls.
Avoid: gibberish UI text, warped checkmark, duplicated panels, oversaturation, plastic look.
Output 1920×1080, 16:9.
```

### #10 · `hero/monitoring-247-center.jpg` · 1920×1080 (16:9) · [LOGO-FREE]
```
A friendly monitoring operator (headset, dark polo) at a clean desk viewing a status
dashboard with green "all secure" indicators and a small live-feed strip; calm,
professional, reassuring — not a dramatic war room. Setting: a small, warm, professional
monitoring office at night, soft lamp and screen glow. The operator and screens anchored
RIGHT (operator at the right edge in three-quarter view), the desk opening LEFT for text;
focal point on the operator's attentive face. 35mm lens at f/2.8, operator sharp, screens
legible-but-soft. Lighting: cozy mixed warm lamp and cool screen glow; trustworthy and
human. Generic on-screen UI, unbranded polo. Palette: warm/cool balance with green
"secure" status accents.
Avoid: gibberish screen text, extra fingers, plastic skin, duplicated monitors, oversaturation.
Output 1920×1080, 16:9.
```

### #11 · `hero/commercial-security-storefront.jpg` · 1920×1080 (16:9) · [LOGO: feed as reference]
```
A clean Albuquerque commercial storefront at dusk, exterior cameras visible at the
corners, warm interior glow through the glass signaling "open and protected"; an MGS
service van parked at the curb. Setting: a small commercial block, tan stucco + storefront
glass, deep-blue dusk sky, Sandias in silhouette. Wide shot; the storefront and van
anchored RIGHT, sidewalk and sky opening LEFT for text; focal point on the lit storefront
and a corner camera. Wide 24mm architectural lens at f/5.6, deep focus, a slight blue-hour
long-exposure calm. Lighting: blue-hour ambient + warm storefront interior; premium but
real. Palette: deep blue + warm interior amber, with green/yellow accents on the van.
LOGO: place the attached MGS logo on the van's flat side door (head-on, parallel to
camera, unobstructed) — real mark = glossy yellow (#FFD700) badge, green (#009E49) "M·G·S",
black "Communications, Inc." Keep the storefront's own signage band blank/neutral so it
won't compete or garble.
Avoid: warped van logo or sign text, duplicated cameras, plastic look, oversaturation, fake flare.
Output 1920×1080, 16:9.
```

### #12 · `security/access-control-reader-detail.jpg` · 800×600 (4:3) · [LOGO-FREE]
```
A clean close-up of a black card reader on a tan wall, a white proximity fob hovering at
it, a soft green LED lit. Setting: a commercial entry wall, neutral interior light. The
reader is center-frame with the fob entering from the right and a shallow background;
keep it center-safe for a card crop. 60mm lens at f/2.8, reader razor-sharp, background
blurred. Lighting: soft even product light with a gentle key reflection. Palette: black +
green LED, tan wall.
Avoid: warped reader text, extra fingers, duplicated LEDs, oversaturation.
Output 800×600, 4:3.
```

### #13 · `security/alarm-control-panel-wall.jpg` · 800×600 (4:3) · [LOGO-FREE]
```
A wall-mounted alarm touchscreen showing a clean "Armed — Stay / All Secure" screen with a
green check. Setting: a clean interior wall, warm neutral home/office light. The panel is
centered/slightly right, straight-on, with minimal surroundings; center-safe. 50mm lens at
f/4, panel sharp. Lighting: soft even light, the self-lit screen legible with minimal clean
UI text. Palette: white + green accent, warm wall.
Avoid: gibberish UI, warped check, duplicated panel, oversaturation.
Output 800×600, 4:3.
```

### #14 · `security/ip-dome-camera-closeup.jpg` · 1920×1080 (16:9) · [LOGO-FREE]
```
A modern IP dome camera in crisp close-up, a single Ethernet/PoE cable feeding it, the lens
and IR ring visible — a technology-forward "smart camera." Setting: mounted on a tan-stucco
eave with blue-sky bokeh behind. The camera anchored RIGHT, soft sky and wall opening LEFT
for text; focal point on the lens/IR ring. 85mm lens at f/2.8, tight macro, dreamy
background bokeh. Lighting: bright clean daylight with a crisp specular highlight on the
dome. No readable camera brand. Palette: crisp white/black hardware, blue sky, a subtle
green IR/LED hint.
Avoid: warped tiny text, duplicated lenses, plastic-toy look, oversaturation.
Output 1920×1080, 16:9.
```

## P3 — People / team / fleet

### #15 · `people/construction-crew-radios-jobsite.jpg` · 1200×800 (3:2) · [LOGO-READY]
```
Two diverse construction workers in hard hats and hi-vis vests on an active site; the
foreground worker speaks into a handheld two-way radio while the second works near steel
framing behind. Setting: a New Mexico jobsite, desert landscape and blue sky beyond,
midday. Medium shot, waist-up, slight low angle; the radio-user is the subject
left-of-center, the second worker gives depth on the right, shallow background. 35mm lens
at f/2.8, subject sharp, site softly blurred. Lighting: bright midday desert sun, warm and
authentic. Palette: hi-vis green-yellow echoing the brand, tan dirt, blue sky.
LOGO-READY: keep vests and radio labels plain so MGS branding can be added later.
Avoid: warped text, extra fingers, identical twin faces, plastic skin, oversaturation.
Output 1200×800, 3:2.
```

### #16 · `people/hospitality-staff-radio-earpiece.jpg` · 1200×800 (3:2) · [LOGO-FREE]
```
A warm hotel front-desk employee in a crisp blazer, a compact radio clipped at the belt
with a discreet earpiece, smiling and gesturing welcomingly. Setting: an upscale-but-real
hotel lobby, polished counter, warm ambient light, Southwest-tasteful decor. Medium shot,
waist-up; the subject right-of-center with lobby depth to the left; the radio and earpiece
subtly visible. 50mm lens at f/2.5, subject sharp, lobby soft. Lighting: warm ambient lobby
light, flattering. Palette: warm neutrals with a subtle green plant accent.
Avoid: warped earpiece, extra fingers, plastic skin, oversaturation.
Output 1200×800, 3:2.
```

### #17 · `people/warehouse-worker-radio.jpg` · 1200×800 (3:2) · [LOGO-FREE]
```
A warehouse worker in a safety vest walking an aisle of tall inventory racks, radio raised
to speak, scanning a shelf. Setting: a large clean distribution warehouse, the forklift
area soft in the deep background. Medium-wide; the worker left-of-center walking toward
camera, racks converging right for depth, with motion energy. 35mm lens at f/2.8, worker
sharp, aisle softly blurred. Lighting: cool overhead warehouse light warmed slightly for
humanity. Palette: industrial neutrals + a hi-vis brand-echo of green/yellow.
Avoid: warped box/label text, extra fingers, duplicated racks, plastic skin, oversaturation.
Output 1200×800, 3:2.
```

### #18 · `people/event-security-staff-radio.jpg` · 1200×800 (3:2) · [LOGO-READY]
```
An event/security staffer in a polo with a lanyard badge, radio raised to the ear with a
coiled-tube earpiece, focused and professional, scanning a crowd. Setting: an outdoor New
Mexico event — string lights, tents, a softly blurred crowd; golden hour
(Balloon-Fiesta-style festive but organized). Medium close-up from a slight side angle;
the staffer right-of-center with event bokeh to the left; focal point on the face and
radio. 50mm lens at f/2.2, subject sharp, festival lights as warm bokeh. Lighting:
golden-hour sun + early string-light glow. Palette: warm golden tones with green/yellow
accents on the badge/polo.
LOGO-READY: keep the polo chest and lanyard card blank for later MGS/event branding.
Avoid: warped badge text, extra fingers, plastic skin, blown-out lights, oversaturation.
Output 1200×800, 3:2.
```

### #19 · `team/mgs-team-showroom.jpg` · 1200×800 (3:2) · [LOGO: feed as reference]
```
A warm, genuine group of four MGS staff (diverse ages and roles, family-business feel)
standing together in matching dark-green embroidered polos, relaxed natural smiles —
approachable, not stiff corporate. Setting: their real-feeling showroom — a pegboard wall
of two-way radios and accessories, product boxes on shelves, clean and lived-in. Waist-up
group portrait in a slightly informal staggered arrangement, even spacing, the focal plane
across the faces. 35mm lens at f/4, the whole group sharp, background gently soft. Lighting:
soft, flattering indoor softbox-style light, warmed to feel inviting. Palette: brand-green
polos, warm showroom neutrals, subtle yellow accents.
LOGO: small embroidered MGS logo on each polo's left chest (flat, front-facing). Real mark
= yellow (#FFD700) badge, green (#009E49) "M·G·S", black "Communications, Inc." If a wall
sign appears behind, keep it a clean flat head-on surface.
Avoid: warped chest logos, extra fingers, duplicated/identical faces, plastic skin, dead
stock-photo smiles, oversaturation.
Output 1200×800, 3:2.
```

### #20 · `fleet/service-van-exterior.jpg` · 1200×800 (3:2) · [LOGO: feed as reference]
```
A clean white MGS work van parked at the storefront curb, three-quarter front angle, a
roof whip antenna visible, ready-for-the-job stance. Setting: an Albuquerque
storefront/parking, tan stucco, blue sky, Sandias on the horizon, warm daylight. A
three-quarter hero-product angle; the van fills most of the frame with the flat side door
squarely toward camera; clean sky negative space upper-left. 35mm lens at f/8, deep focus,
a slight low angle for presence. Lighting: clean directional daylight, crisp body
highlights, true paint. Palette: white van + green/yellow MGS livery, tan + blue NM
backdrop.
LOGO: the van's flat side door is the logo surface — keep it large, head-on, parallel to
camera, unobstructed. Real mark = yellow (#FFD700) badge, green (#009E49) "M·G·S", black
"Communications, Inc." plus optional clean "(505) 888-2034" below in a simple sans typeface.
Avoid: warped logo/phone text, wrong reflections, duplicated antennas, plastic look, oversaturation.
Output 1200×800, 3:2.
```

### #21 · `fleet/mobile-radio-dash-install.jpg` · 1200×800 (3:2) · [LOGO-FREE]
```
A Kenwood mobile two-way radio cleanly mounted under the dash/center console of a work
truck, green-lit LCD, a coiled hand-mic clipped to the dash, tidy zip-tied cabling.
Setting: a truck cab interior; through the windshield a New Mexico desert highway and the
Sandias under a blue sky, slightly soft. From the passenger seat; the radio sharp in the
lower-right, windshield scenery as soft context upper-left; focal point on the lit display.
35mm lens at f/3.5, radio sharp, scenery soft. Lighting: natural daylight through the
glass, warm interior, a legible display glow. Keep the radio face plain. Palette: dark
interior + green display glow, warm desert through the glass.
Avoid: warped display text, duplicated mics, messy/floating cables, plastic sheen, oversaturation.
Output 1200×800, 3:2.
```

## P4 — Thin pages + extra proof

### #22 · `hero/secure-payment-invoice.jpg` · 1920×1080 (16:9) · [LOGO-READY]
```
Hands holding a phone showing a clean, simple digital invoice/pay screen with a green
"Paid" / secure-lock cue; a card and a two-way radio rest on the desk nearby — easy,
secure payment. Setting: a warm, tidy small-business desk (wood surface, soft daylight).
The phone and hands anchored RIGHT, the desk surface opening LEFT for text; focal point on
the phone screen. 50mm lens at f/2.8, phone sharp, desk soft. Lighting: soft warm daylight,
clean screen legibility, gentle reflections. Generic clean UI with a green check + lock
icon and NO readable brand text.
LOGO-READY: keep the on-screen invoice header blank/neutral so MGS branding can be
composited; no logos drawn.
Avoid: gibberish UI text, extra fingers, warped numbers, plastic skin, oversaturation.
Output 1920×1080, 16:9.
```

### #23 · `hero/resources-knowledge-hub.jpg` · 1920×1080 (16:9) · [LOGO-FREE]
```
An organized flat-lay-meets-desk scene of "expert resources": an open notebook, a two-way
radio, a small dome camera, a coiled antenna, a multimeter, and printed spec sheets
arranged tidily — signaling guides and know-how. Setting: a warm wooden desk in soft
daylight, shallow depth. Slightly overhead three-quarter; props clustered RIGHT in a
diagonal flow, clean desk opening LEFT for text; focal point on the notebook and radio.
35mm lens at f/4, central props sharp, edges soft. Lighting: soft warm window light, gentle
shadows. Any text on the spec sheets is blurred/illegible by design. Palette: warm wood +
green/yellow accents (a green notebook or sticky tab).
Avoid: warped readable text, duplicated devices, plastic look, cluttered chaos, oversaturation.
Output 1920×1080, 16:9.
```

### #24 · `people/showroom-customer-consult.jpg` · 1200×800 (3:2) · [LOGO: feed as reference]
```
A friendly MGS salesperson in a dark-green polo showing a two-way radio to a customer
across a glass display counter, mid-explanation — a warm, consultative moment. Setting:
the MGS showroom — a pegboard radio wall and accessories behind, clean and inviting.
Medium-wide showing the full counter interaction; both figures sharp, the product between
them as the focal point. 35mm lens at f/3.5, subjects sharp, background gently soft.
Lighting: warm, inviting retail light, soft and flattering. Palette: brand-green polo,
warm showroom neutrals, yellow accents.
LOGO: small embroidered MGS logo on the salesperson's left chest (flat, front-facing).
Real mark = yellow (#FFD700) badge, green (#009E49) "M·G·S", black "Communications, Inc."
Keep any background wall sign a clean head-on surface.
Avoid: warped chest logo, extra fingers, plastic skin, stiff poses, oversaturation.
Output 1200×800, 3:2.
```

### #25 · `fleet/rental-fleet-charging-bank.jpg` · 1200×800 (3:2) · [LOGO-READY]
```
A neat bank of about a dozen identical handheld radios seated in multi-unit charging docks,
all green "charged" LEDs glowing; a bin of earpieces and belt clips organized beside it —
"rental fleet ready." Setting: a clean back-office counter, warm professional light. A
slight overhead angle along the row of docks, pleasing repetition leading the eye; focal
point on the front charged radio. 35mm lens at f/5.6, the row sharp front-to-mid with soft
falloff. Lighting: soft even countertop light with small green-LED specular glints.
Palette: black radios + green LEDs (brand echo), warm counter.
LOGO-READY: leave a small blank label band on the dock/counter for a later "MGS Rental
Fleet — Ready" tag; no logos drawn.
Avoid: warped label text, duplicated/melting radios, plastic-toy look, oversaturation.
Output 1200×800, 3:2.
```

---

## INTEGRATION (for when the images come back — handled in the build, not by you)

- Drop files into the folders in the plan table. New folders: `images/people/`, `images/security/`, `images/fleet/`, `images/team/`.
- **Compress before commit:** heroes < 300 KB @ 1920px, cards < 100 KB @ 800px, content < 200 KB @ 1200px (squoosh.app is easiest). Netlify is case-sensitive — match filenames exactly.
- Heroes swap by editing **one CSS line** per page (the `background: …url('…')…` in that page's inline `<style>`); keep the existing deep-green gradient prefix and only change the `url()`.
- Homepage slots: #1 → `.hero` background (currently `radio-lineup-all-models.jpg`); #4 → "Service & Repairs" card; #5 → "Security Systems" card (currently the orange gradient + camera icon).
- Article-hero fixes: `resources/security-camera-placement` → #5; `resources/cctv-vs-ip-cameras` → #14 (with #12/#13 inline).

*Generated: May 29, 2026 — design-upgrade image set (25 prompts). Brand colors corrected to logo spec (#009E49 / #FFD700).*
