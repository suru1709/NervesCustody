// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resultDiv = document.getElementById('result');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resultDiv.textContent = 'Listening...';
    };

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        resultDiv.textContent = transcript;
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error detected: ', event.error);
        recognition.stop();
    };

    recognition.onend = () => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        if (resultDiv.textContent === 'Listening...') {
            resultDiv.textContent = 'Click "Start Recognition" to try again.';
        }
    };

    startBtn.addEventListener('click', () => {
        recognition.start();
    });

    stopBtn.addEventListener('click', () => {
        recognition.stop();
    });
});
