"use client";

import { useState } from 'react';
import StepIndicator from '../../_components/stepIndicator';

export default function Step3({ nextStep, prevStep, updateFormData }) {
    const [gender, setGender] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        updateFormData({ gender });
        nextStep(); // 다음 스텝으로 이동
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-lg border-4 border-red-300">
                {/* 스텝 인디케이터 */}
                <StepIndicator currentStep={3} />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className="block text-4xl text-center mb-40">성별은 무엇인가요?</label>
                    <div className="flex justify-center space-x-4">
                        <button
                            type="button"
                            onClick={() => setGender('남성')}
                            className={`py-2 px-6 border-4 rounded-lg text-2xl text-black bg-white ${gender === '남성' ? 'border-red-500' : 'border-red-300'}`}
                        >
                            남성
                        </button>
                        <button
                            type="button"
                            onClick={() => setGender('여성')}
                            className={`py-2 px-6 border-4 rounded-lg text-2xl text-black bg-white ${gender === '여성' ? 'border-red-500' : 'border-red-300'}`}
                        >
                            여성
                        </button>
                    </div>
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
