import React, { useRef } from 'react';

export default function Chatbot() {
    const chatBoxRef = useRef(null);
    const messageInputRef = useRef(null);
    const fileInputRef = useRef(null);

    const sendMessage = () => {
        const message = messageInputRef.current.value.trim();
        if (message) {
            appendMessage(message);
            messageInputRef.current.value = '';
            // getBotResponse(message);
        }
        appendReply(getBotResponse(message))
    };

    const handleFile = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                appendMessage(`<a href="${event.target.result}" download="${file.name}">${file.name}</a>`);
            };

            if (file.type.startsWith('image')) {
                reader.readAsDataURL(file);
            } else {
                reader.readAsDataURL(file);
            }
            fileInputRef.current.value = ''; // Reset file input
        }
    };

    const appendMessage = (message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('user-message');
        messageElement.innerHTML = message;
        chatBoxRef.current.appendChild(messageElement);
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Scroll to bottom
    };

    const appendReply = (message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('bot-message');
        messageElement.innerHTML = message;
        chatBoxRef.current.appendChild(messageElement);
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Scroll to bottom
    };

    const handleVoice = ()=>{
      console.log("voice button clicked");
    }

    // async function getBotResponse(userMessage) {
    //     try {
    //       const response = await fetch('YOUR_API_ENDPOINT', { // Replace with your API endpoint
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ message: userMessage }),
    //       });
    
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
    
    //       const data = await response.json();
    //       const botResponse = data.response; // Assuming your API returns a "response" field
    
    //       appendReply(botResponse);
    //     } catch (error) {
    //       console.error('Error fetching bot response:', error);
    //       appendReply('Sorry, I encountered an error.');
    //     }
    // }
    
    
    function getBotResponse(userInput) {
        userInput = userInput.toLowerCase();
      
        if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
          return "Hello there! How can I help you?";
        } else if (userInput.includes("how are you")) {
          return "As a bot, I don't have feelings, but I'm functioning well!";
        } else if (userInput.includes("what is your name")) {
          return "I'm a AgroBot, your Agricultural Assistant";
        } else if (userInput.includes("bye") || userInput.includes("goodbye")) {
          return "Goodbye! Have a great day!";
        } else if (userInput.includes("help")) {
          return "I can answer general questions. Try asking me something!";
        } else if (userInput.includes("time")) {
            const now = new Date();
            return "The current time is: " + now.toLocaleTimeString();
        } else if (userInput.includes("date")) {
            const now = new Date();
            return "Today's date is: " + now.toLocaleDateString();
        } else if (userInput.includes("weather")) {
            return "I can't provide real-time weather information. You can check a weather website or app.";
        }
         else if (userInput.includes("search for") || userInput.includes("what is")  || userInput.includes("what are")) {
          const searchTerm = userInput.replace("search for", "").trim();
          if(searchTerm){
            return `I cannot perform actual searches, but you can use a search engine for that.`;
          } else {
            return "Please specify what you want to search for.";
          }
        }
        else {
          return "I'm sorry, I don't understand. Could you please rephrase your question?";
        }
      }

    return (
        <div className="chat-container" id="chat-container">
            <div className="chat-header">🌾 AgroBot - Your Agricultural Assistant 🌾</div>
            <div className="chat-box" id="chat-box" ref={chatBoxRef}></div>
            <div className="chat-input-container">
                <input
                    type="file"
                    id="file-input"
                    accept="image/*, application/pdf"
                    className="file-input"
                    ref={fileInputRef}
                    onChange={handleFile}
                />

                <button className="attach-btn" onClick={() => fileInputRef.current.click()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z" />
                    </svg>
                </button>

                <input
                    type="text"
                    id="chat-input"
                    className="chat-input"
                    placeholder="Ask AgroBot about crops, pests, weather..."
                    ref={messageInputRef}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />

                <button className="voice-btn" onClick={handleVoice}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                    </svg>
                </button>

                <button className="send-btn" onClick={sendMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}