'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navigationbar = () => {
    const [open, setOpen] = useState(false);

    const handleHovering = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <div style={{ height: "10%" }} className="flex w-full items-center justify-between text-lg bg-main-color">
            <div className='relative w-1/12 h-full overflow-hidden'>
                <Image src='/logo1.png' alt="로고1" layout="fill" objectFit="contain" />
            </div>
            <div
                className='relative flex font-light text-white items-center justify-center w-1/12 h-full'
                onMouseEnter={handleHovering}
                onMouseLeave={handleHovering}
            >
                Menu {open && (
                    <div
                        className='z-20 absolute top-full w-48 bg-white shadow animate-fade-in-down'
                    >
                        <ul
                            className='list-none flex-col text-center justify-center items-center m-0 p-0 text-black'
                        >
                            <li className='px-4 py-2 bg-white cursor-pointer'><Link href="/main">Home</Link></li>
                            <li className='px-4 py-2 bg-white cursor-pointer'><Link href="/together">Together</Link></li>
                            <li className='px-4 py-2 bg-white cursor-pointer'><Link href="/shop">Shop</Link></li>
                        </ul>
                    </div>
                )}
            </div>
            <div className='relative flex font-light text-white items-center justify-center w-1/12 h-full'>
                <Link href="/mypage">
                    My page
                </Link>
            </div>
        </div>
    );
}

export default Navigationbar;
