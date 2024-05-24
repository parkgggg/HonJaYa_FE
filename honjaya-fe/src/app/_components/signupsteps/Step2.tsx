"use client"
import { useState } from "react";
import StepIndicator from '../../_components/stepIndicator';
// 이 컴포넌트는 클라이언트에서 실행됩니다.
export default function Step2({ nextStep, prevStep, updateFormData }) {
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        updateFormData({ birthday });
        nextStep(); // 다음 스텝으로 이동
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-lg border-4 border-red-300">
                {/* 스텝 인디케이터 */}
                <StepIndicator currentStep={2} />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <label htmlFor="birthday" className="block text-4xl text-center mb-40">생일은 언제인가요?</label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        required
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="text-center text-xl w-full border-b-2 border-pink-500 focus:outline-none focus:border-red-400" />
                    <div className="py-2 flex flex-col items-center space-y-4">
                        <button type="submit" className="text-xl font-bold py-1 px-20 border-red-300 rounded-md shadow-sm text-white bg-gradient-to-br from-red-300 via-red-200 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                            다음
                        </button>
                        <button type="button" onClick={prevStep} className="font-bold py-1 px-16 border-gray-600 rounded-md shadow-sm text-sm text-white bg-gradient-to-br from-gray-500 via-gray-300 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-200">
                            뒤로
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
