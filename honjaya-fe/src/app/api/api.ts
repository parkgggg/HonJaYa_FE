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

// fetchMessages: 특정 채팅방의 메시지를 가져오는 함수 (GET 요청)
export const fetchMessages = async (chatId: string) => {
    const response = await fetch(`/api/chat/${chatId}/messages`);
    return response.json();
};

// sendMessage: 특정 채팅방에 메시지를 전송하는 함수 (POST 요청)
export const sendMessage = async (chatId: string, message: string) => {
    const response = await fetch(`/api/chat/${chatId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });
    return response.json();
};
