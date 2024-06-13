'use client'

import { useState } from 'react';
import Link from 'next/link';
import { postData } from '@/app/api/api';
import { useRouter } from 'next/navigation';

const Navigationbar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [myPageOpen, setMyPageOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleMenuHovering = () => {
        setMenuOpen((prevState) => { return !prevState });
    };

    const handleMyPageHovering = () => {
        setMyPageOpen((prevState) => { return !prevState });
    };

    // const handleLogout = async () => {
    //     try {
    //         console.log(localStorage.getItem('user_id'));
    //         const response = await postData("/logout", '','honjaya');
    //         console.log(response);

    //         localStorage.removeItem('access_token');
    //         localStorage.removeItem('user_id');
    //         router.replace('/');
    //     } catch (err) {
    //         console.log(err);
    //     }

    // };


    return (
        <div className="flex w-full h-1/10 items-center justify-between text-lg bg-main-color">
            <div className='relative w-1/12 h-full overflow-hidden'>
                <div className="flex-col animate-slide">
                    <img src='./logo1.png' className="w-auto" alt="로고1" />
                    <img src='./logo2.png' className="w-auto" alt="로고2" />
                    <img src='./logo1.png' className="w-auto" alt="로고1_for_loop" />
                    <img src='./logo2.png' className="w-auto" alt="로고2_for_loop" />
                </div>
            </div>
            <div
                className='relative flex font-light text-white items-center justify-center w-1/12 h-full hover:underline'
                onMouseEnter={handleMenuHovering}
                onMouseLeave={handleMenuHovering}
            >
                Menu
                <div
                    className={`z-20 absolute top-full w-48 shadow transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                >
                    <ul className='-none flex-col text-center justify-center items-center m-0 p-0 text-white'>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <Link href="/landing">Home</Link>
                        </li>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <Link href="/wait">Chat</Link>
                        </li>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <Link href="/shop">Shop</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* <div
                className='relative flex font-light text-white items-center justify-center w-1/12 h-full hover:underline'
                onMouseEnter={handleMyPageHovering}
                onMouseLeave={handleMyPageHovering}
            >
                My page
                <div
                    className={`z-20 absolute top-full w-48 shadow transition-all duration-300 ${myPageOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                >
                    <ul className='list-none flex-col text-center justify-center items-center m-0 p-0 text-white'>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <Link href="/mypage">Edit</Link>
                        </li>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div> */}
            <div className='relative flex font-light text-white items-center justify-center w-1/12 h-full hover:underline'>
                <Link href="/mypage">My page</Link>
            </div>
        </div>
    );
}

export default Navigationbar;
