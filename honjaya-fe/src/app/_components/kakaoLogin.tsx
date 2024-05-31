// KakaoLogin.client.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const KakaoLogin = () => {
    const router = useRouter();
    const Rest_api_key = process.env.NEXT_PUBLIC_REST_API_KEY!;
    const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI!;
    const kakaoCallbackUrl = process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URL!;

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
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
                        router.push('/main');
                    } else {
                        console.error('Login failed:', data.message);
                        // Optionally update UI here to reflect login failure
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
