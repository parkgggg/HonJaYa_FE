"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import StepIndicator from "../../_components/stepIndicator";
import NavigationButtons from './navigationbuttons/NavigationButtons';
import { fetchCurrentUser, registerUserPreferences } from '../../api/api';

interface Step5Props {
    nextStep: () => void;
    prevStep: () => void;
    updateFormData: (data: { location_agreement: boolean }) => void;
    formData: any; // FormData 인터페이스에 맞게 설정 필요
}

export default function Step5({ nextStep, prevStep, updateFormData, formData }: Step5Props) {
    const [agree, setAgree] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null); // 사용자 정보 상태 추가
    const router = useRouter();

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const user = await fetchCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Failed to fetch current user:', error);
            }
        };

        loadCurrentUser();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (agree && currentUser) {
            updateFormData({ location_agreement: agree });

            try {
                await registerUserPreferences(currentUser.id, formData);
                setIsModalOpen(true);
            } catch (error) {
                console.error('Failed to register user preferences:', error);
                alert('취향 정보를 등록하는 데 실패했습니다.');
            }
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
                    <NavigationButtons onNext={handleSubmit} onPrevious={prevStep} />
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
