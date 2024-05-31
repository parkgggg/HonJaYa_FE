'use client'

import { useState } from 'react';
import Link from 'next/link';

const Navigationbar = () => {
    const [open, setOpen] = useState(false);

    const handleHovering = () => {
        setOpen((prevState) => {return !prevState});
    };

    return (
        <div style={{ height: "10%" }} className="flex w-full items-center justify-between text-lg bg-main-color">
            <div className='relative w-1/12 h-full overflow-hidden'>
                <img src='./logo1.png' className="w-auto h-full" alt="로고1" />
            </div>
            <div
                className='relative flex font-light text-white items-center justify-center w-1/12 h-full hover:underline'
                onMouseEnter={handleHovering}
                onMouseLeave={handleHovering}
            >
                Menu
                <div
                    className={`z-20 absolute top-full w-48 shadow transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                >
                    <ul className='list-none flex-col text-center justify-center items-center m-0 p-0 text-white'>
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
            <div className='relative flex font-light text-white items-center justify-center w-1/12 h-full hover:underline'>
                <Link href="/mypage">My page</Link>
            </div>
        </div>
    );
}

export default Navigationbar;
