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
}