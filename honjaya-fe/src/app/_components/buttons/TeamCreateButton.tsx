'use client'

import Image from "next/image";
import TeamCreateModal from "../wait/TeamCreateModal";

type Props = {
    openTeamCreateModal: boolean; 
    setOpenTeamCreateModal: () => void;
}

const TeamCreateButton = ({ openTeamCreateModal, setOpenTeamCreateModal } : Props) => {

    return (
        <div className="w-full h-full flex justify-center items-center">
            <button
                className="w-1/10 h-5/10 flex justify-center"
                onClick={setOpenTeamCreateModal}>
                <Image src="https://www.svgrepo.com/show/498940/add-circle.svg" width={40} height={40} alt="Team Create Button" />
            </button>
            {openTeamCreateModal && <TeamCreateModal setOpenTeamCreateModal={setOpenTeamCreateModal}/>}
        </div>
    )
}

export default TeamCreateButton;