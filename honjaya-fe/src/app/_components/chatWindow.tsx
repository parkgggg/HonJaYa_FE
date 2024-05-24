// src/components/ChatWindow.tsx
import React, { useEffect, useState } from 'react';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import { connectWebSocket, sendMessageWebSocket, disconnectWebSocket } from '../utils/websocket';

interface ChatWindowProps {
    chatId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handleNewMessage = (message: any) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        connectWebSocket(`wss://your-websocket-server.com/chat/${chatId}`, handleNewMessage);

        return () => {
            disconnectWebSocket();
        };
    }, [chatId]);

    const handleSendMessage = (message: string) => {
        const newMessage = { chatId, content: message, isOwnMessage: true };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        sendMessageWebSocket(newMessage);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg.content} isOwnMessage={msg.isOwnMessage} />
                ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
