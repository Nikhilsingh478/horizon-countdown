# Horizon Countdown

# Build a Minimal Premium 52-Day Countdown — Web + PWA + Android

Build a **very small, extremely polished countdown website/app**.

This is intentionally a simple project. Do **not** over-engineer it, do not turn it into a dashboard, and do not add unnecessary sections or functionality.

The entire purpose of the product is:

> **Show a beautiful, continuously running countdown to October 10, 2026.**

It must work properly as:

1. Desktop website
2. Mobile website
3. Installable PWA
4. Android application using Capacitor

The same React codebase should power all versions.

---

# 1. CORE PRODUCT IDEA

Create a single-screen countdown experience.

The countdown represents a fixed deadline:

**October 10, 2026**

Timezone:

**Asia/Kolkata / IST**

The timer must calculate the remaining time from the current actual time to the fixed deadline.

Do NOT hardcode a starting duration such as:

```text
52 days
12 hours
30 minutes
40 seconds
```

Instead, calculate the remaining time dynamically from:

```text
current time → October 10, 2026
```

The "52-day countdown" is the concept/title of the countdown, but the actual numbers must always be mathematically derived from the current time.

Use one fixed deadline in the application code.

Prefer:

```text
October 10, 2026 23:59:59 Asia/Kolkata
```

as the final moment of the countdown so October 10 itself remains part of the countdown day.

If you need to represent the deadline internally, use an unambiguous ISO-compatible representation and avoid browser-dependent date parsing.

---

# 2. THE TIMER MUST BE UNSTOPPABLE

There must be **NO controls**.

Absolutely do not add:

* Pause
* Resume
* Reset
* Start
* Stop
* Settings
* Edit deadline
* Change date
* Speed controls
* Admin controls
* Countdown controls
* Progress controls

The user should simply open the application and see the countdown.

It starts automatically.

It keeps running automatically.

It reaches zero automatically.

There should be no UI mechanism to interfere with it.

The countdown must not depend on localStorage for its actual state.

Do NOT store:

```text
remainingSeconds
remainingMinutes
remainingHours
```

as persistent state.

Always derive the displayed countdown from:

```text
deadline - current timestamp
```

This is important because closing/reopening the application must not reset anything.

---

# 3. WHEN THE COUNTDOWN REACHES ZERO

When the deadline is reached:

```text
00 DAYS
00 HOURS
00 MINUTES
00 SECONDS
```

Keep it at zero.

Do not allow it to become negative.

Do not restart it.

Do not loop it.

Do not create a new countdown.

The timer simply finishes and remains at zero.

---

# 4. DESIGN PHILOSOPHY

The design needs to feel:

* premium
* dark
* mature
* minimal
* slightly cinematic
* editorial
* handcrafted
* restrained
* modern
* calm

It should NOT feel:

* AI-generated
* SaaS dashboard
* crypto website
* gaming UI
* neon cyberpunk
* futuristic spaceship UI
* LGBTQ/pride-themed
* overly colorful
* flashy
* childish
* corporate
* template-generated

The user specifically wants a **simple dark black aesthetic**.

The design should make someone think:

> "This is incredibly simple, but whoever made it cared about the details."

---

# 5. COLOR PALETTE

Base background:

Very dark near-black.

Use something around:

```text
#08090B
#0B0C0F
#0E1013
```

Do not use pure white backgrounds anywhere.

Primary text:

```text
#F2F2F0
```

Secondary text:

```text
#8D9098
```

Muted text:

```text
#555861
```

Accent colors should be extremely restrained.

Use a dark cool blue / violet family:

```text
#263A73
#3949AB
#5146A8
```

Very subtle cyan can be used only for tiny highlights if necessary:

```text
#4FB6C8
```

The overall page must still visually read as:

**BLACK / CHARCOAL first, subtle cool accent second.**

Do not create a rainbow gradient.

Do not use pink + purple + cyan neon simultaneously.

Do not make every element glow.

---

# 6. BACKGROUND

I have supplied a React Bits `GradientWaves` component.

If it integrates cleanly, use it as the subtle animated background.

The supplied component uses:

```jsx
import GradientWaves from './GradientWaves';
```

