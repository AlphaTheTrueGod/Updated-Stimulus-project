const sendBtn = document.getElementById('send-btn');
const input = document.getElementById('user-input');
const chatHistory = document.getElementById('chat-history');
const typingIndicator = document.getElementById('typing-indicator');
const quickReplies = document.getElementById('quick-replies');

const responses = [
  {
    keywords: ["what is stimulus", "about stimulus", "stimulus.org.in"],
    reply: "Stimulus.org.in is a platform that offers business consulting and professional guidance."
  },
  {
    keywords: ["register", "signup", "sign up", "join"],
    reply: `You can register by visiting our <a href="https://stimulus.org.in/services" target="_blank">Services Page</a>.`
  },
  {
    keywords: ["contact", "email", "phone"],
    reply: `You can reach us at <a "founder@stimulus.org.in">founder@stimulus.org.in</a>`
  },
  {
    keywords: ["services", "help", "offer"],
    reply: "We offer services in Business Consulting, Job Recruitment, and Business Advisory."
  },
  {
    keywords: ["location", "address"],
    reply: "Our main headquarters is located at 601, Dreams Avenue, University Road Kolhapur 416004, Maharashtra"
  }
];

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  displayMessage(text, 'user');
  input.value = '';
  
  showTyping();
  
  setTimeout(() => {
    getBotResponse(text);
  }, 1000); 
}

function displayMessage(message, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.innerHTML = message; 
  chatHistory.appendChild(msgDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function showTyping() {
  typingIndicator.classList.remove('hidden');
}

function hideTyping() {
  typingIndicator.classList.add('hidden');
}

function getBotResponse(userText) {
  hideTyping();
  const text = userText.toLowerCase();
  
  let foundResponse = null;
  
  for (let r of responses) {
    if (r.keywords.some(keyword => text.includes(keyword))) {
      foundResponse = r.reply;
      break;
    }
  }
  
  if (!foundResponse) {
    foundResponse = "Sorry, I don't understand. Try asking about registration, services, locatoin or contact info.";
  }
  
  displayMessage(foundResponse, 'bot');
  updateQuickReplies();
}

function updateQuickReplies() {
  quickReplies.innerHTML = '';
  const suggestions = ["Register", "Contact", "Services", "Location"];
  suggestions.forEach(s => {
    const btn = document.createElement('button');
    btn.classList.add('quick-btn');
    btn.innerText = s;
    btn.addEventListener('click', () => {
      input.value = s;
      sendMessage();
    });
    quickReplies.appendChild(btn);
  });
}