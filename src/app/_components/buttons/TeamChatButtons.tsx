'use client'

import React, { useState } from 'react';
import Image from "next/image";
import TeamCreateModal from "../wait/TeamCreateModal";
import GroupChatCreateModal from "@/app/(route)/modal/@modal/chat/GroupChatCreateModal"; 

type Props = {
    openTeamCreateModal: boolean;
    setOpenTeamCreateModal: () => void;
    createChatRoom: (chatRoom: { chatName: string }) => void;
}

const TeamChatButtons = ({ openTeamCreateModal, setOpenTeamCreateModal, createChatRoom }: Props) => {
    const [openGroupChatCreateModal, setOpenGroupChatCreateModal] = useState(false);

    const toggleGroupChatCreateModal = () => {
        setOpenGroupChatCreateModal(!openGroupChatCreateModal);
    };

    const matchTeam = () => {
        console.log("Matching team..."); // matchTeam 로직을 여기에 추가
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-1/2 h-1/2 flex justify-around items-center">
                <button
                    className="w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                    onClick={setOpenTeamCreateModal}
                >
                    팀 생성
                </button>
                <button
                    className="w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                    onClick={matchTeam}
                >
                    팀 가입
                </button>
                <button
                    className="w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                    onClick={toggleGroupChatCreateModal}
                >
                    채팅방 생성
                </button>
            </div>
            {openTeamCreateModal && <TeamCreateModal setOpenTeamCreateModal={setOpenTeamCreateModal} />}
            {openGroupChatCreateModal && <GroupChatCreateModal setOpenGroupChatCreateModal={toggleGroupChatCreateModal} createChatRoom={createChatRoom} />}
        </div>
    )
}

export default TeamChatButtons;
