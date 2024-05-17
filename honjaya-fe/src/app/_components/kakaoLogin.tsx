"use client";

const KakaoLogin = () => {
    const Rest_api_key = process.env.NEXT_PUBLIC_REST_API_KEY; // 보안 목적
    const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = () => {
        window.location.href = kakaoURL
    }
    return (
        <>
            <button onClick={handleLogin}>카카오 로그인</button>
        </>
    )
}
export default KakaoLogin
