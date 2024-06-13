'use client'

import { postData } from "@/app/api/api";

const MatchingButton = () => {

    const handleClick = async () => {

        try {
            const response = await postData(`/api/match/${localStorage.getItem("user_id")}`, "", "honjaya");
            //지금은 요청해도 상대방이 존재하지 않아 204에러뜸, 2개의 유저로 시뮬레이션하는 방법 모색
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <button
                className=" w-2/10 h-1/2 font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                onClick={handleClick}
            >
            매칭 시작               
            </button>
        </div>
    )
}

export default MatchingButton;