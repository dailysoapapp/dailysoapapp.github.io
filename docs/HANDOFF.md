# Daily SOAP landing page: implementation handoff

## 1. Task

Replace the current landing page at **dailysoap.app** with the new design described here. The page explains what the app does, explains the SOAP Bible study method, and links to the App Store, Google Play and the web app.

- **Design source:** Claude Design canvas "Daily SOAP Landing Page" (owner: Bowen). This document holds every value you need. Where the two disagree, this document wins.
- **Out of scope:** `contact.html`, the web app at web.dailysoap.app, and the mobile apps themselves.

## 2. Constraints

- **Static site.** The current site is plain HTML served as a static site. Keep it that way: one `index.html`, one CSS file, one small vanilla JS file. No framework, no build step, no runtime dependencies.
- **Keep existing pieces:** `contact.html`, the `/favicon/` set, and the existing `<meta>` icon tags. Update `theme-color` and `msapplication-TileColor` from `#2979FF` to `#4077f6`.
- **Font:** Inter from Google Fonts, weights 400, 500, 600, 700, 800, with `display=swap`.
- **No tracking or third-party scripts** beyond Google Fonts.
- **Browsers:** the last two versions of Chrome, Safari (macOS and iOS), Firefox and Edge.

## 3. Assets

The `assets/` folder in this bundle holds the four App Store screenshots. Each is 459 × 998 px WebP.

| File | Used in | Alt text |
| --- | --- | --- |
| `assets/plan.webp` | Feature 01 Read | Reading plan screen with today's passage and a plan calendar |
| `assets/reflect.webp` | Feature 02 Reflect | SOAP entry screen with Scripture, Observation, Application and Prayer cards |
| `assets/share.webp` | Feature 03 Share | Sharing a SOAP entry with others |
| `assets/groups.webp` | Feature 04 Grow together | Accountability group feed showing SOAPs shared today by partners |

Copy them to `/img/` in the site. Add `width="459" height="998"` to every `<img>` to prevent layout shift, plus `loading="lazy"` on all of them except Feature 01.

**Store badges (required, not in this bundle).** Use the **official** badges only. Do not draw or recreate them.
- Apple: "Download on the App Store", black, from https://developer.apple.com/app-store/marketing/guidelines/
- Google: "Get it on Google Play", from https://play.google.com/intl/en_us/badges/

Save them as `/img/app-store-badge.svg` and `/img/google-play-badge.svg`. The current site already has files with these names, so check they're the current versions before reusing them. Render both badges at **52 px tall** with width auto. Follow each brand's clear-space rules, and don't add borders or shadows to them.

## 4. Design tokens

Put these in `:root` as CSS custom properties and use the variables everywhere.

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--brand` | `#4077f6` | Highlight words in headings, card outlines, active progress dot. App seed colour. |
| `--brand-strong` | `#2a5bd0` | Web-version button fill, eyebrow labels, links, focus ring. Passes 4.5:1 with white. |
| `--brand-deep` | `#1d44a3` | Text on pale blue (pills, Share chip), link hover. |
| `--ink` | `#121212` | Body text, nav, store-button fallback fill. |
| `--text-2` | `#3a3a3a` | Paragraph text. |
| `--text-3` | `#5f5f5f` | Small uppercase labels in the example card. |
| `--surface` | `#ffffff` | Page and card background. |
| `--tint-1` | `#f1f5ff` | Gradient stop. |
| `--tint-2` | `#e6eeff` | Gradient stop, nav pill fill, Share chip fill. |
| `--line` | `#b9cdf8` | Thin card outline, eyebrow pill outline. |
| `--line-soft` | `#c7d7f8` | Inner field outlines in the example card. |
| `--dot-idle` | `#9fb8ee` | Inactive progress dot. |
| `--footer-line` | `#e3e8f3` | Footer top border. |
| `--green-bg` / `--green` | `#ecf8f0` / `#2f9e57` | Group point 1. |
| `--blue-bg` / `--blue` | `#eaf0ff` / `#4077f6` | Group point 2. |
| `--orange-bg` / `--orange` | `#fdf1e6` / `#e58a3a` | Group point 3. |