and depends on:

```text
ogl
```

The supplied version has props such as:

```jsx
<GradientWaves
  horizonColor="#5227FF"
  waveColor="#FF9FFC"
  crestColor="#FFFFFF"
  speed={0.4}
  amplitude={2.5}
  waveScale={0.6}
  waveRatio={0.9}
  swell={35}
  turbulence={20}
  tilt={1.11}
  zoom={1.0}
  height={5.5}
  fogDepth={15}
  detail="medium"
  brightness={1.0}
  opacity={1.0}
  mouseInteraction={true}
  parallaxStrength={0.5}
  grain={true}
  grainIntensity={0.05}
/>
```

The source component and its props are supplied separately.

Use the component if it performs well.

However:

**DO NOT simply paste the default bright purple/pink React Bits aesthetic into the application.**

Instead, adapt the colors to the dark premium design.

For example, use extremely dark blue/violet tones and very low visual intensity.

The waves should feel like a barely-visible atmospheric surface behind the countdown.

The countdown remains the hero.

The background is supporting atmosphere only.

---

# 7. BACKGROUND FALLBACK

If the GradientWaves WebGL effect causes:

* poor mobile performance
* excessive GPU usage
* rendering problems in Android WebView
* visual distraction
* PWA performance problems

then gracefully fall back to a lightweight CSS background.

The fallback should be:

```text
near-black background
+
one extremely subtle radial gradient
+
one very subtle secondary gradient
+
optional film grain
```

Do NOT remove the entire dark aesthetic simply because WebGL is unavailable.

The app must still look premium without WebGL.

Also respect:

```text
prefers-reduced-motion
```

When reduced motion is enabled, disable or significantly reduce the animated background.

---

# 8. PAGE STRUCTURE

Keep the entire application essentially one screen.

No navbar.

No footer.

No sidebar.

No hamburger menu.

No unnecessary sections.

No cards everywhere.

No testimonials.

No feature section.

No "About".

No pricing.

No CTA.

No social links.

No fake product copy.

No unnecessary explanatory paragraphs.

The page should consist approximately of:

```text
------------------------------------------------

                    DAY 052

              OCTOBER 10, 2026

          [  51  ] [  12  ] [  34  ] [  27  ]
            DAYS    HOURS     MINUTES   SECONDS

------------------------------------------------
```

The actual numbers obviously need to be calculated dynamically.

---

# 9. TOP LABEL

At the top-left or top-center, use a very small editorial label.

Something like:

```text
52 DAY COUNTDOWN
```

or:

```text
DAY 052
```

Keep it subtle.

It should not compete with the timer.

Typography should be uppercase, tracked slightly apart, with muted text.

Example:

```text
DAY 052
```

Font size:

Desktop:

```text
12–14px
```

Mobile:

```text
11–12px
```

Letter spacing:

approximately:

```text
0.12em – 0.2em
```

---

# 10. DATE LABEL

Under the small label, display:

```text
OCTOBER 10, 2026
```

This should be visible but understated.

Do not make it enormous.

It establishes what the countdown is counting toward.

---

# 11. MAIN COUNTDOWN

The countdown is the centerpiece.

Display:

```text
DAYS
HOURS
MINUTES
SECONDS
```

with four numeric units.

Desktop layout:

```text
[ DAYS ]    [ HOURS ]    [ MINUTES ]    [ SECONDS ]
```

Mobile layout:

Keep it horizontal if the screen width allows it.

If necessary, use:

```text
[ DAYS ] [ HOURS ]
[ MINUTES ] [ SECONDS ]
```

but prioritize keeping the four values visually coherent.

Do not create giant oversized numbers that break on small screens.

---

# 12. NUMBER FORMAT

Always use two digits for:

```text
hours
minutes
seconds
```

Examples:

```text
03
09
17
42
58
```

Days can be two digits as well.

For example:

```text
52
09
03
00
```

This keeps all four units aligned.

Use tabular/monospaced numerals if the chosen font supports them.

The numbers must not jump horizontally when changing.

---

# 13. TYPOGRAPHY

Typography is extremely important.

Do NOT use the default generic:

```text
Inter
Arial
Roboto
system-ui
```

