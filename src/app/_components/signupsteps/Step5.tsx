"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import StepIndicator from "../../_components/stepIndicator";
import NavigationButtons from './navigationbuttons/NavigationButtons';
import { fetchCurrentUser, registerUserPreferences } from '../../api/api';
import CompleteModal from '@/app/(route)/modal/@modal/complete/page';

interface Step5Props {
    nextStep: () => void;
    prevStep: () => void;
    updateFormData: (data: { location_agreement: boolean }) => void;
    formData: any;
}

const Step5: React.FC<Step5Props> = ({ nextStep, prevStep, updateFormData, formData }) => {
    const [agree, setAgree] = useState(formData?.location_agreement || false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const user = await fetchCurrentUser();
                setCurrentUser(user);
                console.log('Current user:', user);
            } catch (error) {
                console.error('Failed to fetch current user:', error);
            }
        };

        loadCurrentUser();
    }, []);

    const handleAgreeClick = () => {
        const newAgreeState = !agree;
        setAgree(newAgreeState);
        updateFormData({ location_agreement: newAgreeState });
        console.log('Agree state updated:', newAgreeState);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Agree state during submit:', agree);
        console.log('Current user during submit:', currentUser);
        console.log('Form data during submit:', formData);
        if (currentUser === null) {
            alert("사용자의 정보가 더 필요합니다");
        } else if (!agree) {
            alert("위치 정보 제공에 동의해주세요.");
        } else {
            try {
                console.log('Submitting form data:', formData);
                await registerUserPreferences(currentUser.id, formData);
                console.log('Form data submitted successfully');
                setIsModalOpen(true);
            } catch (error) {
                console.error('Failed to register user preferences:', error);
                alert('취향 정보를 등록하는 데 실패했습니다.');
            }
        }
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
                            onClick={handleAgreeClick}
                            className={`py-2 px-6 border-4 rounded-lg text-2xl ${agree ? 'border-red-500 bg-red-300 text-white' : 'border-red-300 bg-white text-black'}`}
                        >
                            {agree ? '동의 완료' : '위치 정보 제공에 동의'}
                        </button>
                    </div>
                    <NavigationButtons onNext={handleSubmit} onPrevious={prevStep} />
                </form>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <CompleteModal />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Step5;
