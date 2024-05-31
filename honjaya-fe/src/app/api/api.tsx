// src/app/_utils/api.ts
import { FormData } from '@/app/(route)/signup/page';

// API 기본 URL 설정
const baseURL = "http://localhost:8080/api";

// 요청 전에 토큰을 헤더에 추가하는 함수
const setHeaders = () => {
  const token = localStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    "Authorization": ""
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// GET 요청 메서드
export const getData = async (endpoint : any) => {
  try {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: "GET",
      headers: setHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
    throw error;
  }
};

// POST 요청 메서드
export const postData = async ({endpoint, data} : {endpoint: any, data: any}) => {
  try {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: "POST",
      headers: setHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to post data to ${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to post data to ${endpoint}:`, error);
    throw error;
  }
};





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