for everything.

Use a combination of:

### Editorial / print-style font

For labels/headings/date:

Use something with a refined printed/editorial character.

Good candidates:

```text
Libre Baskerville
```

or

```text
Cormorant Garamond
```

or another restrained editorial serif.

Do not make it excessively decorative.

### Countdown font

For the actual numbers, use a clean condensed / technical / print-like font.

A good direction would be:

```text
Barlow Condensed
```

or

```text
Roboto Condensed
```

or a similarly narrow display font.

The number font should feel like:

* old printed scoreboard
* sports statistics
* railway departure board
* analog/digital measurement
* editorial numerals

but still premium.

Avoid futuristic sci-fi fonts.

Avoid gaming fonts.

Avoid overly rounded fonts.

---

# 14. COUNTDOWN ANIMATION — FLIP CALENDAR

This is one of the most important details.

For:

```text
DAYS
HOURS
MINUTES
```

when the number changes, animate it like a **physical flip calendar / mechanical split-flap display**.

Example:

If minutes change:

```text
37
↓
38
```

the number should not simply fade.

Instead:

* old number appears on the upper/lower half
* the digit/card rotates around a horizontal axis
* the new number is revealed underneath
* use realistic perspective
* subtle shadow
* very short duration
* no excessive bounce

The animation should feel physical.

Think:

**old airport split-flap / physical calendar / mechanical scoreboard**

rather than:

**Framer Motion SaaS counter animation.**

---

# 15. FLIP ANIMATION REQUIREMENTS

Use CSS 3D transforms or Framer Motion if already installed.

Do not add a huge animation library just for this.

Animation duration:

approximately:

```text
350–550ms
```

Use a subtle easing curve.

Something similar to:

```text
ease-in-out
```

or a custom cubic-bezier.

The animation should happen ONLY for the unit that changed.

For example:

When seconds go:

```text
29 → 30
```

do not animate days/hours/minutes.

Only seconds change.

When minutes go:

```text
59 → 00
```

animate minutes.

When hours go:

```text
23 → 00
```

animate hours.

When days go:

```text
10 → 09
```

animate days.

---

# 16. SECOND ANIMATION — CRICKET SCOREBOARD

For seconds, use a different animation.

I specifically want the feeling of the **rolling/flip number animation you see on cricket ground scoreboards**.

When:

```text
42
```

becomes:

```text
43
```

the number should quickly roll/slide vertically.

Something like:

```text
42
 ↓
43
```

or an odometer-style vertical movement.

It should be:

* quick
* crisp
* mechanical
* subtle
* readable

Do not make seconds rotate 360 degrees.

Do not make them bounce.

Do not make them flash.

Do not add particles.

Do not make the entire timer move.

Only the seconds value should perform this tiny scoreboard transition every second.

---

# 17. CRITICAL PERFORMANCE REQUIREMENT

The timer must remain accurate even if the animation is skipped.

Do NOT implement the countdown by doing:

```js
seconds--
```

every second.

Instead:

Calculate:

```js
remaining = deadlineTimestamp - Date.now()
```

on every update.

Then derive:

```text
days
hours
minutes
seconds
```

from the remaining milliseconds.

This prevents drift.

If the browser pauses timers in the background, the next render should immediately show the correct remaining value.

This is especially important for:

* Android
* PWA
* mobile browser
* app switching
* screen locking
* background throttling

---

# 18. VISIBILITY / BACKGROUND BEHAVIOR

The application should not attempt to keep an unnecessary JavaScript interval running forever in the background.

When the page is hidden or Android suspends the WebView, the timer can stop rendering.

When it becomes visible again:

```text
recalculate from deadline - Date.now()
```

and immediately display the correct value.

The actual countdown is based on time, not on the number of animation frames or intervals executed.

---

# 19. RESPONSIVE DESIGN

The design must be genuinely responsive.

Do NOT design desktop first and simply shrink everything.

Design carefully for:

### Desktop

Approximately:

```text
1440 × 900
1920 × 1080
1366 × 768
```

The countdown should sit comfortably around the visual center.

### Laptop

Approximately:

```text
1280 × 720
```

Nothing should be cut off vertically.

