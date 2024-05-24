"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import StepIndicator from "../../_components/stepIndicator";

export default function Step5({ nextStep, prevStep, updateFormData }) {
    const [agree, setAgree] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (agree) {
            updateFormData({ location_agreement: agree });
            setIsModalOpen(true);
        } else {
            alert("위치 정보 제공에 동의해주세요.");
        }
    };

    const handleGoToSurvey = () => {
        router.push('/survey');
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-lg border-4 border-red-300">
                <StepIndicator currentStep={5} />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className="block text-4xl text-center mb-40">위치 정보 제공</label>
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setAgree(!agree)}
                            className={`py-2 px-6 border-4 rounded-lg text-2xl ${agree ? 'border-red-500 bg-red-300 text-white' : 'border-red-300 bg-white text-black'}`}
                        >
                            {agree ? '동의 완료' : '위치 정보 제공에 동의'}
                        </button>
                    </div>
                    <div className="py-2 flex flex-col items-center space-y-4">
                        <button
                            type="submit"
                            className="text-xl font-bold py-1 px-20 border-red-300 rounded-md shadow-sm text-white bg-gradient-to-br from-red-300 via-red-200 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                        >
                            제출
                        </button>
                        <button
                            type="button"
                            onClick={prevStep}
                            className="font-bold py-1 px-16 border-gray-600 rounded-md shadow-sm text-sm text-white bg-gradient-to-br from-gray-500 via-gray-300 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-200"
                        >
                            뒤로
                        </button>
                    </div>
                </form>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl mb-4">회원 정보 입력이 완료되었습니다.</h2>
                        <button
                            onClick={handleGoToSurvey}
                            className="text-xl font-bold py-1 px-20 border-red-300 rounded-md shadow-sm text-white bg-gradient-to-br from-red-300 via-red-200 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                        >
                            취향 조사하러가기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
