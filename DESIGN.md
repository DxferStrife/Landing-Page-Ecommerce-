# atypiqo studio — Brand Identity System

Design reference for Claude. Implement exactly as specified. Do not substitute fonts, colors, or SVG paths.

---

## Brand personality

"Rebelde Amable" — technically precise and disruptive with the market, warm and close with the client. Visual intersection of Linear/Vercel/Stripe (technical base) and a brand with deliberate typographic character (rebellious accent). Never corporate, never generic agency.

---

## Color palette

| Token        | Hex       | Role                                              |
|--------------|-----------|---------------------------------------------------|
| `--ink`      | `#0D0D0D` | Page background (primary dark ground)             |
| `--ink-80`   | `#1A1A1A` | Cards, panels, dark surfaces                      |
| `--ink-60`   | `#2E2E2E` | Borders, dividers, hairlines                      |
| `--slate`    | `#6B6B6B` | Secondary text, labels, captions                  |
| `--ash`      | `#ABABAB` | Subdued text, metadata                            |
| `--ghost`    | `#F2F2F0` | Primary text on dark; light-mode background       |
| `--accent`   | `#E35336` | Disruptive coral — the one color that breaks rule |
| `--accent-light` | `#F06A50` | Hover/lighter variant of accent               |

### Color usage rules
- `#E35336` is the **only** accent color. Never add a second accent.
- Use coral sparingly: logo accent letters, isotipo mark, primary CTAs, section number labels. Never flood a composition with it.
- Recommended proportion per composition: **70% ink / 20% ghost / 10% coral**.
- Never use standard corporate blue. Never use gradients as backgrounds.
- Monochrome version: replace `#E35336` with `#F2F2F0` (dark context) or `#0D0D0D` (light context).

---

## Typography system

### Font imports (Vite/CSS — place before all other CSS statements)

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@700;800&display=swap');
```

### Font roles

| Family             | Weight(s)    | Role                                              |
|--------------------|--------------|---------------------------------------------------|
| Instrument Sans    | 800          | Logotype letters a, i — geometric precise         |
| Barlow Condensed   | 800          | Logotype letter t — aggressive industrial (coral) |
| Outfit             | 700          | Logotype letters y, o — geometric modern          |
| DM Sans            | 700          | Logotype letter p — geometric open                |
| IBM Plex Sans      | 800          | Logotype letter q — aggressive accent (coral)     |
| Outfit             | 300          | "studio" label — calm geometric counterpoint      |
| Instrument Sans    | 600–800      | Display headings, UI titles                       |
| Barlow Condensed   | 700–900      | Section labels, large display, metadata tags      |
| DM Sans            | 400          | Body copy, paragraphs, UI text                    |
| Outfit             | 300–500      | Subheadings, supporting UI                        |

### Typography scale

```
Display / hero:    Instrument Sans 800, ~52–72px, letter-spacing -0.02em
Section heading:   Instrument Sans 800, ~34px, letter-spacing -0.01em
Aggressive label:  Barlow Condensed 700–800, 11–13px, letter-spacing 0.16–0.22em, uppercase
Sub-heading:       Outfit 700, ~28px
Body:              DM Sans 400, 14–16px, line-height 1.6
Caption / label:   DM Sans 400, 11–12px, color #6B6B6B
Mono / code:       (not in system — add JetBrains Mono if needed)
```

---

## Logotype — Ransom Note

The logotype is the word **atypiqo** rendered with a deliberate per-letter typeface mix. This is the only form of the "ransom note" effect — purely typographic, no paper textures, no rotation, no shadows, no collage simulation.

### Letter map

| Letter | Font family      | Weight | Color     | Type       |
|--------|-----------------|--------|-----------|------------|
| a      | Instrument Sans  | 800    | `#F2F2F0` | Geometric  |
| t      | Barlow Condensed | 800    | `#E35336` | Aggressive |
| y      | Outfit           | 700    | `#F2F2F0` | Geometric  |
| p      | DM Sans          | 700    | `#F2F2F0` | Geometric  |
| i      | Instrument Sans  | 800    | `#F2F2F0` | Geometric  |
| q      | IBM Plex Sans    | 800    | `#E35336` | Aggressive |
| o      | Outfit           | 700    | `#F2F2F0` | Geometric  |

**Coherence rule:** All letters share the same font-size, same line-height (1), same baseline, same letter-spacing (`-0.02em`). Contrast lives only in letterform shape. Never vary size, rotation, or vertical alignment between letters.

**"studio" label:** Outfit 300, letter-spacing `0.22em`, uppercase, color `#ABABAB` (dark) / `#6B6B6B` (light). Single typeface only, as ordered counterpoint to the mixed logotype.

### Monochrome version
Replace `#E35336` accent letters with `#F2F2F0` (dark background) or `#0D0D0D` (light background). The ransom note remains readable through letterform contrast alone.

### React implementation

