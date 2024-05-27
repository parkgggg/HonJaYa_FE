// 웹소켓 연결 컴포넌트

import React, { useEffect, useState } from 'react';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import { fetchMessages, sendMessage } from '../../api/api';
import { connectWebSocket, sendMessageWebSocket, disconnectWebSocket } from '../../api/websocket';

interface ChatWindowProps {
    chatId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const loadMessages = async () => {
            const messages = await fetchMessages(chatId);
            setMessages(messages);
        };
        loadMessages();

        const handleNewMessage = (message: any) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        // 웹소켓 URL을 생성하여 연결하는 부분
        // chatId : 특정 채팅방 식별
        connectWebSocket(`wss://your-websocket-server.com/chat/${chatId}`, handleNewMessage);

        return () => {
            disconnectWebSocket();
        };
    }, [chatId]);

    const handleSendMessage = async (message: string) => {
        const newMessage = { chatId, content: message, isOwnMessage: true, timestamp: new Date().toLocaleTimeString() };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        sendMessageWebSocket(newMessage);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg.content} isOwnMessage={msg.isOwnMessage} timestamp={msg.timestamp} />
                ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;