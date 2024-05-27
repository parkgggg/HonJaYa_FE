"use client"

import React from "react";

// 이 컴포넌트는 클라이언트에서 실행됩니다.
export default function Step1({ nextStep }) {
    // 이벤트를 처리하는 함수
    const handleSubmit = (event) => {
        event.preventDefault();
        nextStep(); // 다음 스텝으로 이동
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-lg border-4 border-red-300">
                {/* 스텝 인디케이터 */}
                <div className="flex justify-center py-2 mb-40">
                    {[1, 2, 3, 4, 5].map((index) => {
                        let borderRadiusClass = "";
                        if (index === 1) {
                            borderRadiusClass = "rounded-l";
                        } else if (index === 5) {
                            borderRadiusClass = "rounded-r";
                        }

                        return (
                            <div
                                key={index}
                                className={`h-2 w-8 mx-1 ${borderRadiusClass} ${index === 1 ? 'bg-red-300' : 'bg-gray-300'}`}
                            ></div>
                        );
                    })}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <label htmlFor="name" className="block text-4xl text-center mb-40">이름이 무엇인가요?</label>
                    <input type="text" id="name" name="name" required
                        className="text-center text-2xl w-full border-b-2 border-black focus:outline-none focus:border-red-400" />
                    <div className="flex justify-center mt-0">
                        <span className="m-0 p-0 text-lg">프로필에 표시되는 이름입니다.</span>
                    </div>
                    <div className="py-2 flex flex-col items-center space-y-4">
                        <button className="text-xl font-bold py-1 px-20 border-red-300 rounded-md shadow-sm text-white bg-gradient-to-br from-red-300 via-red-200 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                            다음
                        </button>
                        <button className="font-bold py-1 px-16 border-gray-600 rounded-md shadow-sm text-sm text-white bg-gradient-to-br from-gray-500 via-gray-300 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-200 cursor-not-allowed" disabled>
                            뒤로
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
