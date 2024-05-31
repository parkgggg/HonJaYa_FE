// src/app/_utils/api.ts
import { FormData } from '../(route)/signup/page';

// FormData를 백엔드에 제출하는 함수
export const submitFormData = async (formData: FormData) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Failed to submit data: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Failed to submit data:', error);
        throw error;
    }
};



// 현재 로그인된 사용자 정보를 가져오는 API를 호출하고, 이를 기반으로 사용자 ID를 저장하는 로직
export const fetchCurrentUser = async () => {
    const response = await fetch('/user/current');
    if (!response.ok) {
        throw new Error('Failed to fetch current user');
    }
    return response.json();
};

export const registerUserPreferences = async (userId: string, preferences: any) => {
    const response = await fetch(`/user/${userId}/ideal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
    });
    if (!response.ok) {
        throw new Error('Failed to register user preferences');
    }
    return response.json();
};
