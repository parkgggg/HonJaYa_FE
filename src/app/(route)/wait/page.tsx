'use client'

import MatchingButton from "@/app/_components/buttons/MatchingButton";
import FilterModal from "@/app/_components/common/FilterModal";
import Navigationbar from "@/app/_components/common/Navigationbar";
import Containers from "@/app/_components/wait/Containers";

import ToggleSwitch from "@/app/_components/buttons/ToggleSwitch";
import Image from "next/image";
import TeamChatButtons from "@/app/_components/buttons/TeamChatButtons";
//이미지 배열((매칭됨 && 시간 유효한 유저)들의 이미지 정보 배열)은 추후 fetching
//얘를 
import { useDispatch, useSelector } from "react-redux";
import { approve, setTeamMode, setSingleMode } from "@/state/actions";
import { RootState } from "@/state/reducers/rootReducer";
import { verifyUser } from "@/app/utils/verifyUser";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getData } from "@/app/api/api";

const WaitingRoom = () => {
    const [objects, setObjects] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [objectsPerPage, setObjectsPerPage] = useState<number>(8);
    const [open, setOpen] = useState<boolean>(false)
    const [openTeamCreateModal, setOpenTeamCreateModal] = useState<boolean>(false)

    const dispatch = useDispatch();
    const isTeam = useSelector((state: RootState) => state.modeCheck.isTeam)
    const isMatchingModalOpened = useSelector((state: RootState) => state.matchingStatusModal.isOpened)
    const isLogined = useSelector((state: RootState) => state.loginCheck.isLogined)
    const router = useRouter();
    const prevState = useRef(isMatchingModalOpened);

    useEffect(() => {

        if (!isLogined) {
            if (verifyUser()) {
                dispatch(approve());
            } else {
                router.push("/")
            }
        }
        if (typeof window !== 'undefined') {
            //창 크기에 따라 동적으로 렌더링할 이미지 수 변경(반응형으로 구현)  

            //BlockPerPage로 바꿔서 팀 대기창에서도 재사용 가능하게 바꾸자. 
            //1)1대1 대기 페이지=>블록에 이미지 넣기(이미지 정보 fetch)
            //2)다대다 페이지 => 지금 속한 팀 정보 fetch해서 데이터 렌더링 (팀 채팅은 24시간 연장 x or 팀 대기 창에서 팀 선택하면 팀 별 대기창을 따로?(1대1 대기 페이지 처럼))
            const updateobjectsPerPage = () => {
                if (window.matchMedia("(min-width: 1024px)").matches) {
                    setObjectsPerPage(8);
                } else if (window.matchMedia("(min-width: 370px)").matches) {
                    setObjectsPerPage(6);
                } else {
                    setObjectsPerPage(4);
                }
            };

            updateobjectsPerPage();
            window.addEventListener("resize", updateobjectsPerPage);
            return () => window.removeEventListener("resize", updateobjectsPerPage);
        }

    }, []);

    useEffect(() => {
        const getObjects = async () => {
            try {
                const response = await getData(`/chat/rooms/${localStorage.getItem("user_id")}`, "honjaya");
                console.log(response);
                const objects = response;
                setObjects(() => (objects))
            } catch (e) {
                console.log(e);
            }
        }
        getObjects();
    }, [isMatchingModalOpened])

    // useEffect(() => {
    //     if (prevState.current === true && isMatchingModalOpened === false) {
    //         console.log("Matching success and re-rendering proceed")
    //     }
    //     prevState.current = isMatchingModalOpened;
    // }, [isMatchingModalOpened])


    const nextSlide = () => {
        if ((currentPage + 1) * objectsPerPage < images.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevSlide = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const setFilterOpen = () => {
        const newState = !open;
        setOpen(newState);
    }

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
                {/* 매칭되어 있는 유저 리스팅 */}
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
                            setOpenTeamCreateModal={() => { setOpenTeamCreateModal((prev) => (!prev)) }} /> : <MatchingButton />}
                </div>
            </div>
        </div>
    );
};

export default WaitingRoom;


