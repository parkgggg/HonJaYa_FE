// src/components/ChatMessage.tsx
"use client"
import React from 'react';

interface ChatMessageProps {
    message: string;
    isOwnMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 m-2 rounded-lg ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {message}
            </div>
        </div>
    );
};

export default ChatMessage;
