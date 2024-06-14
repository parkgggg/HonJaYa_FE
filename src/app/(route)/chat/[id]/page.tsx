"use client"

import ChatWindow from '@/app/_components/chat/chatWindow';
import { FC, useEffect } from 'react';

import { useSelector } from "react-redux";
import { RootState } from "@/state/reducers/rootReducer";

interface ChatPageProps {
    params: string
}
const ChatPage: FC<ChatPageProps> = ({ params }) => {
    const isTeam = useSelector((state: RootState) => state.modeCheck.isTeam)

    const roomId  = params;
    return (
        <div className="flex flex-col h-screen">
            <ChatWindow roomId={roomId} isGroupChat={isTeam} />
        </div>
    );
};

export default ChatPage;
