"use client"
import { useState } from "react";
import StepIndicator from '../../_components/stepIndicator';

interface Step1Props {
    nextStep: () => void;
    updateFormData: (data: { name: string }) => void;
}

const Step1: React.FC<Step1Props> = ({ nextStep, updateFormData }) => {
    const [name, setName] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        updateFormData({ name });
        nextStep();
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-lg border-4 border-red-300">
                <StepIndicator currentStep={1} />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label htmlFor="name" className="block text-4xl text-center mb-40">이름이 무엇인가요?</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="여기에 입력하십시오..."
                        className="text-center text-2xl w-full border-b-2 border-pink-500 focus:outline-none focus:border-red-400 placeholder-pink-200"
                    />
                    <div className="flex justify-center mt-0">
                        <span className="m-0 p-0 text-lg">프로필에 표시되는 이름입니다.</span>
                    </div>
                    <div className="py-2 flex flex-col items-center space-y-4">
                        <button type="submit" className="text-xl font-bold py-1 px-20 border-red-300 rounded-md shadow-sm text-white bg-gradient-to-br from-red-300 via-red-200 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                            다음
                        </button>
                        <button type="button" className="font-bold py-1 px-16 border-gray-600 rounded-md shadow-sm text-sm text-white bg-gradient-to-br from-gray-500 via-gray-300 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-200 cursor-not-allowed" disabled>
                            뒤로
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Step1;