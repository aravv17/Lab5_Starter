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
}