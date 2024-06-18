// 채팅방 목록가져오기를 여기서 한다.
'use client'
import { useEffect, useRef, useState } from "react";
import Team from "./Team";
import Partner from "./Partner";
import { useSelector } from "react-redux";
import { RootState } from "@/state/reducers/rootReducer";
import { useRouter } from 'next/navigation'; // useRouter 추가
import { fetchChatRooms } from "@/app/api/chatApi";

// 타입들 따로 constants나 types 폴더 만들어서 가져와 쓰는 걸로 바꾸자
type personalInfo = {
    username: string;
    profileImage: string;
}

export type partnerInfo = {
    personalInfo: personalInfo;
    remainTime: number;
    roomNum: number;
}

export type teamInfo = {
    members: personalInfo[];
    title: string;
    description: string;
}

// Props 타입 객체
interface Props {
    objects: any[];
    prevSlide: () => void;
    nextSlide: () => void;
    currentPage: number;
    objectsPerPage: number;
}

type ChatRoom = {
    chatName: string;
    roomId: string; // 고유번호 id 추가
    id: string;
}

const Containers = ({ objects, prevSlide, nextSlide, currentPage, objectsPerPage }: Props) => {
    const isTeam = useSelector((state: RootState) => state.modeCheck.isTeam);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [currentObjects, setCurrentObjects] = useState<any[]>([]);
    const [placeholders, setPlaceholders] = useState<string[]>([]);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const router = useRouter(); // useRouter 훅 사용




    // isTeam 속성 바뀌나 체크(추 후 삭제)
    useEffect(() => {
        console.log("isTeam:", isTeam);
    }, [isTeam]);


     // 채팅방 목록 가져오기
     useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchChatRooms();
                setChatRooms(data);
            } catch (error) {
                console.error('Error fetching chat rooms:', error);
            }
        };
    
        fetchData();
    }, []);


    useEffect(() => {
        console.log('currentPage:', currentPage); // currentPage가 제대로 전달되고 있는지 확인
        console.log('Objects:', objects);
        const startIndex = currentPage * objectsPerPage;
        const currentObjects = objects.slice(startIndex, startIndex + objectsPerPage);
        setCurrentObjects(currentObjects);
        const emptySlots = objectsPerPage - currentObjects.length;
        const placeholders = Array(emptySlots).fill("");
        setPlaceholders(placeholders);
    }, [currentPage, objects, objectsPerPage]);


    // 채팅방 클릭했을 때 이동
    const handleChatRoomClick = (roomId: string) => {
        if (roomId) {
            router.push(`/chat/${roomId}`);
        } else {
            console.error('Invalid chat room ID');
        }
    }

    return (
        <div
            className="z-10 w-full h-7/10 flex content-around items-center justify-center relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered &&
                <button onClick={prevSlide} disabled={currentPage === 0} className="w-10 h-1/10 py-2 bg-main-color text-white rounded disabled:bg-gray-300 box-border bg-left-arrow bg-center bg-cover">
                </button>
            }
            <div className="w-9/10 h-full flex flex-wrap items-center justify-center">
                {currentObjects && currentObjects.map((object, index) => (
                    isTeam ? <Team object={object} key={index} /> : <Partner object={object} key={index} />
                ))}
                {placeholders && placeholders.map((_, index) => (
                    <div
                        key={`placeholder-${index}`}
                        className="text-center w-1/5 h-2/5 mx-5 py-4 bg-gray-200 box-border shadow-lg rounded-lg cursor-pointer"
                        onClick={() => handleChatRoomClick(chatRooms[index]?.id)}
                    >
                        {/* 채팅방 이름 */}
                        <p className="font-jua">{chatRooms[index]?.chatName || "Placeholder"}</p>
                        
                        <br />
                        {/* 채팅방 고유번호 : {chatRooms[index]?.roomId || "Placeholder"} */}
                    </div>
                ))}
            </div>
            {isHovered &&
                <button onClick={nextSlide} disabled={(currentPage + 1) * objectsPerPage >= objects.length} className="w-10 h-1/10 py-2 bg-main-color text-white rounded disabled:bg-gray-300 box-border bg-right-arrow bg-center bg-cover">
                </button>
            }
        </div>
    )
}

export default Containers;
