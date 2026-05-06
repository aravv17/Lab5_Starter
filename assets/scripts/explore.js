// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const faceImg = document.querySelector('#explore img');
  const textarea = document.querySelector('#text-to-speak');
  const voiceSelect = document.querySelector('#voice-select');
  const talkBtn = document.querySelector('#explore button');
  const utterance = new SpeechSynthesisUtterance();
}