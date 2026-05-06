// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const faceImg = document.querySelector('#explore img');
  const textarea = document.querySelector('#text-to-speak');
  const voiceSelect = document.querySelector('#voice-select');
  const talkBtn = document.querySelector('#explore button');
  const utterance = new SpeechSynthesisUtterance();
  let voices = [];

  utterance.onstart = () => { faceImg.src = 'assets/images/smiling-open.png'; };
  utterance.onend = () => { faceImg.src = 'assets/images/smiling.png'; };

  const fillVoices = () => {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '<option value="select" disabled selected>Select Voice:</option>';
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.textContent = voice.name;
      voiceSelect.appendChild(option);
    });
  };

  fillVoices();
  speechSynthesis.addEventListener('voiceschanged', fillVoices, { once: true });

  talkBtn.addEventListener('click', () => {
    if (textarea.value.trim() === '' || voiceSelect.value === 'select') return;
    if (speechSynthesis.speaking) return;

    utterance.text = textarea.value;
    utterance.voice = voices.find(v => v.name === voiceSelect.value);

    speechSynthesis.speak(utterance);
  });
}
