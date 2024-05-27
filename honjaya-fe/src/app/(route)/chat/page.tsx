// src/app/(route)/chat/[chatId]/page.tsx
"use client"
import ChatWindow from '../../_components/chat/chatWindow';

const ChatPage = ({ params }) => {
    const { chatId } = params;

    return (
        <div className="flex flex-col h-screen">
            <ChatWindow chatId={chatId} />
        </div>
    );
};

export default ChatPage;
