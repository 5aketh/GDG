import React, { useRef } from 'react';

export default function Chatbot() {
    // const 
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
        const file_div = document.getElementById('file-div');
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                file_div.style.display = "flex"
                file_div.innerHTML = `
                    <div style="width: 100%; height;100%; justifyContent: center;">
                        <img src="${event.target.result}" style="height:3vh; width:3vw">
                        &nbsp&nbsp&nbsp
                        <a href="${event.target.result}" download="${file.name}">${file.name}</a>
                    </div>
                `;
                // appendMessage(`<a href="${event.target.result}" download="${file.name}">${file.name}</a>`);
            };

            if (file.type.startsWith('image')) {
                reader.readAsDataURL(file);
            } else {
                reader.readAsDataURL(file);
            }
            fileInputRef.current.value = ''; // Reset file input
        }
    };

    const removeFile = () => {
        alert("hi")
        const file_div = document.getElementById('file-div');
        file_div.innerHTML = ``;
    }

    const appendMessage = (message) => {
        const profile_pic = "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
        const messageElement = document.createElement('div');
        messageElement.style = "align-self: flex-end;"
        messageElement.innerHTML = `
            <div>
                <div style="display: flex; flex-direction: row;">
                    <div class="user-message">${message}</div>&nbsp&nbsp&nbsp
                    <img src=${profile_pic} alt="Profile Picture" class="profile">
                </div>
            </div>
            `;
        chatBoxRef.current.appendChild(messageElement);
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Scroll to bottom
    };

    const appendReply = (message) => {
        const bot_profile_pic = "https://media-hosting.imagekit.io//bb5f0ef1b5a64867/Picture1.png?Expires=1836808651&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=02NoCMIW7-cPdG6~2lGvp4a2rIFo-UZImTNhv~3iyZZ-dzAPf0X6MCNLf1oKts1QIglcxMLVXH1UZGBTgJXk2vnhn4iWzgIm-2HUqaqSzEA55ukyqcFK93pip1HSfsC-hvPSGXsQkSYMrkMFtUK9E-yowlNSlzIJ~y-C2EFZYKoDqGpfnlwiKbD9SZBwnMgJe4edMo14ZqlcmOFoenC1oC1GX9YRP5kIT~Cf3BwK13bAEu6NdStRp~xS3Xu7FJetN-watWhOhdIjk8BW0R42mYCnPtWT1yy5TA~daoC1RbD7gR6DQ3oI-UDeyAvIvi8mG8j9UCuQWOUXTyd8ax3Sbw__"
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `
            <div>
                <div style="display: flex; flex-direction: row;">
                    <img src=${bot_profile_pic} alt="AgroBot" class="bot-profile">
                    &nbsp&nbsp&nbsp<div class="bot-message">${message}</div>
                </div>
            </div>
            `;
        chatBoxRef.current.appendChild(messageElement);
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Scroll to bottom
    };

    const handleVoice = ()=>{
      console.log("voice button clicked");
    }

    async function getBotResponse(userMessage) {
        try {
          const response = await fetch('https://REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/endpoints/ENDPOINT_ID:predict', { // Replace with your API endpoint
            method: 'POST',
            headers: {
                'region': 'asia-south1',
                'endpoint id': '6869665087460737024',
                'project id': 'stellar-market-449618-q6',
            },
            body: JSON.stringify({ message: userMessage }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log(data)
          const botResponse = data; // Assuming your API returns a "response" field
    
          appendReply(botResponse);
        } catch (error) {
          console.error('Error fetching bot response:', error);
          appendReply('Sorry, I encountered an error.');
        }
    }
    
    
    // function getBotResponse(userInput) {
    //     userInput = userInput.toLowerCase();
      
    //     if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
    //       return "Hello there! How can I help you?";
    //     } else if (userInput.includes("how are you")) {
    //       return "As a bot, I don't have feelings, but I'm functioning well!";
    //     } else if (userInput.includes("what is your name")) {
    //       return "I'm a AgroBot, your Agricultural Assistant";
    //     } else if (userInput.includes("bye") || userInput.includes("goodbye")) {
    //       return "Goodbye! Have a great day!";
    //     } else if (userInput.includes("help")) {
    //       return "I can answer general questions. Try asking me something!";
    //     } else if (userInput.includes("time")) {
    //         const now = new Date();
    //         return "The current time is: " + now.toLocaleTimeString();
    //     } else if (userInput.includes("date")) {
    //         const now = new Date();
    //         return "Today's date is: " + now.toLocaleDateString();
    //     } else if (userInput.includes("weather")) {
    //         return "Look at the left side for weather related details.";
    //     }
    //      else if (userInput.includes("search for") || userInput.includes("what is")  || userInput.includes("what are")) {
    //       const searchTerm = userInput.replace("search for", "").trim();
    //       if(searchTerm){
    //         return `I cannot perform actual searches, but you can use a search engine for that.`;
    //       } else {
    //         return "Please specify what you want to search for.";
    //       }
    //     }
    //     else {
    //       return "I'm sorry, I don't understand. Could you please rephrase your question?";
    //     }
    //   }

    function minimize(){
        const stat = document.getElementById("minimize");
        const cont = document.getElementById("content-box");
        const main = document.getElementById("chat-container");
        if (stat.textContent === '-') {
            cont.classList.toggle('minimized');
            stat.textContent = '+';
            main.classList.add("move")
        } else {
            cont.classList.toggle('maximized');
            stat.textContent = '-';
        }
    }

    return (
        <div>
            <div className="chat-container" id="chat-container">
                <div className="chat-header">
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <img src='https://media-hosting.imagekit.io//bb5f0ef1b5a64867/Picture1.png?Expires=1836808651&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=02NoCMIW7-cPdG6~2lGvp4a2rIFo-UZImTNhv~3iyZZ-dzAPf0X6MCNLf1oKts1QIglcxMLVXH1UZGBTgJXk2vnhn4iWzgIm-2HUqaqSzEA55ukyqcFK93pip1HSfsC-hvPSGXsQkSYMrkMFtUK9E-yowlNSlzIJ~y-C2EFZYKoDqGpfnlwiKbD9SZBwnMgJe4edMo14ZqlcmOFoenC1oC1GX9YRP5kIT~Cf3BwK13bAEu6NdStRp~xS3Xu7FJetN-watWhOhdIjk8BW0R42mYCnPtWT1yy5TA~daoC1RbD7gR6DQ3oI-UDeyAvIvi8mG8j9UCuQWOUXTyd8ax3Sbw__' alt='AgroBot' className='bot-profile'></img>
                        <h3 style={{paddingLeft: '1vw'}}>AgroBot</h3>
                        <button className='minimize' type='button' onClick={minimize} id='minimize'>-</button>
                    </div>
                </div>
                <div id='content-box'>
                    <div className="chat-box" ref={chatBoxRef}>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <div id="file-div" style={{ position: 'absolute', top: '-8vh', width: '100%', height: '8vh', background: 'rgba(148, 148, 148, 0.7)', color: 'white', display: 'none', alignItems: 'center', paddingLeft: '3vh'}}>
                            <button style={{width:"auto", backgroundColor:"rgba(177, 177, 177, 0.7)", position:"end"}} onClick={removeFile}>X</button>
                        </div>
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
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3d3e3d">
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
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3d3e3d">
                                    <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                                </svg>
                            </button>

                            <button className="send-btn" onClick={sendMessage}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3d3e3d">
                                    <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
