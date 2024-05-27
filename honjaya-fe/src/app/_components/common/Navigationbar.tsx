'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { connect } from 'react-redux';
// import rootReducer from '../reducers/rootReducer';
// import { openMenu, closeMenu } from '../reducers/actions';
// import { RootState } from '../reducers/rootReducer';

// interface clickMenuProps {
//     open: boolean;
//     openMenu: () => void;
//     closeMenu: () => void;
// }

const Navigationbar = () => {
    const [open, setOpen] = useState(false)

    const handleHovering = () => {
        setOpen((prevOpen) => {
            return !prevOpen
        })
    }

    return (
        <div style={{height: "10%"}} className="flex w-full items-center justify-between text-lg bg-main-color">
            <div className='relative w-1/12 h-full overflow-hidden'>
                <div className="flex-col animate-slide">
                    <img src='./logo1.png' className="w-auto" alt="로고1" />
                    <img src='./logo2.png' className="w-auto" alt="로고2" />
                    <img src='./logo1.png' className="w-auto" alt="로고1_for_loop" />
                    <img src='./logo2.png' className="w-auto" alt="로고2_for_loop" />
                </div>
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
                            className=' list-none flex-col text-center justify-center items-center m-0 p-0 text-black'
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

// const mapStateToProps = (state: RootState) => ({
//     open: state.interaction.menuOnNavbar,
// });

// const mapDispatchToProps = {
//     openMenu,
//     closeMenu,
// };


export default Navigationbar;
