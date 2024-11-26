const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

// Helper to create a chat bubble
function createMessage(content, type) {
    const message = document.createElement('div');
    message.classList.add('message', type === 'user' ? 'user-message' : 'gpt-message');
    message.innerHTML = content;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Send user input to the server and display the response
async function sendMessage() {
    const input = userInput.value.trim();
    if (!input) return;

    createMessage(input, 'user'); // Display user message
    userInput.value = ''; // Clear input field

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input })
        });

        const data = await response.json();
        createMessage(data.response, 'gpt'); // Display GPT message
    } catch (error) {
        createMessage('Error: Unable to fetch response.', 'gpt');
    }
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});
