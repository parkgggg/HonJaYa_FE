"use client"
import { useState } from "react";
import StepIndicator from '../../_components/stepIndicator';
import NavigationButtons from './navigationbuttons/NavigationButtons';

interface Step2Props {
    nextStep: () => void;
    prevStep: () => void;
    updateFormData: (data: { birthday: string }) => void;
}

const Step2: React.FC<Step2Props> = ({ nextStep, prevStep, updateFormData }) => {
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!birthday) {
            alert("생일을 입력해주세요.");
            return;
        }
        updateFormData({ birthday });
        nextStep();
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-lg border-4 border-red-300">
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
                        className="text-center text-xl w-full border-b-2 border-black focus:outline-none focus:border-red-400"
                    />
                    <NavigationButtons onNext={handleSubmit} onPrevious={prevStep} />
                </form>
            </div>
        </div>
    );
}

export default Step2;
