# Expose Party Horn Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Party Horn interactive UI in `expose.js` — horn selection updates the image and audio source, the volume slider updates the icon and audio volume in real time, and the play button plays the sound (with confetti for the party horn).

**Architecture:** All logic lives flat inside the `init()` function that is already wired to `DOMContentLoaded`. DOM elements are queried once at the top of `init()`, a single `JSConfetti` instance is created and reused, and three inline event listeners handle horn change, volume input, and play click.

**Tech Stack:** Vanilla JavaScript (ES module), Web Audio API (`HTMLAudioElement`), `JSConfetti` (pre-bundled global at `window.JSConfetti`)

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Modify | `assets/scripts/expose.js` | All Party Horn logic |

No other files are touched.

---

### Task 1: Query DOM elements and initialise JSConfetti

**Files:**
- Modify: `assets/scripts/expose.js`

- [ ] **Step 1: Replace the empty `init` body with element queries and JSConfetti setup**

Open `assets/scripts/expose.js` and replace the `init` function with:

```js
// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.querySelector('#horn-select');
  const hornImg = document.querySelector('#expose > img');
  const audio = document.querySelector('audio');
  const slider = document.querySelector('#volume');
  const volumeImg = document.querySelector('#volume-controls img');
  const playBtn = document.querySelector('button');
  const jsConfetti = new JSConfetti();
}
```

- [ ] **Step 2: Open `expose.html` in a browser and open DevTools console**

Verify no errors are logged. `JSConfetti` is a global injected by the non-module `<script>` tag, so `new JSConfetti()` must succeed without import statements.

- [ ] **Step 3: Commit**

```bash
git add assets/scripts/expose.js
git commit -m "feat: query DOM elements and init JSConfetti in expose.js"
```

---

### Task 2: Horn select — update image and audio source on change

**Files:**
- Modify: `assets/scripts/expose.js`

- [ ] **Step 1: Add the `change` listener inside `init`, after the variable declarations**

```js
  hornSelect.addEventListener('change', () => {
    const value = hornSelect.value;          // e.g. "air-horn"
    hornImg.src = `assets/images/${value}.svg`;
    hornImg.alt = value;
    audio.src = `assets/audio/${value}.mp3`;
  });
```

The three horn values in the HTML are `air-horn`, `car-horn`, and `party-horn`. Each has a matching `.svg` in `assets/images/` and `.mp3` in `assets/audio/`.

- [ ] **Step 2: Manually test in the browser**

Open `expose.html`. Select each horn from the dropdown. Confirm:
- The image updates to the correct horn illustration.
- No console errors about missing files.

- [ ] **Step 3: Commit**

```bash
git add assets/scripts/expose.js
git commit -m "feat: update horn image and audio src on dropdown change"
```

---

### Task 3: Volume slider — update icon and audio volume in real time

**Files:**
- Modify: `assets/scripts/expose.js`

- [ ] **Step 1: Add the `input` listener inside `init`, after the horn select listener**

```js
  slider.addEventListener('input', () => {
    const vol = Number(slider.value);   // 0–100

    audio.volume = vol / 100;           // HTMLAudioElement.volume is 0.0–1.0

    let level;
    if (vol === 0)       level = 0;
    else if (vol < 33)   level = 1;
    else if (vol < 67)   level = 2;
    else                 level = 3;

    volumeImg.src = `assets/icons/volume-level-${level}.svg`;
    volumeImg.alt = `Volume level ${level}`;
  });
```

Threshold mapping:
- `0` → level 0 (mute icon)
- `1–32` → level 1
- `33–66` → level 2
- `67–100` → level 3

- [ ] **Step 2: Manually test in the browser**

Select a horn, then drag the volume slider from 0 to 100. Confirm:
- The volume icon updates live as you drag (not just on release).
- At 0 the mute icon shows; at 100 the level-3 icon shows.
- After clicking Play (next task), changing the slider changes the audible volume.

- [ ] **Step 3: Commit**

```bash
git add assets/scripts/expose.js
git commit -m "feat: update volume icon and audio volume on slider input"
```

---

### Task 4: Play button — play sound and trigger confetti for party horn

**Files:**
- Modify: `assets/scripts/expose.js`

- [ ] **Step 1: Add the `click` listener inside `init`, after the slider listener**

```js
  playBtn.addEventListener('click', () => {
    audio.play();
    if (hornSelect.value === 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
```

- [ ] **Step 2: Manually test all three horns**

For each horn:
1. Select it from the dropdown.
2. Adjust the volume slider.
3. Click "Play Sound".
4. Confirm the correct sound plays at the expected volume.
5. For **Party Horn only**: confirm confetti shoots across the screen.
6. For Air Horn and Car Horn: confirm no confetti appears.

- [ ] **Step 3: Verify the volume checkpoint from the lab spec**

The lab warns that a common mistake is updating the icon without actually updating `audio.volume`. Confirm by:
- Setting volume to 0, playing — sound should be silent.
- Setting volume to 100, playing — sound should be at full volume.

- [ ] **Step 4: Commit**

```bash
git add assets/scripts/expose.js
git commit -m "feat: play horn sound on button click, add confetti for party horn"
```

---

## Final State of `expose.js`

```js
// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.querySelector('#horn-select');
  const hornImg = document.querySelector('#expose > img');
  const audio = document.querySelector('audio');
  const slider = document.querySelector('#volume');
  const volumeImg = document.querySelector('#volume-controls img');
  const playBtn = document.querySelector('button');
  const jsConfetti = new JSConfetti();

  hornSelect.addEventListener('change', () => {
    const value = hornSelect.value;
    hornImg.src = `assets/images/${value}.svg`;
    hornImg.alt = value;
    audio.src = `assets/audio/${value}.mp3`;
  });

  slider.addEventListener('input', () => {
    const vol = Number(slider.value);
    audio.volume = vol / 100;
    let level;
    if (vol === 0)       level = 0;
    else if (vol < 33)   level = 1;
    else if (vol < 67)   level = 2;
    else                 level = 3;
    volumeImg.src = `assets/icons/volume-level-${level}.svg`;
    volumeImg.alt = `Volume level ${level}`;
  });

  playBtn.addEventListener('click', () => {
    audio.play();
    if (hornSelect.value === 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
}
```
