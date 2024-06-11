import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { approve } from '@/state/actions';

const OAuth2RedirectHandler = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = searchParams.get('access_token');

        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
            dispatch(approve());
            router.push('/main/LandingPage'); // 로그인 후 이동할 페이지 경로
        } else {
            router.push('/error'); // 에러 페이지 경로
        }
    }, [router, searchParams, dispatch]);

    return <div>로딩 중...</div>;
};

export default OAuth2RedirectHandler;
