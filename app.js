const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

const botReplies = [
    { trigger: ["hi", "hello", "hey"], reply: "Hello there! Ready to chat with your favorite tech buddy?" },
    { trigger: ["how are you", "how’s it going"], reply: "I'm feeling super digital today! How about you?" },
    { trigger: ["help", "assist"], reply: "Of course! Just type in what you need help with and I’ll do my magic ✨" },
    { trigger: ["what’s your name", "who are you"], reply: "I’m Bubbly Bot, designed to make tech talk a little less boring!" },
    { trigger: ["thank you", "thanks"], reply: "Anytime, mate! That’s what I’m here for 🙌" },
    { trigger: ["bye", "goodbye"], reply: "See you soon! Don’t miss me too much 😉" },
    // Default fallback
    { trigger: ["*"], reply: "Hmm, that’s interesting! Could you tell me more?" }
];

chatForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, "user-message");
    botResponse(message.toLowerCase());
    userInput.value = "";
});

function addMessage(text, className) {
    const messageBubble = document.createElement("div");
    messageBubble.classList.add("chat-bubble", className);
    messageBubble.textContent = text;
    chatBox.appendChild(messageBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function botResponse(userMessage) {
    let responseFound = false;

    for (let item of botReplies) {
        if (item.trigger.includes("*")) continue;
        for (let trigger of item.trigger) {
            if (userMessage.includes(trigger)) {
                setTimeout(() => {
                    addMessage(item.reply, "bot-message");
                }, 500);
                responseFound = true;
                return;
            }
        }
    }

    if (!responseFound) {
        const defaultReply = botReplies.find(item => item.trigger.includes("*")).reply;
        setTimeout(() => {
            addMessage(defaultReply, "bot-message");
        }, 500);
    }
}
