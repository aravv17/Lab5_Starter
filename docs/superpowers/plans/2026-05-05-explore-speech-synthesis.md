# Explore Speech Synthesis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Speech Synthesis UI in `explore.js` — populate a voice dropdown on load, speak textarea text on button click, and swap the face image to open-mouthed while speaking.

**Architecture:** All logic lives flat inside the `init()` function wired to `DOMContentLoaded`. DOM elements queried once at top of `init()`. Voice population extracted into a `const fillVoices` arrow inside `init()` and called both immediately and on `voiceschanged` (browsers load voices asynchronously). One `SpeechSynthesisUtterance` reused across clicks.

**Tech Stack:** Vanilla JavaScript (ES module), Web Speech API (`SpeechSynthesis`, `SpeechSynthesisUtterance`)

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Modify | `assets/scripts/explore.js` | All Speech Synthesis logic |

No other files are touched.

---

### Task 1: Query DOM elements and create SpeechSynthesisUtterance

**Files:**
- Modify: `assets/scripts/explore.js`

- [ ] **Step 1: Replace the empty `init` body with element queries and utterance setup**

```js
// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const faceImg = document.querySelector('#explore img');
  const textarea = document.querySelector('#text-to-speak');
  const voiceSelect = document.querySelector('#voice-select');
  const talkBtn = document.querySelector('#explore button');
  const utterance = new SpeechSynthesisUtterance();
}
```

- [ ] **Step 2: Open `explore.html` in a browser and check DevTools console**

Verify no errors. `SpeechSynthesisUtterance` is a built-in browser global — no import needed.

- [ ] **Step 3: Commit**

```bash
git add assets/scripts/explore.js
git commit -m "feat: query DOM elements and create utterance in explore.js"
```

---

### Task 2: Populate voice dropdown on load and on voiceschanged

**Files:**
- Modify: `assets/scripts/explore.js`

- [ ] **Step 1: Add `fillVoices` and wire it to both load and voiceschanged, inside `init()` after the variable declarations**

```js
  const fillVoices = () => {
    voiceSelect.innerHTML = '<option value="select" disabled selected>Select Voice:</option>';
    speechSynthesis.getVoices().forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.textContent = voice.name;
      voiceSelect.appendChild(option);
    });
  };

  fillVoices();
  speechSynthesis.addEventListener('voiceschanged', fillVoices);
```

Why both? `getVoices()` returns an empty array on first call in most browsers — the actual voices arrive asynchronously via `voiceschanged`. Calling `fillVoices()` immediately handles browsers that load voices synchronously (e.g. Firefox); the `voiceschanged` listener handles the rest (e.g. Chrome).

- [ ] **Step 2: Manually test in the browser**

Open `explore.html`. The "Select Voice:" dropdown should populate with available voices within a moment of page load. The number and names will vary by browser and OS.

- [ ] **Step 3: Commit**

```bash
git add assets/scripts/explore.js
git commit -m "feat: populate voice dropdown on load and voiceschanged"
```

---

### Task 3: Play button — speak text and swap face image

**Files:**
- Modify: `assets/scripts/explore.js`

- [ ] **Step 1: Add the `click` listener inside `init()`, after the voiceschanged setup**

```js
  talkBtn.addEventListener('click', () => {
    if (textarea.value.trim() === '' || voiceSelect.value === 'select') return;

    utterance.text = textarea.value;
    utterance.voice = speechSynthesis.getVoices().find(v => v.name === voiceSelect.value);
    utterance.onstart = () => { faceImg.src = 'assets/images/smiling-open.png'; };
    utterance.onend = () => { faceImg.src = 'assets/images/smiling.png'; };

    speechSynthesis.speak(utterance);
  });
```

- [ ] **Step 2: Manually test all paths in the browser**

1. Click "Press to Talk" with empty textarea → nothing should happen.
2. Click "Press to Talk" without selecting a voice → nothing should happen.
3. Type some text, select a voice, click "Press to Talk":
   - The selected text should be spoken aloud.
   - The face should switch to the open-mouthed image (`smiling-open.png`) while speaking.
   - The face should switch back to `smiling.png` when speech finishes.
4. Test with a short phrase and a longer paragraph to verify the face swap works for both.

- [ ] **Step 3: Commit**

```bash
git add assets/scripts/explore.js
git commit -m "feat: speak text on button click and swap face image during speech"
```

---

## Final State of `explore.js`

```js
// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const faceImg = document.querySelector('#explore img');
  const textarea = document.querySelector('#text-to-speak');
  const voiceSelect = document.querySelector('#voice-select');
  const talkBtn = document.querySelector('#explore button');
  const utterance = new SpeechSynthesisUtterance();

  const fillVoices = () => {
    voiceSelect.innerHTML = '<option value="select" disabled selected>Select Voice:</option>';
    speechSynthesis.getVoices().forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.textContent = voice.name;
      voiceSelect.appendChild(option);
    });
  };

  fillVoices();
  speechSynthesis.addEventListener('voiceschanged', fillVoices);

  talkBtn.addEventListener('click', () => {
    if (textarea.value.trim() === '' || voiceSelect.value === 'select') return;

    utterance.text = textarea.value;
    utterance.voice = speechSynthesis.getVoices().find(v => v.name === voiceSelect.value);
    utterance.onstart = () => { faceImg.src = 'assets/images/smiling-open.png'; };
    utterance.onend = () => { faceImg.src = 'assets/images/smiling.png'; };

    speechSynthesis.speak(utterance);
  });
}
```
