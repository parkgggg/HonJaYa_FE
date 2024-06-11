import React, { useEffect, useState } from 'react';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import { fetchMessages, sendMessage, deleteMessage } from '../../api/chatApi';
import { connectWebSocket, sendMessageWebSocket, disconnectWebSocket } from '../../api/websocket';

interface ChatWindowProps {
    chatId: string;
    isGroupChat: boolean;
}

interface Message {
    roomId: string;
    messageId: string;
    content: string;
    isOwnMessage: boolean;
    timestamp: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, isGroupChat }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const loadMessages = async () => {
            const messages = await fetchMessages(chatId);
            setMessages(messages);
        };
        loadMessages();

        const handleNewMessage = (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        if (isGroupChat) {
            const eventSource = new EventSource(`https://your-server.com/sse/chat/${chatId}`);
            eventSource.onmessage = (event) => {
                const message: Message = JSON.parse(event.data);
                handleNewMessage(message);
            };
            return () => {
                eventSource.close();
            };
        } else {
            connectWebSocket(`wss://your-websocket-server.com/chat/${chatId}`, handleNewMessage);
            return () => {
                disconnectWebSocket();
            };
        }
    }, [chatId, isGroupChat]);

    const handleSendMessage = async (message: string) => {
        const newMessage: Message = { roomId: chatId, messageId: `${Date.now()}`, content: message, isOwnMessage: true, timestamp: new Date().toLocaleTimeString() };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (isGroupChat) {
            await sendMessage({ roomId: chatId, content: message });
        } else {
            sendMessageWebSocket(newMessage);
            await sendMessage({ roomId: chatId, content: message });
        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        await deleteMessage(chatId, messageId);
        setMessages((prevMessages) => prevMessages.filter(msg => msg.messageId !== messageId));
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        message={msg.content}
                        isOwnMessage={msg.isOwnMessage}
                        timestamp={msg.timestamp}
                        onDelete={() => handleDeleteMessage(msg.messageId)}
                    />
                ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
