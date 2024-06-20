'use client'

import { useEffect, useState } from "react";
import CustomNumberInput from "../customNum";
import Image from "next/image";
import { getData, postData, putData } from "@/app/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/reducers/rootReducer";
import { exitGroup, joinGroup } from "@/state/actions";

type Props = {
    setOpenTeamEditModal: () => void;
}

const TeamEditModal = ({ setOpenTeamEditModal }: Props) => {
    const [title, setTitle] = useState<string>("")
    const [numOfMembers, setNumoOfMembers] = useState<number>(1);
    const [description, setDescription] = useState<string>("");
    const [myId, setMyId] = useState<string>("");
    const [applicants, setApplicants] = useState<string[]>([]);
    const [isLeader, setIsLeader] = useState<boolean>(false);
    const onGroup = useSelector((state: RootState) => state.onGroup.onGroup)
    const dispatch = useDispatch()

    useEffect(() => {
        const getGroupChatServerUser = async () => {
            try {
                const response = await getData(`/user/${localStorage.getItem('user_id')}`, "groupChat");
                console.log(response);
                setIsLeader(response.leader);
                setApplicants(response.applicants);
                setMyId(response.id);
                // if (response.isParty) {
                //     dispatch(joinGroup())
                // } else {
                //     dispatch(exitGroup())
                // }
            } catch (error) {
                console.log(error);
            }
        }
        getGroupChatServerUser();
    }, []);

    const exitModal = () => {
        setOpenTeamEditModal();
    }

    const handleSelectedApplyer = async (selectedApplyer: string) => {
        try {
            const Data = {
                leaderUserId: myId,
                invitedUserId: selectedApplyer,
            }

            console.log(Data);
            await putData('/group', Data, "groupChat");
            
            // Remove the selected applicant from the applicants list
            setApplicants(prev => prev.filter(applicant => applicant !== selectedApplyer));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="z-20 w-screen h-screen flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
            <form className='z-30 absolute bg-white w-4/10 h-7/10 border-main-color border-4 rounded-lg flex-col justify-around'>
                <div className="w-full h-1/10 flex justify-end box-border p-1">
                    <button
                        type="button"
                        className="w-1/10 h-1/10 bg-gray"
                        onClick={exitModal}>
                        <Image src={'https://www.svgrepo.com/show/499053/cancel.svg'}
                            width={35}
                            height={35}
                            alt="cancel"
                        />
                    </button>
                </div>
                {isLeader ?
                    <div className='w-full h-9/10 flex-col flex justify-around items-center'>
                        <div className='w-8/10 h-7/10 border-2 border-main-color overflow-auto'>
                            {applicants?.map((applyer, index) => (
                                <div className="w-full h-1/10 flex border-2 hover:border-main-color hover:border-2" key={index}>
                                    <div className='w-9/10 h-full flex'>
                                        {applyer}
                                    </div>
                                    <button
                                        type='button'
                                        onClick={() => handleSelectedApplyer(applyer)}
                                        className='w-1/10 h-full text-lg border-main-color bg-main-color'
                                    >
                                        accept
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div> :
                    <>
                        팀 정보
                    </>
                }

            </form>
        </div>
    )
}

export default TeamEditModal;
