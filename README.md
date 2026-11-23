# A Little Universe Called Isha ✨

> *"Some people make ordinary moments feel a little more beautiful. Today, this little universe is all yours."*

An interactive, multi-scene birthday web experience handcrafted for **Isha's 23rd Birthday** (24 November 2026).

---

## 🎨 Creative & Aesthetic Direction

- **Visual Theme**: Vintage botanical illustrations, delicate graphite pencil sketches, handmade ivory paper textures, celestial constellations, and soft cinematic transitions.
- **Color Palette**:
  - Warm Ivory (`#FFF9F0`)
  - Champagne (`#E9DCCB`)
  - Dusty Rose (`#D9A6A0`)
  - Soft Lavender (`#C9C0E8`)
  - Midnight Blue (`#252641`)
  - Muted Sage (`#A9B7A0`)
- **Typography**: Cormorant Garamond & Playfair Display (Serif), Caveat & Dancing Script (Handwritten), Plus Jakarta Sans (Modern Sans-serif).
- **Tone**: Mature, sweet, respectful, warm, and genuine without emotional pressure or clichéd romantic tropes.

---

## 📖 The 6 Scenes

1. **Scene 1: The Mysterious Envelope**
   - Centered vintage envelope with a 3D crimson-and-gold wax seal embossed with monogram *"I"*.
   - Delicate floating petals and ambient dust particles.
   - Interactive opening animation revealing the milestone letter.
2. **Scene 2: The Birthday Reveal**
   - *"HAPPY 23rd BIRTHDAY, ISHA!"* in shimmering rose gold calligraphy.
   - Milestone 23 with delicate pastel confetti and floating flowers.
   - Thoughtful reflection: *"Today isn't just another date on the calendar. It's a little reminder that the world became a little more interesting 23 years ago."*
3. **Scene 3: A Little Sketch of You**
   - 5 graphite pencil sketches of a gentle fictional girl on deckled ivory paper:
     1. *Portrait*: A Gentle Impression
     2. *Window*: Quiet Afternoons Beside the Sunlit Window
     3. *Flower*: Gentle Grace Holding a Wildflower
     4. *Butterflies*: A Meadow of Butterflies
     5. *Stars*: Gazing at the Constellations
   - Animated pencil drawing reveal and margin notes.
4. **Scene 4: A Few Words for You**
   - Vintage writing stationery with progressive ink reveal.
   - Heartfelt, mature, genuine personal birthday letter.
5. **Scene 5: 23 Wishes for 23**
   - Interactive celestial garden with 23 glowing stars.
   - Unfolds each wish individually with celestial chimes and a progress tracker.
6. **Scene 6: One Last Little Thought**
   - Velvety midnight sky with crescent moon, glowing stars, and peaceful garden.
   - Fictional sketch gazing at the stars.
   - Final warm blessing and optional peaceful "Stargazing Mode".

---

## 🎵 Audio Architecture

- **Procedural Ambient Piano Synthesizer**: Uses the native Web Audio API to synthesize felt-piano chord progressions (Dmaj9 → Bm9 → Gmaj7 → Aadd9) with warm lowpass filtering and delicate sparkle arpeggios.
- **100% Royalty-Free & Autonomous**: Infinite loop, zero network dependencies, zero missing audio issues, works completely offline.
- **Sound Effects**: Interactive chimes on envelope opening and wish reveals.
- **Audio Controls**: Mute toggle, animated equalizer bars, expandable volume slider, and browser autoplay compliance (starts on user interaction).

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/a-little-universe-called-isha.git

# Navigate into project directory
cd a-little-universe-called-isha

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

This compiles optimized static assets into the `dist/` directory.

---

## 🌐 Deployment Instructions

### Option 1: GitHub Pages (Recommended)

1. Create a new GitHub repository named `a-little-universe-called-isha` (or any name you choose).
2. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: A Little Universe Called Isha"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Install `gh-pages` if desired or use GitHub Actions:
   - Go to your repository on GitHub.
   - Navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - Choose the standard "Static HTML / Vite" action, and it will deploy automatically!

### Option 2: Vercel (Instant 1-Click)

1. Push to GitHub.
2. Visit [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects Vite.
4. Click **Deploy**.

### Option 3: Netlify (Drag & Drop or Git)

1. Run `npm run build`.
2. Drag and drop the generated `dist/` folder into Netlify Drop at [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 📱 Responsiveness & Accessibility

- **Mobile First**: Optimized touch targets, swipe-to-turn pages, zero horizontal overflow.
- **Accessibility**: Respects `prefers-reduced-motion` settings.
- **Zero Backend**: Static frontend application with zero external API dependencies or trackers.

---

*Made with a little extra thought, just for you.* 🌸
