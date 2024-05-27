"use client";

import Link from "next/link";

const KakaoLoginButton = () => {
    // const Rest_api_key = process.env.NEXT_PUBLIC_REST_API_KEY; // 보안 목적
    // const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    // oauth 요청 URL
    // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

    const handleLogin = () => {
        //배포 주소로 추후 변경
        if (typeof window !== 'undefined') {
            window.location.href = "http://localhost:8080/api/oauth2/authorization/kakao";
        }
    }

    return (
        <div className="flex w-4/5 h-4/5">
            {/* <button
                    className="z-10 w-full flex h-full rounded-sm text-base bg-yellow-300 p-1"
                    onClick={handleLogin}>
                    <div
                        className="w-1/4 h-full bg-kakao-logo bg-auto bg-no-repeat bg-center bg-yellow-300"
                    >
                    </div>
                    <div className="w-3/4 h-full ">
                        카카오 로그인
                    </div>
                </button> */}
            <Link
                href="http://localhost:8080/api/oauth2/authorization/kakao"
                className="z-10 w-full flex h-full rounded-sm text-base bg-yellow-300 p-1">
                <div
                    className="w-1/4 h-full bg-kakao-logo bg-auto bg-no-repeat bg-center bg-yellow-300"
                >
                </div>
                <div className="w-3/4 h-full flex justify-center items-center">
                    카카오 로그인
                </div>
            </Link>
        </div>
    )
}
export default KakaoLoginButton;
