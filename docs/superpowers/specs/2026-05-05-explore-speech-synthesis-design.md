# Explore - Speech Synthesis Design

**Date:** 2026-05-05  
**File:** `assets/scripts/explore.js`

## Overview

Implement the Speech Synthesis UI in `explore.js` using vanilla JavaScript, flat inside a single `init()` function. Uses the browser's `SpeechSynthesis` Web API — no libraries.

## DOM Elements

Queried once at the top of `init()`:

| Variable | Selector | Purpose |
|---|---|---|
| `faceImg` | `#explore img` | Face image (smiling / smiling-open) |
| `textarea` | `#text-to-speak` | Text input for speech |
| `voiceSelect` | `#voice-select` | Voice dropdown |
| `talkBtn` | `#explore button` | "Press to Talk" button |

One `SpeechSynthesisUtterance` instance created once and reused.

## Voice Population

`speechSynthesis.getVoices()` is asynchronous in most browsers — it returns an empty array on first call. Population logic runs in two places:

1. Immediately in `init()` (catches browsers where voices load synchronously)
2. In a `speechSynthesis.addEventListener('voiceschanged', ...)` handler (catches async browsers)

Both places run the same inline logic:
- Clear all options except the default disabled `"Select Voice:"` option
- For each voice from `getVoices()`, append an `<option>` whose `value` is the voice name and whose text content is the voice name

## Play Button — `'click'` listener

Guards (return early if either):
- `textarea.value.trim() === ''`
- `voiceSelect.value === 'select'`

When guards pass:
1. `utterance.text` = `textarea.value`
2. `utterance.voice` = voice object from `getVoices().find(v => v.name === voiceSelect.value)`
3. `utterance.onstart` → `faceImg.src = 'assets/images/smiling-open.png'`
4. `utterance.onend` → `faceImg.src = 'assets/images/smiling.png'`
5. `speechSynthesis.speak(utterance)`

## Constraints

- No HTML/CSS modifications
- Vanilla JS only
- All code inside `explore.js`
- `SpeechSynthesisUtterance` created once and reused
