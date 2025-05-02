
/* chatbot.js - Initializes and manages the AntBuddy chat widget */
document.addEventListener('DOMContentLoaded', () => {
  // Ensure AntBuddy is loaded
  if (window.AntBuddy && window.AntBuddy.config) {
    const { token, inbox, lang, title, subtitle, primaryColor, greeting, awayMessage } = window.AntBuddy.config;

    // Initialize AntBuddy widget
    const initChat = () => {
      const chatButton = document.querySelector('.AntBuddy-toggleButton');
      if (chatButton) {
        chatButton.addEventListener('click', () => {
          const chatWindow = document.querySelector('.AntBuddy-chatWindowContainer');
          chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
        });
      }
    };

    // Load AntBuddy widget script dynamically
    const script = document.createElement('script');
    script.src = 'https://chat-sdk-omni.shinhan.com.vn/widget.js';
    script.async = true;
    script.onload = initChat;
    document.body.appendChild(script);

    // Update chat styles based on config
    const style = document.createElement('style');
    style.textContent = `
      .AntBuddy-toggleButton {
        background-color: ${primaryColor} !important;
        border-radius: 50%;
        width: 70px;
        height: 70px;
      }
      .AntBuddy-chatWindowContainer {
        background-color: #fff;
        border: 1px solid #e4e5e6;
        border-radius: 10px;
      }
    `;
    document.head.appendChild(style);

    // Log greeting for debugging
    console.log(`AntBuddy initialized with greeting: ${greeting}`);
  } else {
    console.error('AntBuddy configuration not found.');
  }
});
