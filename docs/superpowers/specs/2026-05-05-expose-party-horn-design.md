# Expose - Party Horn Design

**Date:** 2026-05-05  
**File:** `assets/scripts/expose.js`

## Overview

Implement the Party Horn interactive UI in `expose.js` using vanilla JavaScript inside a single `init()` function. No external libraries beyond the pre-included `js-confetti.browser.js`.

## DOM Elements

Queried once at the top of `init()`:

| Variable | Selector | Purpose |
|---|---|---|
| `hornSelect` | `#horn-select` | Horn dropdown |
| `hornImg` | `#expose img` (first img) | Horn image display |
| `audio` | `audio` | Audio element |
| `slider` | `#volume` | Volume range input |
| `volumeImg` | `#volume-controls img` | Volume icon display |
| `playBtn` | `button` | Play Sound button |

`jsConfetti` — instantiated once via `new JSConfetti()`.

## Event Listeners

### Horn Select — `'change'`

- `hornImg.src` → `assets/images/<value>.svg`
- `hornImg.alt` → descriptive alt text for the selected horn
- `audio.src` → `assets/audio/<value>.mp3`

### Volume Slider — `'input'`

- `audio.volume` → `slider.value / 100`
- `volumeImg.src` based on thresholds:
  - `value == 0` → `volume-level-0.svg`
  - `1 <= value < 33` → `volume-level-1.svg`
  - `33 <= value < 67` → `volume-level-2.svg`
  - `67 <= value <= 100` → `volume-level-3.svg`

### Play Button — `'click'`

- Call `audio.play()`
- If `hornSelect.value === 'party-horn'`, call `jsConfetti.addConfetti()`

## Constraints

- No HTML/CSS modifications
- Vanilla JS only
- All code inside `expose.js`
- `JSConfetti` instance created once and reused