```tsx
const ATYPIQO_LETTERS = [
  { char: "a", font: "'Instrument Sans', sans-serif", weight: 800 },
  { char: "t", font: "'Barlow Condensed', sans-serif", weight: 800, coral: true },
  { char: "y", font: "'Outfit', sans-serif", weight: 700 },
  { char: "p", font: "'DM Sans', sans-serif", weight: 700 },
  { char: "i", font: "'Instrument Sans', sans-serif", weight: 800 },
  { char: "q", font: "'IBM Plex Sans', sans-serif", weight: 800, coral: true },
  { char: "o", font: "'Outfit', sans-serif", weight: 700 },
];

// Render:
{ATYPIQO_LETTERS.map(({ char, font, weight, coral }, i) => (
  <span
    key={i}
    style={{
      fontFamily: font,
      fontWeight: weight,
      fontSize,           // same for all letters
      color: coral ? accentColor : textColor,
      lineHeight: 1,
      letterSpacing: "-0.02em",
      display: "inline-block",
    }}
  >
    {char}
  </span>
))}
```

---

## Isotipo (symbol mark)

A geometric deconstruction of the lowercase letter "a": an open arc (bowl) + a vertical stem + a horizontal bar in accent color connecting them at mid-height. The horizontal coral bar is the structural metaphor for the brand's disruptive element.

### SVG paths (viewBox 0 0 80 80)

```svg
<!-- Background square with rounded corners -->
<rect width="80" height="80" rx="14" fill="{bg}" />

<!-- Bowl: open arc, bottom-right gap -->
<path
  d="M42 18 C27 18 18 27 18 40 C18 53 27 62 40 62 C47.5 62 54 58.5 57.5 53"
  stroke="{fg}"
  strokeWidth="7.5"
  strokeLinecap="round"
  fill="none"
/>

<!-- Stem: vertical bar right side -->
<line x1="58" y1="18" x2="58" y2="62" stroke="{fg}" strokeWidth="7.5" strokeLinecap="round" />

<!-- Accent bar: coral horizontal connecting bowl to stem -->
<line x1="42" y1="40" x2="58" y2="40" stroke="#E35336" strokeWidth="7.5" strokeLinecap="round" />
```

**Variables:**
- `{bg}`: `#0D0D0D` (dark) / `#F2F2F0` (light)
- `{fg}`: `#F2F2F0` (dark) / `#0D0D0D` (light)
- Accent bar stroke: `#E35336` (color) / `#F2F2F0` (mono dark) / `#0D0D0D` (mono light)

### Isotipo usage
- Use isotipo (not logotype) for favicons, social avatars, app icons, any context under 200px wide.
- Minimum size: 16×16px.
- Protection space: minimum equal to the height of the bowl arc on all sides.
- Works on dark and light backgrounds without modification.

---

## Logo variants

| Variant              | When to use                                              |
|----------------------|----------------------------------------------------------|
| Imagotipo horizontal | Primary: website headers, pitch decks, email signatures  |
| Imagotipo stacked    | Square social profiles, secondary placements             |
| Logotype only        | When isotipo appears separately nearby                   |
| Isotipo only         | Favicon, avatar, app icon, <200px contexts               |
| Monochrome dark      | Single-ink print on dark substrate                       |
| Monochrome light     | Single-ink print on light substrate, embroidery, engraving |

### Minimum sizes
- Isotipo: 16×16px
- Imagotipo: 200px wide
- Logotype alone: 120px wide

---

## Layout and visual system

### Ground
- **Default: dark.** Primary surface is `#0D0D0D`. Cards/panels `#1A1A1A`. Borders `#2E2E2E`.
- Use light surfaces (`#F2F2F0`) only for contrast insets, not as primary page ground.
- Grid overlay (optional, subtle): `rgba(255,255,255,0.022)` at 60px intervals signals technical precision without being decorative.

### Spacing
- Use generous whitespace. Sections breathe; never pack elements tightly.
- Protection space around logo = height of the "a" letter in all directions.

### Borders and dividers
- Hairline only: `1px solid #1A1A1A` (strong) or `1px solid #2E2E2E` (subtle).
- Never use thick borders or decorative frames.

### Section structure
- Section labels: `Barlow Condensed 700`, 11px, `letter-spacing: 0.18em`, uppercase, color `#E35336` for number + `#6B6B6B` for descriptor, separated by a `1px #2E2E2E` horizontal rule.

### Interactive states
- Hover: `#E35336` on scrollbar thumb, links, icon accents.
- Focus ring: `#E35336` at low opacity.
- Transitions: `200ms` duration, no bounce.

---

## What NOT to do

- Do not use any blue, purple, or teal as accent.
- Do not add gradients as backgrounds or on the logo.
- Do not add drop shadows, glows, or outer strokes to the logo.
- Do not rotate, skew, stretch, or distort any logo element.
- Do not simulate paper cut, magazine collage, ink texture, or torn edges on the logotype.
- Do not render the full ransom-note logotype at sizes below 120px wide — use isotipo instead.
- Do not place the logo on medium-gray backgrounds (near 50% gray) that collapse contrast.
- Do not reconstruct the logotype with different fonts than specified above.
- Do not add a second accent color alongside coral.
- Do not use Canva-style rounded blobs, gradients, or "friendly" icon styles (rockets, </>, lightbulbs).
