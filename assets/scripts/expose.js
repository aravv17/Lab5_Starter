// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.querySelector('#horn-select');
  const hornImg = document.querySelector('#expose > img');
  const audio = document.querySelector('#expose audio');
  const slider = document.querySelector('#volume');
  const volumeImg = document.querySelector('#volume-controls > img');
  const playBtn = document.querySelector('#expose button');
  const jsConfetti = new JSConfetti();

  hornSelect.addEventListener('change', () => {
    const value = hornSelect.value;
    hornImg.src = `assets/images/${value}.svg`;
    hornImg.alt = value;
    audio.src = `assets/audio/${value}.mp3`;
  });

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
}