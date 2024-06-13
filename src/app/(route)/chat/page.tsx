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

    // isGroupChat 값을 설정. 예시로 false로 설정
    const isGroupChat = true; // 일단, test용(그룹채팅)

    return (
        <div className="flex flex-col h-screen">
            <ChatWindow chatId={chatId} isGroupChat={isGroupChat} />
        </div>
    );
};

export default ChatPage;
