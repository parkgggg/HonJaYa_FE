'use client'

import MatchingButton from "@/app/_components/buttons/MatchingButton";
import FilterModal from "@/app/_components/common/FilterModal";
import Navigationbar from "@/app/_components/common/Navigationbar";
import ImageContainer from "@/app/_components/main/ImageContainer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/reducers/rootReducer";
//이미지 배열((매칭됨 && 시간 유효한 유저)들의 이미지 정보 배열)은 추후 fetching
//얘를 
const images: string[] = ["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

const SingleWaitingRoom = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [imagesPerPage, setImagesPerPage] = useState(8);
    const [open, setOpen] = useState(false)
    const isAuthState = useSelector((state: RootState) => state.authenticationCheck.isAuthed)

    useEffect(() => {

        console.log(isAuthState);
        if (typeof window !== 'undefined') {
            //창 크기에 따라 동적으로 렌더링할 이미지 수 변경(반응형으로 구현)  

            //BlockPerPage로 바꿔서 팀 대기창에서도 재사용 가능하게 바꾸자. 
            //1)1대1 대기 페이지=>블록에 이미지 넣기(이미지 정보 fetch)
            //2)다대다 페이지 => 지금 속한 팀 정보 fetch해서 데이터 렌더링 (팀 채팅은 24시간 연장 x or 팀 대기 창에서 팀 선택하면 팀 별 대기창을 따로?(1대1 대기 페이지 처럼))
            const updateImagesPerPage = () => {
                if (window.matchMedia("(min-width: 1024px)").matches) {
                    setImagesPerPage(8);
                } else if (window.matchMedia("(min-width: 370px)").matches) {
                    setImagesPerPage(6);
                } else {
                    setImagesPerPage(4);
                }
            };

            updateImagesPerPage();
            window.addEventListener("resize", updateImagesPerPage);
            return () => window.removeEventListener("resize", updateImagesPerPage);
        }

    }, []);

    const nextSlide = () => {
        if ((currentPage + 1) * imagesPerPage < images.length) {
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
                <div className="w-full h-1/10 text-3xl font-jua flex items-center justify-between box-border pt-2 px-10">
                    <div className="text-4xl">매칭된 상대</div>
                    <button
                        onClick={setFilterOpen}
                        className={`${open ? 'hidden' : ''} bg-filter w-10 h-full rounded-md bg-cover bg-center`}></button>
                    {open && (
                        <FilterModal setFilterOpen={setFilterOpen} />
                    )}
                </div>
                {/* 매칭되어 있는 유저 리스팅 */}
                <ImageContainer
                    images={images}
                    prevSlide={prevSlide}
                    nextSlide={nextSlide}
                    currentPage={currentPage}
                    imagesPerPage={imagesPerPage}
                />
                <div className="w-full h-2/10">
                    <MatchingButton />
                </div>
            </div>
        </div>
    );
};

export default SingleWaitingRoom;


