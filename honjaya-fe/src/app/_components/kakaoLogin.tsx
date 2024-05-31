"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const KakaoLogin = () => {
    const router = useRouter();
    const Rest_api_key = process.env.NEXT_PUBLIC_REST_API_KEY!;
    const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI!;
    const kakaoCallbackUrl = process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URL!;

    // 카카오 인증 코드 처리
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
            // 인증 코드가 있으면 백엔드로 전달
            fetch(kakaoCallbackUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, redirect_uri }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // 로그인 성공 시 메인 페이지로 이동
                        router.push('/landing');
                    } else {
                        // 로그인 실패 시 에러 처리
                        console.error('Login failed:', data.message);
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }, [router, redirect_uri, kakaoCallbackUrl]);

    const handleLogin = () => {
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
        window.location.href = kakaoURL;
    };

    return (
        <>
            <button onClick={handleLogin}>카카오 로그인</button>
        </>
    );
};

export default KakaoLogin;
