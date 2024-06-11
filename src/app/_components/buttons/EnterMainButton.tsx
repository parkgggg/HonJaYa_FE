"use client";

import Link from "next/link";

const EnterMainButton = () => {
    return (
            <div className="flex w-4/5 h-4/5">
                <Link
                    href={"/main"}
                    className="z-10 w-full h-full flex justify-center rounded-sm text-base bg-main-color p-1">
                        채팅방 입장
                </Link>
            </div>
    )
}
export default EnterMainButton;
