"use client";

import { useState } from 'react';
import CustomNumberInput from '../../_components/customNum';
import StepIndicator from '../../_components/stepIndicator';

const mbtiTypes = ['INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'INTJ', 'INTP', 'ENTJ', 'ENTP', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
const religionTypes = ['기독교', '불교', '천주교', '이슬람', '기타', '무교'];
const drinkingTypes = ['알쓰', '평균', '술고래'];

export default function Step4({ nextStep, prevStep, updateFormData }) {
    const [showAllMbti, setShowAllMbti] = useState(false);
    const [selectedMbti, setSelectedMbti] = useState(null);
    const [selectedReligion, setSelectedReligion] = useState(null);
    const [selectedDrinking, setSelectedDrinking] = useState(null);
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(70);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            height,
            weight,
            mbti: selectedMbti,
            religiion: selectedReligion,
            drinking_capacity: selectedDrinking,
        };
        updateFormData(data);
        // 백엔드 전송할 데이터
        nextStep();
    };


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-lg border-4 border-red-300">
                {/* 스텝 인디케이터 */}
                <StepIndicator currentStep={4} />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <label htmlFor="additional-info" className="block text-4xl text-center mb-10">추가 정보</label>

                    {/* 신체 스펙 */}
                    <div className="text-center">
                        <label htmlFor="physical-specs" className="block text-2xl mb-2">신체 스펙</label>
                        <div className="flex justify-center items-center space-x-8">
                            <div className="flex flex-col items-center">
                                <CustomNumberInput
                                    id="height"
                                    name="height"
                                    initialValue={175}
                                    unit="cm"
                                    value={height}
                                    onChange={(e) => setHeight(Number(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <CustomNumberInput
                                    id="weight"
                                    name="weight"
                                    initialValue={80}
                                    unit="kg"
                                    value={weight}
                                    onChange={(e) => setWeight(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* MBTI */}
                    <div className="text-center">
                        <label htmlFor="mbti" className="mt-10 mb-4 block text-2xl">MBTI</label>
                        <div className="grid grid-cols-4 gap-2">
                            {mbtiTypes.slice(0, showAllMbti ? mbtiTypes.length : 4).map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setSelectedMbti(type)}
                                    className={`py-1 px-2 border-2 border-red-300 rounded-2xl text-sm ${selectedMbti === type ? 'bg-red-300 text-white' : 'bg-white text-black'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center mt-2">
                            <button
                                type="button"
                                onClick={() => setShowAllMbti(!showAllMbti)}
                                className="text-sm text-gray-500 focus:outline-none"
                            >
                                {showAllMbti ? '닫기[x]' : '...'}
                            </button>
                        </div>
                    </div>

                    {/* 종교 */}
                    <div className="text-center">
                        <label htmlFor="religion" className="block text-2xl mb-4">종교</label>
                        <div className="grid grid-cols-3 gap-2">
                            {religionTypes.map((religion) => (
                                <button
                                    key={religion}
                                    type="button"
                                    onClick={() => setSelectedReligion(religion)}
                                    className={`py-1 px-2 border-2 border-red-300 rounded-2xl text-sm ${selectedReligion === religion ? 'bg-red-300 text-white' : 'bg-white text-black'}`}
                                >
                                    {religion}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 주량 */}
                    <div className="text-center">
                        <label htmlFor="drinking-capacity" className="block text-2xl mb-4">주량</label>
                        <div className="grid grid-cols-3 gap-2">
                            {drinkingTypes.map((drinking) => (
                                <button
                                    key={drinking}
                                    type="button"
                                    onClick={() => setSelectedDrinking(drinking)}
                                    className={`py-1 px-2 border-2 border-red-300 rounded-2xl text-sm ${selectedDrinking === drinking ? 'bg-red-300 text-white' : 'bg-white text-black'}`}
                                >
                                    {drinking}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="py-2 flex flex-col items-center space-y-4">
                        <button
                            type="submit"
                            className="text-xl font-bold py-1 px-20 border-red-300 rounded-md shadow-sm text-white bg-gradient-to-br from-red-300 via-red-200 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                        >
                            다음
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
        </div>
    );
}