**Contrast rule:** never put normal-size white text on `--brand` (#4077f6). That pair is only about 4:1, so use `--brand-strong` for filled buttons. `--brand` as text is fine at 30 px and above.

### Type (Inter)

| Role | Size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- |
| H1 | `clamp(40px, 6.4vw, 76px)` | 800 | 1.04 | -0.03em |
| H2 | `clamp(32px, 4.2vw, 48px)` | 800 | 1.08 | -0.02em |
| H2, download card | `clamp(34px, 4.8vw, 56px)` | 800 | 1.05 | -0.025em |
| Feature H3 | `clamp(30px, 3.6vw, 44px)` | 800 | 1.1 | -0.02em |
| Lead paragraph | `clamp(17px, 1.6vw, 20px)` (hero), 18px (others) | 400 | 1.55 to 1.6 | 0 |
| Body | 15 to 16px | 400 | 1.5 | 0 |
| Eyebrow (e.g. `01 · READ`) | 15px | 700 | normal | 0.04em |
| Card title (SCRIPTURE etc.) | 17px | 800 | normal | 0.02em |
| Small label | 13px | 700 | normal | 0.04em |
| Nav link | 15px | 600 | normal | 0 |
| Logo | 22px | 800 | normal | -0.02em |

### Shape and depth

- **Radii:** buttons 16px, nav pill 14px, SOAP cards 18px, group points 14px, example card 24px, screenshots 28px, download card 32px, pills 999px.
- **Shadows:**
  - screenshots: `0 24px 48px rgba(29,68,163,.16)`
  - SOAP cards: `0 8px 20px rgba(64,119,246,.10)`
  - download card: `0 16px 40px rgba(64,119,246,.12)`
  - dark buttons: `0 10px 24px rgba(18,18,18,.18)`
  - blue button: `0 10px 24px rgba(64,119,246,.3)`
- **Layout:** content max-width is 1160px, with 24px side padding.

## 5. Page structure and copy

Use the copy below verbatim. Blue words are wrapped in `<span class="hl">` styled with `color: var(--brand)`.

### 5.1 Header

This is not sticky. It sits on the hero gradient. Use flex, space-between, wrapping on small screens, with 20px vertical padding.

- **Logo:** "Daily **SOAP**", with "SOAP" in `--brand`. It links to `#top`.
- **Nav links:** Features → `#what`, The SOAP method → `#soap`, Groups → `#groups`.
- **Nav pill:** "Get the app" → `#download`. Style: `--tint-2` fill, 2px `--brand` border, `--brand-deep` text, 44px tall, 14px radius, shadow `0 6px 18px rgba(64,119,246,.18)`.

### 5.2 Hero (`#top`)

The background is `linear-gradient(180deg, #fff 0%, #f1f5ff 60%, #e6eeff 100%)`, covering both the header and the hero. Content is centred, with padding of 56px top and 88px bottom and a 24px gap.

1. **Eyebrow pill:** "Free on iPhone, Android and the web". White fill, 1.5px `--line` border, `--brand-deep` text, 14px/600.
2. **H1:** "**Read** the Bible daily." line break "**Live** what God shows you." The two bold words are blue. Max-width 900px.
3. **Lead:** "Daily SOAP pairs a two-year reading plan with simple journaling. Read a passage, write what you notice, apply it, and pray. Then share it with friends who keep you going." Max-width 620px.
4. **Download row,** centred and wrapping with a 12px gap:
   - App Store badge → `https://apps.apple.com/us/app/id1448825436`
   - Google Play badge → `https://play.google.com/store/apps/details?id=net.hmcc.hongkong.dailysoap`
   - Button "Use the web version →" → `https://web.dailysoap.app`. Style: `--brand-strong` fill, white text, 52px tall, 16px radius, 700 weight, with an inline arrow SVG (stroke, `aria-hidden`).

### 5.3 Features (`#what`): scroll-driven showcase

The background is `linear-gradient(180deg, #e6eeff 0px, #f5f8ff 260px, #fff 560px)`, so the hero colour carries straight in with no visible seam. Padding is 40px top and 72px bottom.

- **H2:** "Made for your **daily time** with God"
- **Lead:** "Spend 15 to 30 minutes in God's Word, then carry it with you for the rest of the day."

The body is a two-column grid: `repeat(2, minmax(0,1fr))`, 72px gap, max-width 1040px, centred.

**Left column:** four step blocks, each `min-height: 620px`, with content vertically centred and a 16px gap.

| # | `id` | Eyebrow | H3 (blue part in bold) | Paragraph |
| --- | --- | --- | --- | --- |
| 0 | | `01 · READ` | "**Read and meditate** on the Bible daily" | Follow a two-year plan that alternates between the Old and New Testament every few days. Pick any date to see its passage, or choose your own. Read in eight translations, including ESV, NIV and NLT. |
| 1 | | `02 · REFLECT` | "**Reflect on and apply** God's Word in your life" | Write a SOAP entry for each reading: the verse that speaks to you, what you notice, how you'll apply it, and a prayer. Your past entries stay with you to revisit and edit. |
| 2 | | `03 · SHARE` | "**Share** your SOAP entries with others" | Send a SOAP to a friend or your accountability group in one tap. Encourage each other and stay on track together. |
| 3 | `groups` | `04 · GROW TOGETHER` | "Grow together with **accountability groups**" | Faith grows best with others. Share your SOAP with the people walking alongside you, and see what God is teaching them too. |

Step 3 also has three "group points" under its paragraph. Each is a rounded 14px row with 12px × 16px padding, a 10px coloured dot, and 15px text.
- Green: "**Share to one group or all.** Send a SOAP to the groups you choose in one tap."
- Blue: "**See today's log.** A daily feed shows who has shared, with reactions."
- Orange: "**Nudge gently.** Remind members who haven't shared yet, and give each group its own icon."

**Right column:** a sticky stage, `position: sticky; top: 72px; height: 640px`, with content centred.
- **Phone frame:** 276 × 600px, `position: relative`, holding all four screenshots stacked with `position:absolute; inset:0; object-fit:contain`. Mark them `alt=""` because each step's inline image carries the alt text.
- **Progress control:** a vertical column of four `<button>`s, each 28 × 44px (the touch target). Each button contains an 8px-wide pill.

**Behaviour.** Exactly one step is active at a time, and it starts at 0.

| Element | Active | Inactive | Transition |
| --- | --- | --- | --- |
| Step text block | opacity 1 | opacity 0.3 | opacity .4s ease |
| Screenshot | opacity 1, `translateY(0) scale(1)` | opacity 0, `translateY(24px) scale(.96)` | opacity and transform .5s ease |
| Progress pill | 28px tall, `--brand` | 8px tall, `--dot-idle` | all .4s ease |

- A step becomes active when it crosses the vertical centre of the viewport. Use one `IntersectionObserver` with `rootMargin: '-45% 0px -45% 0px'` watching all four steps.
- Clicking a progress button scrolls that step to the centre (`scrollIntoView({behavior:'smooth', block:'center'})`), and the observer then activates it.
- Buttons have `aria-label` values "Show Read", "Show Reflect", "Show Share" and "Show Grow together". Set `aria-current="step"` on the active button.
- Drive state by toggling an `is-active` class on the step, the screenshot and the dot. Don't set inline styles from JS.
- **`prefers-reduced-motion: reduce`:** remove all transforms and transitions. Swaps become instant.
- **No JS or no IntersectionObserver:** step 0 is active and every step is shown at full opacity, so no content is hidden.

Reference JS (about 25 lines, put in `/js/features.js` and load with `defer`):

```js
(() => {
  const steps = [...document.querySelectorAll('[data-feat]')];
  const shots = [...document.querySelectorAll('[data-shot]')];
  const dots  = [...document.querySelectorAll('[data-dot]')];
  if (!steps.length) return;
  const set = (i) => {
    steps.forEach((el, n) => el.classList.toggle('is-active', n === i));
    shots.forEach((el, n) => el.classList.toggle('is-active', n === i));
    dots.forEach((el, n) => {
      el.classList.toggle('is-active', n === i);
      n === i ? el.setAttribute('aria-current', 'step') : el.removeAttribute('aria-current');
    });
  };
  document.documentElement.classList.add('js-features');
  set(0);
  dots.forEach((d, n) => d.addEventListener('click', () =>
    steps[n].scrollIntoView({ behavior: 'smooth', block: 'center' })));
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) set(Number(e.target.dataset.feat)); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach((s) => io.observe(s));
})();
```

Scope the 0.3 inactive opacity under `.js-features` so it only applies when JS runs.

### 5.4 The SOAP method (`#soap`)

The background is `linear-gradient(180deg, #fff 0%, #eef3ff 28%, #e6eeff 62%, #fff 100%)`. It must start and end on pure white so it blends into the sections above and below. Padding is 120px top and bottom. The layout is a wrapping flex row with a 56px gap.

**Left side** (`flex: 1 1 520px`):
- **H2:** "What is the **SOAP** method?"
- **Lead:** "SOAP is a simple way to study the Bible and remember what you read. Instead of just finishing a chapter, you slow down, write four short things, and respond to God."
- **Four cards** in a grid of `repeat(auto-fit, minmax(240px,1fr))` with a 14px gap. Each card is white with a 2px `--brand` border, 18px radius and 20px × 22px padding. The title is uppercase.

| Title | Text |
| --- | --- |
| SCRIPTURE | Read the day's passage. Pick the verse that God is speaking to you about and write it down. |
| OBSERVATION | Write what you notice. What does it say about God? What caught your attention? |
| APPLICATION | Make it personal. Respond practically to what God is saying to you today. |
| PRAYER | Pray and ask for God's help to respond to His Word and live it out. |

**Right side** (`flex: 0 1 380px`), the example entry card:
- **Card:** white, max-width 360px, 1.5px `--line` border, 24px radius, padding 28px 24px 24px.
- **Share chip:** absolutely positioned at `top:-22px; right:-8px`, reading "Share" with a paper-plane stroke icon. Style: `--tint-2` fill, 2px `--brand` border, 14px radius, `--brand-deep` 16px/700 text. This is decorative, so render it as a `<span>`, not a button.
- **Label:** "EXAMPLE ENTRY".
- **Four fields,** each with a 1.5px `--line-soft` border and 14px radius. Each has a small label and a 15px value:
  - SCRIPTURE: "John 15:5"
  - OBSERVATION: "Jesus says we can do nothing apart from Him. He keeps repeating the word "abide"."
  - APPLICATION: "Before my first meeting, I'll pause and ask what He wants me to do."
  - PRAYER: "Lord, keep me close to You today."

### 5.5 Download (`#download`)

The section padding is 0 24px 96px. Inside is one card: white background, 2px `--brand` border, 32px radius, 72px × 32px padding, the download-card shadow, no gradient. Content is centred with a 22px gap.

- **H2:** "**Get SOAPing** today"
- **Text:** "Free to download. Pick the one that fits your device, or open it in your browser."
- **Buttons:** the same download row as the hero, with the same links.
- **Small print:** "iPhone and iPad need iOS 16.6 or later." Style: 14px, `#4a4a4a`.

### 5.6 Footer

1px `--footer-line` top border, then a wrapping flex row, space-between, 14px text.
- **Left:** "Daily SOAP is made by Christ-followers at [Harvest Mission Community Church, Hong Kong](http://hongkong.hmcc.net), who aim to be ALIVE disciples."
- **Right:** a "Contact us" link → `/contact.html`, weight 600.

## 6. Responsive

The design must work from **320px** wide upwards with no horizontal scroll.

- **Up to 900px:**
  - The feature grid becomes one column. Hide the sticky stage and progress buttons with `display:none`.
  - Each step loses its `min-height` and gets 36px vertical padding at full opacity.
  - Each step shows its own screenshot inline under its text, max-width 300px, with a 28px radius and the screenshot shadow. Add these four inline `<img>`s in the markup and hide them above 900px. They carry the real alt text.
- **Header:** the nav wraps under the logo on narrow screens. Every link keeps a hit area of at least 44px.
- **Download rows:** wrap and stay centred.
- **SOAP section:** stacks naturally through `flex-wrap`, with the example card below the method cards.

## 7. Accessibility

- Use one `<h1>`. Give each section an `<h2>`, and make each feature step and SOAP card title an `<h3>`.
- Use `<header>`, `<nav aria-label="Primary">`, `<main>`, `<section>` with `aria-labelledby`, and `<footer>`.
- Give every interactive element a visible focus ring: `outline: 3px solid var(--brand-strong); outline-offset: 2px`.
- Badge links get descriptive alt text: "Download Daily SOAP on the App Store" and "Get Daily SOAP on Google Play".
- Mark all decorative SVGs `aria-hidden="true"`.
- Use `scroll-behavior: smooth` on `html`, inside `@media (prefers-reduced-motion: no-preference)` only.
- Text contrast must reach at least 4.5:1, or 3:1 for text 24px and above. The tokens above already meet this, so don't lighten them.

## 8. Meta and SEO

- `<title>`: Daily SOAP: Read the Bible daily with SOAP
- `<meta name="description">`: Daily SOAP is a free Bible reading app with a two-year plan, SOAP journaling and accountability groups. On iPhone, Android and the web.
- Add Open Graph and Twitter tags with the same title and description. Use `og:url` https://dailysoap.app/ and `og:type` website.
- Leave `og:image` as a TODO: there's no social share image yet, so ask the owner for one.
- Add `<meta name="apple-itunes-app" content="app-id=1448825436">` for the iOS Smart App Banner.

## 9. Open items: ask the owner, don't guess

1. **Store badges:** use the official files (see section 3).
2. **Example SOAP entry:** the John 15:5 text was written for the mock-up. Confirm or replace it.
3. **Social share image** for `og:image`.
4. **Feature parity:** the copy comes from the App Store listing. Confirm the Android and web versions offer the same features: reading plan, eight translations, SOAP entries, sharing, accountability groups.

## 10. Acceptance checklist

- [ ] All copy matches section 5 exactly.
- [ ] All three download links, in both the hero and the download card, go to the URLs in section 5.2.
- [ ] The official badges are used, at 52px tall.
- [ ] At 1280px, scrolling through Features swaps the screenshot and progress pill at each step's midpoint. Clicking a dot scrolls to that step.
- [ ] At 375px, there's no sticky stage, every step shows its own screenshot, and there's no horizontal scroll.
- [ ] Gradients flow hero → features and SOAP → download with no visible seam.
- [ ] Reduced motion means no movement, and instant swaps.
- [ ] With JS disabled, all content is visible and readable.
- [ ] Lighthouse scores 95 or higher for Accessibility and Best Practices, and 90 or higher for Performance on mobile.
- [ ] Keyboard only: every link and button is reachable, with a visible focus ring.
- [ ] `contact.html` and the favicons still work.
