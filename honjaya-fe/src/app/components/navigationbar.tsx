import React from 'react'

interface Props {
    title: string;
}

const Navigationbar = () => {
    return (
        <div className="flex w-full items-center justify-between text-lg bg-main-color h-12">
            <div>
                <a
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                </a>
            </div>
            <div>
                asdf
            </div>
            <div>
                ㅁㄴㄹ
            </div>


        </div>
    )
}

export default Navigationbar