### Tablet

Support portrait and landscape.

### Mobile

Support:

```text
320px
360px
375px
390px
414px
430px
```

The timer must remain readable.

No horizontal scrolling.

No clipped digits.

No overlapping labels.

No giant text escaping the viewport.

---

# 20. MOBILE LAYOUT

On mobile, reduce:

* font sizes
* gaps
* card widths
* background effect intensity

but preserve the hierarchy.

A good mobile composition:

```text
          DAY 052

      OCTOBER 10, 2026


     51       12
    DAYS     HOURS

     34       27
   MINUTES  SECONDS
```

or a compact horizontal arrangement if it fits naturally.

Do NOT force the desktop layout if it looks cramped.

---

# 21. TIMER VISUAL DESIGN

Do not put the numbers inside giant glowing cards.

Instead use subtle physical-looking number panels.

Possible styling:

```text
background:
rgba(255,255,255,0.025)

border:
1px solid rgba(255,255,255,0.08)

border-radius:
8–12px

box-shadow:
very subtle
```

The panel should almost disappear into the black background.

The numbers themselves provide the visual focus.

No neon outlines.

No rainbow borders.

No excessive glassmorphism.

No giant blur shadows.

No glowing text.

---

# 22. SUBTLE DIVIDERS

Small separators may be used.

For example:

```text
51   :   12   :   34   :   27
```

But don't overdo this.

The labels should make it obvious which number belongs to which unit.

---

# 23. ANIMATIONS OUTSIDE THE TIMER

Keep other animations extremely restrained.

On initial page load:

* very subtle opacity fade
* tiny upward movement
* background slowly appears

Something around:

```text
400–800ms
```

is enough.

Do not animate every element independently.

Do not use:

* scroll-triggered animations
* parallax on text
* text scrambling
* magnetic buttons
* cursor trails
* particle explosions
* floating blobs
* excessive blur animations
* bouncing elements

This is a countdown.

The timer itself is the animation.

---

# 24. MOUSE INTERACTION

If GradientWaves is used, subtle mouse interaction is acceptable.

The background may respond slightly to cursor movement.

However:

The countdown itself must NOT move around following the cursor.

No magnetic effect.

No cursor-following text.

No unnecessary interactive gimmicks.

On touch devices, disable mouse-specific effects.

---

# 25. PWA REQUIREMENTS

Make the website a proper installable PWA.

Implement:

* Web App Manifest
* service worker
* offline app shell
* proper icons
* standalone display mode
* theme color
* background color
* mobile viewport
* Apple/mobile web app metadata where appropriate

The PWA should install cleanly from Chrome on Android.

When installed, it should look like an actual app rather than a browser webpage.

Use:

```text
display: standalone
```

and configure the theme/background consistently with the black design.

The application should still function if the user launches it without internet after the initial installation/cache is available.

The countdown itself does NOT require an internet connection once the app is loaded because it is based on the device clock and fixed deadline.

---

# 26. CAPACITOR AND ANDROID

Integrate Capacitor properly.

The project should remain a normal web application first, with Capacitor as the Android native wrapper.

Use the current Capacitor setup appropriate for the generated project.

Expected architecture:

```text
React web app
      ↓
PWA
      ↓
Capacitor
      ↓
Android
```

Add the Android platform.

The final project should contain the normal Capacitor Android project so it can be opened in Android Studio.

Use the appropriate commands/configuration for:

```text
@capacitor/core
@capacitor/cli
@capacitor/android
```

Do not create a separate Android UI.

The Android app should render the exact same countdown UI as the web application.

---

# 27. ANDROID APP DETAILS

Configure:

* application ID
* app name
* Android theme
* status bar color
* navigation bar color
* splash screen
* launcher icon
* adaptive icon if appropriate

Use the same dark aesthetic.

The Android launch experience should feel intentional.

Avoid a bright white Android splash screen.

Use the dark background and the custom Navratri-inspired icon/mark.

Do not show a default generic Capacitor splash.

---

# 28. STATUS BAR / SYSTEM UI

On Android:

Use a dark status bar.

The system UI should blend into the application.

Avoid:

```text
white status bar
white navigation bar
bright default Android colors
```

