"use client";

import { useState } from 'react';
import StepIndicator from '../../_components/stepIndicator';
import NavigationButtons from './navigationbuttons/NavigationButtons';

interface Step3Props {
    nextStep: () => void;
    prevStep: () => void;
    updateFormData: (data: { gender: string }) => void;
}

const Step3: React.FC<Step3Props> = ({ nextStep, prevStep, updateFormData }) => {
    const [gender, setGender] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (gender) {
            updateFormData({ gender });
            nextStep();
        } else {
            alert("성별을 선택해주세요.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-lg border-4 border-red-300">
                <StepIndicator currentStep={3} />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className="block text-4xl text-center mb-40">성별은 무엇인가요?</label>
                    <div className="flex justify-center space-x-4">
                        <button
                            type="button"
                            onClick={() => setGender('남성')}
                            className={`py-2 px-6 border-4 rounded-lg text-2xl ${gender === '남성' ? 'border-red-500 bg-red-300 text-white' : 'border-red-300 bg-white text-black'}`}
                        >
                            남성
                        </button>
                        <button
                            type="button"
                            onClick={() => setGender('여성')}
                            className={`py-2 px-6 border-4 rounded-lg text-2xl ${gender === '여성' ? 'border-red-500 bg-red-300 text-white' : 'border-red-300 bg-white text-black'}`}
                        >
                            여성
                        </button>
                    </div>
                    <NavigationButtons onNext={handleSubmit} onPrevious={prevStep} />
                </form>
            </div>
        </div>
    );
}

export default Step3;
