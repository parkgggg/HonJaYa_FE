// src/components/ChatInput.tsx
import React, { useState } from 'react';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex p-2 border-t border-gray-300">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow p-2 border rounded-lg"
                placeholder="메시지를 입력하세요..."
            />
            <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                전송
            </button>
        </form>
    );
};

export default ChatInput;
