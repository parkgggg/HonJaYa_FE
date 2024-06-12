"use client"

import ChatWindow from '@/app/_components/chat/chatWindow';
import { FC, useEffect } from 'react';

interface ChatPageProps {
    params: {
        chatId: string;
    };
}
const ChatPage: FC<ChatPageProps> = ({ params }) => {
    const { chatId } = params;

    useEffect(() => {
        
    })

    return (
        <div className="flex flex-col h-screen">
            <ChatWindow chatId={chatId} isGroupChat={} />
        </div>
    );
};

export default ChatPage;
