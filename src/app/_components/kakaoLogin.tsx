import React from 'react';

const KakaoLogin = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
    };

    return (
        <>
            <button onClick={handleLogin}>카카오 로그인</button>
        </>
    );
};

export default KakaoLogin;