The app should feel like one continuous dark surface.

Respect Android safe areas.

---

# 29. FAVICON + APP ICON

Create a custom favicon.

The theme should be **Navratri-inspired**, but sophisticated.

Do NOT create a cartoonish goddess illustration.

Do NOT use a generic religious clipart icon.

Do NOT make a detailed illustration that becomes unreadable at 16×16px.

Create a simple symbolic mark.

Possible direction:

A minimal stylized:

* diya
* circular mandala
* nine-point radial motif
* subtle trishul-inspired geometric form
* abstract Navratri garba/dandiya geometry

I prefer a **minimal geometric diya + radial/mandala motif**.

It should feel:

```text
Indian
festive
elegant
premium
minimal
```

but not loud.

Use the same mark for:

* favicon
* PWA icon
* Android launcher icon
* Android adaptive icon if possible

Use a dark background with a restrained warm accent such as:

```text
muted saffron
deep vermillion
warm gold
```

Do NOT turn the whole website into a Navratri-themed website.

The Navratri reference exists primarily through the icon.

The actual website remains dark and minimal.

---

# 30. ICON DESIGN

The icon needs to remain recognizable at:

```text
16 × 16
32 × 32
48 × 48
180 × 180
512 × 512
```

Therefore:

No tiny text.

No complicated illustration.

No detailed human figure.

No gradients with 20 colors.

No excessive ornamentation.

Use clean geometry.

Generate the required PNG/SVG assets and wire them into:

```text
favicon
manifest icons
Android launcher icon
```

---

# 31. ACCESSIBILITY

Even though this is a visual project, make it properly accessible.

Use:

* semantic HTML
* appropriate contrast
* `aria-label`s for countdown values where useful
* `aria-live="off"` or an appropriate non-annoying strategy so the timer does not cause screen readers to announce every second

Do NOT make the countdown constantly interrupt assistive technology.

Respect:

```text
prefers-reduced-motion
```

When enabled:

* disable flip animations
* disable scoreboard animation
* reduce background animation
* keep the timer completely functional

---

# 32. BROWSER / WEBVIEW COMPATIBILITY

The same application must work in:

* Chrome desktop
* Chrome Android
* Safari mobile where practical
* installed PWA
* Capacitor Android WebView

Avoid browser-specific hacks.

Avoid relying on experimental APIs unless there is a fallback.

Use robust date/time handling.

---

# 33. CODE ARCHITECTURE

Keep the code clean and small.

Do NOT create 50 unnecessary components.

A sensible structure could be:

```text
src/
  components/
    Countdown/
      Countdown.jsx
      CountdownUnit.jsx
      FlipNumber.jsx
      ScoreboardNumber.jsx
    Background/
      GradientWaves.jsx
  hooks/
    useCountdown.js
  utils/
    countdown.js
  App.jsx
  main.jsx
```

The exact structure can differ, but maintain separation between:

* countdown calculation
* visual countdown unit
* animations
* background
* application shell

---

# 34. COUNTDOWN HOOK

Create a clean countdown hook/function.

Conceptually:

```js
const DEADLINE = ...
```

Then:

```js
remaining = Math.max(0, DEADLINE - Date.now())
```

Calculate:

```text
days
hours
minutes
seconds
```

from milliseconds.

Do not decrement individual units independently.

Do not introduce timer drift.

Use one lightweight update mechanism.

A one-second update is sufficient for the visible timer.

---

# 35. IMPORTANT EDGE CASES

Handle:

### Deadline already passed

Display:

```text
00
00
00
00
```

### Exactly one second remaining

Display correctly.

### Minute rollover

```text
12:34:59
→
12:35:00
```

### Hour rollover

```text
11:59:59
→
12:00:00
```

### Day rollover

```text
00 days 00 hours 00 minutes 01 second
→
00 days 00 hours 00 minutes 00 seconds
```

### App backgrounded

When reopened, immediately recalculate from the current timestamp.

### Device sleeps

Same behavior.

### Browser throttles timers

Same behavior.

---

# 36. DESKTOP VISUAL COMPOSITION

For large screens, don't spread the content across the entire screen.

