'use client'

import MatchingButton from "@/app/_components/buttons/MatchingButton";
import FilterModal from "@/app/_components/common/FilterModal";
import Navigationbar from "@/app/_components/common/Navigationbar";
import Containers from "@/app/_components/wait/Containers";
import ToggleSwitch from "@/app/_components/buttons/ToggleSwitch";
import Image from "next/image";
import TeamChatButtons from "@/app/_components/buttons/TeamChatButtons";
import { useDispatch, useSelector } from "react-redux";
import { approve } from "@/state/actions";
import { RootState } from "@/state/reducers/rootReducer";
import { verifyUser } from "@/app/utils/verifyUser";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getData } from "@/app/api/api";

import { createChatRoom } from "@/app/api/chatApi";

const SingleWaitingRoom = () => {
    const [objects, setObjects] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [objectsPerPage, setObjectsPerPage] = useState<number>(8);
    const [open, setOpen] = useState<boolean>(false);
    const [openTeamCreateModal, setOpenTeamCreateModal] = useState<boolean>(false);

    const dispatch = useDispatch();
    const isTeam = useSelector((state: RootState) => state.modeCheck.isTeam);
    const isLogined = useSelector((state: RootState) => state.loginCheck.isLogined);
    const router = useRouter();
    // const prevState = useRef(isMatchingModalOpened);

    useEffect(() => {
        if (!isLogined) {
            if (verifyUser()) {
                dispatch(approve());
            } else {
                router.push("/");
            }
        }

        const updateObjectsPerPage = () => {
            if (window.matchMedia("(min-width: 1024px)").matches) {
                setObjectsPerPage(8);
            } else if (window.matchMedia("(min-width: 370px)").matches) {
                setObjectsPerPage(6);
            } else {
                setObjectsPerPage(4);
            }
        };

        updateObjectsPerPage();
        window.addEventListener("resize", updateObjectsPerPage);
        return () => window.removeEventListener("resize", updateObjectsPerPage);
    }, [isLogined, router, dispatch]);

    useEffect(() => {
        const getObjects = async () => {
            try {
                const response = await getData(`/chat/rooms/${localStorage.getItem("user_id")}`, "honjaya");
                setObjects(response);
            } catch (e) {
                console.error(e);
            }
        };
        getObjects();
    }, []);

    const nextSlide = () => {
        console.log('Next Slide');
        if ((currentPage + 1) * objectsPerPage < objects.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevSlide = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const setFilterOpen = () => {
        setOpen(!open);
    };

    const createChatRoom = (chatRoom: { chatName: string }) => {
        console.log('Creating chat room:', chatRoom);
        // 새로운 채팅방 객체 생성
        const newChatRoom = {
            ...chatRoom,
            id: `chat-${Date.now()}` // 고유 ID 생성
        };
        // objects 배열에 새 채팅방 추가
        setObjects(prevObjects => [...prevObjects, newChatRoom]);
    };

    console.log('Current Page:', currentPage);
    console.log('Objects:', objects);
    console.log('Objects per Page:', objectsPerPage);

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-between bg-white">
            <Navigationbar />
            <div style={{ height: "90%" }} className="w-full overflow-y-auto">
                <div className="w-full h-auto min-h-4"></div>
                <div className="w-full h-1/10 text-3xl font-jua flex items-end justify-around box-border pt-2 px-10">
                    {isTeam ? <div className="flex items-end w-3/10 h-full text-4xl">참여중인 팀</div> : <div className="flex w-3/10 items-end h-full text-4xl">매칭된 상대</div>}
                    <div className="w-3/10 h-full flex justify-center items-center">
                        <Image src="https://www.svgrepo.com/show/436843/person-fill.svg" width={20} height={20} alt="single" />
                        <ToggleSwitch />
                        <Image src="https://www.svgrepo.com/show/436838/person-3-fill.svg" width={20} height={20} alt="team" />
                    </div>
                    <div className="w-3/10 h-full flex justify-end">
                        <button
                            onClick={setFilterOpen}
                            className={`${open ? 'hidden' : ''} bg-filter w-10 h-full rounded-md bg-cover bg-center`}></button>
                        {open && (
                            <FilterModal setFilterOpen={setFilterOpen} />
                        )}
                    </div>
                </div>
                <Containers
                    objects={objects}
                    prevSlide={prevSlide}
                    nextSlide={nextSlide}
                    currentPage={currentPage}
                    objectsPerPage={objectsPerPage}
                />
                <div className="w-full h-2/10">
                    {isTeam ?
                        <TeamChatButtons
                            openTeamCreateModal={openTeamCreateModal}
                            setOpenTeamCreateModal={() => { setOpenTeamCreateModal((prev) => (!prev)) }}
                            createChatRoom={createChatRoom} // 여기에 createChatRoom 전달
                        /> : <MatchingButton />}
                </div>
            </div>
        </div>
    );
};

export default SingleWaitingRoom;
