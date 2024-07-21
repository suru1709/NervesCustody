// scripts.js
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    displayMessage('User', userInput);
    document.getElementById('user-input').value = '';

    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
            prompt: `User: ${userInput}\nChatbot:`,
            max_tokens: 150,
            n: 1,
            stop: ['\n', ' User:', ' Chatbot:'],
            temperature: 0.9,
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].text.trim();
    displayMessage('Chatbot', botMessage);
}

function displayMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender.toLowerCase());
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