Keep the content in a central visual zone.

Approximately:

```text
              DAY 052

          OCTOBER 10, 2026


     ┌────────┐  ┌────────┐
     │   51   │  │   12   │
     │  DAYS  │  │ HOURS  │
     └────────┘  └────────┘

     ┌────────┐  ┌────────┐
     │   34   │  │   27   │
     │ MINUTES│  │SECONDS │
     └────────┘  └────────┘
```

But on desktop, preferably keep all four units in one horizontal row if it looks balanced:

```text
[ DAYS ]    [ HOURS ]    [ MINUTES ]    [ SECONDS ]
```

Use generous whitespace.

Whitespace is a major part of the design.

---

# 37. VISUAL HIERARCHY

The hierarchy should be:

```text
1. Countdown numbers
2. Countdown unit labels
3. Target date
4. Small "DAY 052" label
5. Background
```

Nothing else should compete.

The background must remain subordinate.

---

# 38. DO NOT ADD THESE THINGS

This is extremely important.

Do NOT add:

* navbar
* hamburger menu
* login
* authentication
* database
* backend
* API
* user accounts
* settings
* analytics UI
* dashboard
* progress bar
* percentage counter
* motivational quotes
* random quotes
* social sharing buttons
* music
* sound effects
* confetti
* particles
* neon glow
* excessive gradients
* glassmorphism
* 3D rotating objects
* testimonials
* cards
* pricing
* footer links
* unnecessary text
* "Made with Lovable"
* "Powered by AI"
* unnecessary buttons

This is intentionally a tiny application.

---

# 39. NO AI-SLOP RULE

The final result must NOT look like something generated from a generic AI website prompt.

Avoid the common AI aesthetic:

```text
huge gradient headline
+
three glass cards
+
glowing buttons
+
purple/blue gradient
+
floating blobs
+
excessive rounded corners
+
"Experience the future"
```

Absolutely not.

Instead:

```text
black
+
beautiful typography
+
one timer
+
subtle atmosphere
+
precise animation
+
excellent spacing
```

That is the entire product.

---

# 40. MOBILE PERFORMANCE

The application is extremely simple, so it should feel instant.

Do not make the background animation consume excessive resources.

If WebGL is active:

* use sensible DPR limits
* avoid unnecessary rerenders
* stop animation when page is hidden where appropriate
* use IntersectionObserver where useful
* clean up WebGL resources properly

The supplied GradientWaves implementation already contains visibility handling and WebGL cleanup logic; preserve that quality rather than rewriting it into a continuously running uncontrolled canvas.

---

# 41. PWA OFFLINE BEHAVIOR

After installation/cache:

The UI should load without network.

The countdown should continue to calculate correctly from the current device timestamp.

The app does not need a backend.

There is no reason for a server request every second.

---

# 42. NO DATABASE

Do not create:

```text
MongoDB
Supabase
Firebase
PostgreSQL
```

or any other database.

This project does not need one.

Everything is derived from one fixed deadline.

---

# 43. NO BACKEND

No backend is required.

No serverless API.

No authentication.

No API routes.

No environment variables unless genuinely required by the build tooling.

---

# 44. BUILD QUALITY

Before considering the implementation complete, verify:

### Countdown

* Correct deadline
* Correct timezone
* Correct day/hour/minute/second calculation
* No drift
* No negative values
* Correct rollover
* Correct behavior after backgrounding

### Desktop

* No overflow
* Balanced spacing
* Countdown centered
* Background visually subtle

### Mobile

* No horizontal scrolling
* Numbers readable
* Labels readable
* Safe areas respected
* Animations remain smooth

### PWA

* Manifest exists
* Icons exist
* Service worker works
* Installable
* Standalone mode works
* Dark theme is consistent

### Android

* Capacitor Android project exists
* Builds successfully
* Opens correctly in Android Studio
* Correct app icon
* Correct splash
* Dark status/navigation bars
* Same UI as web
* No WebView overflow

### Accessibility

* Keyboard navigation where relevant
* Reduced motion supported
* Good contrast
* No screen-reader spam

---

# 45. FINAL VISUAL TARGET

The finished product should feel approximately like this:

Imagine opening the app at night.

