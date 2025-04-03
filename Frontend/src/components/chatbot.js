import React, { useRef, useState, useEffect } from 'react';

export default function Chatbot() {
    const chatBoxRef = useRef(null);
    const messageInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const [isMinimized, setIsMinimized] = useState(true);
    const [messages, setMessages] = useState([]);
    const [isFileAttached, setIsFileAttached] = useState(false);
    const [fileDetails, setFileDetails] = useState(null);
    const [isVoiceRecording, setIsVoiceRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const botProfilePic = "https://media-hosting.imagekit.io//bb5f0ef1b5a64867/Picture1.png?Expires=1836808651&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=02NoCMIW7-cPdG6~2lGvp4a2rIFo-UZImTNhv~3iyZZ-dzAPf0X6MCNLf1oKts1QIglcxMLVXH1UZGBTgJXk2vnhn4iWzgIm-2HUqaqSzEA55ukyqcFK93pip1HSfsC-hvPSGXsQkSYMrkMFtUK9E-yowlNSlzIJ~y-C2EFZYKoDqGpfnlwiKbD9SZBwnMgJe4edMo14ZqlcmOFoenC1oC1GX9YRP5kIT~Cf3BwK13bAEu6NdStRp~xS3Xu7FJetN-watWhOhdIjk8BW0R42mYCnPtWT1yy5TA~daoC1RbD7gR6DQ3oI-UDeyAvIvi8mG8j9UCuQWOUXTyd8ax3Sbw__";
    const userProfilePic = "https://cdn-icons-png.flaticon.com/512/848/848006.png";

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    const sendMessage = async (textToSend, fileToSend) => {
        if (textToSend || fileToSend) {
            let newMessage = { sender: 'user', text: textToSend, file: fileToSend };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            messageInputRef.current.value = '';
            if (isFileAttached) {
                setIsFileAttached(false);
                setFileDetails(null);
            }

            try {
                const botResponse = await getBotResponse(textToSend, fileToSend);
                if (typeof botResponse === 'string') {
                    setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
                } else if (typeof botResponse === 'object') {
                    // Assuming botResponse is an object with text and potentially file
                    setMessages(prevMessages => [...prevMessages, { sender: 'bot', ...botResponse }]);
                }
            } catch (error) {
                setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Sorry, I encountered an error.' }]);
            }
        }
    };

    const handleSendMessageClick = () => {
        sendMessage(messageInputRef.current.value.trim(), fileDetails);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileDetails({ name: file.name, dataURL: e.target.result, type: file.type });
                setIsFileAttached(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeFile = () => {
        setFileDetails(null);
        setIsFileAttached(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleVoice = async () => {
        if (!isVoiceRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
                setAudioChunks([]);
                recorder.ondataavailable = event => {
                    if (event.data.size > 0) {
                        setAudioChunks(prev => [...prev, event.data]);
                    }
                };
                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    sendMessage('', { name: 'voice-message.webm', dataURL: audioUrl, type: 'audio/webm' });
                    setMediaRecorder(null);
                    setAudioChunks([]);
                };
                recorder.start();
                setIsVoiceRecording(true);
            } catch (error) {
                console.error('Error accessing microphone:', error);
                setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Microphone access denied.' }]);
            }
        } else if (mediaRecorder) {
            mediaRecorder.stop();
            setIsVoiceRecording(false);
        }
    };

    async function getBotResponse(userMessage, attachedFile) {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        try {
            const formData = new FormData();
            formData.append('message', userMessage);
            if (attachedFile) {
                // Convert Data URL to Blob for sending
                const fileBlob = await fetch(attachedFile.dataURL).then(r => r.blob());
                formData.append('file', fileBlob, attachedFile.name);
            }

            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Adjust based on your API response structure
            return data;

        } catch (error) {
            console.error('Error fetching bot response:', error);
            return 'Sorry, I encountered an error.';
        }
    }

    const minimizeChat = () => {
        setIsMinimized(true);
    };

    const maximizeChat = () => {
        setIsMinimized(false);
    };

    const renderFilePreview = () => {
        if (fileDetails) {
            return (
                <div className="file-upload-preview">
                    {fileDetails.type.startsWith('image/') && <img src={fileDetails.dataURL} alt={fileDetails.name} className="file-preview-icon" />}
                    {fileDetails.type === 'application/pdf' && <img src="/pdf-icon.png" alt="PDF File" className="file-preview-icon" />} {/* Replace with your PDF icon path */}
                    {!fileDetails.type.startsWith('image/') && fileDetails.type !== 'application/pdf' && !fileDetails.type.startsWith('audio/') && <img src="/file-icon.png" alt="File" className="file-preview-icon" />} {/* Replace with your generic file icon path */}
                    <p className="file-preview-name">{fileDetails.name}</p>
                    <button className="remove-file-button" onClick={removeFile}>X</button>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chatbot-container">
            {isMinimized ? (
                <div className="chat-circle" onClick={maximizeChat}>
                    <img src={botProfilePic} alt='AgroBot' className='bot-icon-circle' />
                </div>
            ) : (
                <div className="chat-window">
                    <div className="chat-header">
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img src={botProfilePic} alt='AgroBot' className='bot-profile' />
                            <h3 style={{ paddingLeft: '1vw' }}>AgroBot</h3>
                        </div>
                        <button className='minimize-button' type='button' onClick={minimizeChat}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#fff"><path d="M19 13H5v-2h14v2z"/></svg>
                        </button>
                    </div>
                    <div className="chat-box" ref={chatBoxRef}>
                        {messages.map((message, index) => (
                            <div key={index} className={message.sender === 'user' ? 'user-message-container' : 'bot-message-container'}>
                                {message.sender === 'bot' && <img src={botProfilePic} alt="AgroBot" className="bot-profile" />}
                                <div className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
                                    {message.text && <p>{message.text}</p>}
                                    {message.file && (
                                        <div className="file-attachment-container">
                                            <div className="file-attachment">
                                                {message.file.type.startsWith('image/') && (
                                                    <>
                                                        <img src={message.file.dataURL} alt={message.file.name} className="file-image" />
                                                        <p>{message.file.name}</p>
                                                    </>
                                                )}
                                                {message.file.type === 'application/pdf' && (
                                                    <>
                                                        <p>{message.file.name}</p>
                                                        <a href={message.file.dataURL} download={message.file.name}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3">
                                                                <path d="M480-336 288-528l51-51 105 105v-342h72v342l105-105 51 51-192 192ZM263.72-192Q234-192 213-213.15T192-264v-72h72v72h432v-72h72v72q0 29.7-21.16 50.85Q725.68-192 695.96-192H263.72Z"/>
                                                            </svg>
                                                        </a>
                                                    </>
                                                )}
                                                {message.file.type && message.file.type.startsWith('audio/') && (
                                                    <audio controls style={{ display: 'block', width: '30vw' }}>
                                                        <source src={message.file.dataURL} type={message.file.type} />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                )}
                                                {message.file.type && !message.file.type.startsWith('image/') && message.file.type !== 'application/pdf' && !message.file.type.startsWith('audio/') && (
                                                    <>
                                                        <img src="/file-icon.png" alt="File" className="file-icon" /> {/* Replace with your generic file icon path */}
                                                        <a href={message.file.dataURL} download={message.file.name}>{message.file.name}</a>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {message.sender === 'user' && <img src={userProfilePic} alt="Profile" className="profile" />}
                            </div>
                        ))}
                    </div>
                    {renderFilePreview()} {/* Render the preview here, above the input container */}
                    <div className="chat-input-container">
                        <input
                            type="file"
                            id="file-input"
                            accept="image/*, application/pdf, audio/*" // Added audio
                            className="file-input"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <button className="attach-btn" onClick={() => fileInputRef.current.click()}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="4vh" viewBox="0 -960 960 960" width="24px" fill="#fff">
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
                                    handleSendMessageClick();
                                }
                            }}
                        />
                        <button className="voice-btn" onClick={handleVoice}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="4vh" viewBox="0 -960 960 960" width="24px" fill={isVoiceRecording ? 'red' : '#fff'}>
                                <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                            </svg>
                        </button>
                        <button className="send-btn" onClick={handleSendMessageClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="4vh" viewBox="0 -960 960 960" width="24px" fill="#fff">
                                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}