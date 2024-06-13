'use client'

import { useEffect, useState } from "react";
import Team from "./Team";
import Partner from "./Partner";
import { useSelector } from "react-redux";
import { RootState } from "@/state/reducers/rootReducer";

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
    objects: any;
    prevSlide: () => void;
    nextSlide: () => void;
    currentPage: number;
    objectsPerPage: number;
}

const Containers = ({ objects, prevSlide, nextSlide, currentPage, objectsPerPage }: Props) => {
    const isTeam = useSelector((state: RootState) => state.modeCheck.isTeam)
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [currentObjects, setCurrentObjects] = useState<any[]>([])
    const [placeholders, setPlaceholders] = useState<string[]>([])

    useEffect(() => {
        const startIndex = currentPage * objectsPerPage;
        const currentObjects = objects.slice(startIndex, startIndex + objectsPerPage);
        setCurrentObjects(currentObjects);
        const emptySlots = objectsPerPage - currentObjects.length;
        const placeholders = Array(emptySlots).fill("");
        setPlaceholders(placeholders);
    }, [currentPage, objects, objectsPerPage])

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
                    <div key={`placeholder-${index}`} className="w-1/5 h-2/5 mx-5 py-4 bg-gray-200 box-border shadow-lg rounded-lg"></div>
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