The entire screen is nearly black.

There is a barely visible moving atmospheric gradient/wave near the bottom/background.

In the center is an elegant countdown.

The numbers look like physical printed/scoreboard numerals.

Every minute/hour/day transition has a satisfying mechanical flip.

Every second performs a tiny cricket-scoreboard-style roll.

There are no buttons.

There is nothing to click.

Nothing distracts you.

You open it.

You look at the number.

You close it.

That's it.

---

# 46. REFERENCE IMAGE

The supplied reference image shows the general visual direction I am interested in:

* dark background
* large countdown numerals
* individual time units
* restrained neon-like edge illumination
* atmospheric background
* simple composition

However, DO NOT copy the image literally.

Use it only as inspiration for the countdown composition and digit presentation.

The final design should be darker, more restrained, more premium, and less neon.

---

# 47. GRADIENTWAVES IMPLEMENTATION

The supplied `GradientWaves` source should be used if compatible.

The component's dependency is:

```text
ogl
```

Install the dependency if required.

Place the component appropriately in the React project.

Use it behind the UI:

```text
background layer
    ↓
GradientWaves
    ↓
dark overlay / vignette
    ↓
countdown
```

The countdown must always remain readable above it.

If necessary, add a dark semi-transparent overlay such as:

```text
rgba(5, 6, 8, 0.45)
```

or similar.

The exact value should be visually tuned.

---

# 48. BACKGROUND COLOR TUNING

Do NOT use the supplied default:

```text
#5227FF
#FF9FFC
```

at full intensity.

Those colors are too bright for the desired aesthetic.

Instead use something closer to:

```text
horizonColor: deep muted violet/blue
waveColor: deep blue-violet
crestColor: muted cool-white
```

The effect should almost look monochrome from a distance.

If the waves are immediately noticeable when the countdown is visible, reduce their intensity.

The user should notice the timer first.

---

# 49. ICON / FAVICON CREATIVE DIRECTION

Create a minimal Navratri-inspired mark.

One possible concept:

A small geometric diya at the center with nine extremely subtle radial marks around it, creating a miniature mandala.

Another possible concept:

A simplified circular Navratri mandala containing a tiny flame.

The mark should work in a square.

Do not put:

```text
"52"
```

inside the favicon.

Do not put:

```text
"COUNTDOWN"
```

inside it.

Do not use tiny text.

---

# 50. PROJECT NAME

Use a simple project/app name.

Prefer something understated, for example:

```text
Day 052
```

or:

```text
52
```

or:

```text
Until October
```

Do not use a generic startup name.

The title can simply be:

```text
Day 052 — Countdown
```

Use your judgment to select the most elegant one.

---

# 51. DOCUMENT TITLE

Set the browser title appropriately.

For example:

```text
Day 052 — October 10, 2026
```

It should dynamically update only if useful, but do not make the title change every second.

Static title is perfectly fine.

---

# 52. FINAL REQUIREMENT

Do not stop after generating the UI.

Actually implement:

1. React UI
2. Countdown logic
3. Flip animation
4. Cricket-scoreboard seconds animation
5. Responsive desktop/mobile layout
6. GradientWaves background if viable
7. PWA
8. Manifest
9. Service worker
10. Favicon
11. PWA icons
12. Capacitor
13. Android platform
14. Android app icon
15. Android splash
16. Android system UI styling

Then test the project.

Fix any:

* TypeScript/JavaScript errors
* build errors
* missing imports
* PWA manifest errors
* responsive overflow
* animation glitches
* Capacitor configuration errors
* Android build issues

Do not leave TODO placeholders.

Do not give me a mockup.

Build the actual working application.

---

# FINAL DESIGN PRINCIPLE

**Less, but better.**

This is not supposed to demonstrate how many technologies can be used.

It is supposed to demonstrate how good a very simple interface can feel when:

* typography is right
* spacing is right
* animation is right
* countdown logic is accurate
* mobile behavior is polished
* PWA behavior is correct
* Android packaging is correct
* background atmosphere is subtle

Keep the product brutally simple.

The countdown is the product.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8c3b7ed5-34d7-45a0-a36e-3d12675290b6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
