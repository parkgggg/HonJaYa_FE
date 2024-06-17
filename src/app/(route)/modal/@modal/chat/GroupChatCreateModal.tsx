'use client'
import {createChatRoom} from "@/app/api/chatApi"
import React, { useState } from "react";

type Props = {
    setOpenGroupChatCreateModal: () => void;
    fetchChatRooms: () => void;
    
}

const GroupChatCreateModal = ({ setOpenGroupChatCreateModal, fetchChatRooms }: Props) => {
    const [chatRoomTitle, setChatRoomTitle] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const newChatRoom = { chatName: chatRoomTitle };
            createChatRoom(newChatRoom).then(() => {
                fetchChatRooms(); // 새로운 채팅방 추가 후 목록 새로고침
                setOpenGroupChatCreateModal(); // 모달 창 닫기
            });
        } catch (error) {
            console.error('Error creating chat room:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg z-60">
                <h2 className="text-2xl mb-4">채팅방 생성</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="채팅방 제목"
                        value={chatRoomTitle}
                        onChange={(e) => setChatRoomTitle(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        생성
                    </button>
                    <button
                        type="button"
                        onClick={setOpenGroupChatCreateModal}
                        className="w-full p-2 mt-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    >
                        닫기
                    </button>
                </form>
            </div>
        </div>
    );
}

export default GroupChatCreateModal;
