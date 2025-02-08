import { SignUpButton } from '@clerk/nextjs'
import React from 'react'
const Navbar = () => {
    return (
        <div className='flex w-[85%] mx-auto items-center justify-between py-4 '>
            <h2 className='text-blue-700 font-bold text-3xl'>Talk X</h2>
            <div className='font-medium text-lg'>
                Contact Us
            </div>
            <div className='flex items-center justify-center gap-3'>
                <SignUpButton >

                    <button className='bg-blue-700 text-white py-2 px-3   rounded-2xl flex items-center gap-2'>
                        Get Started
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={26}
                            height={26}
                            fill="none"
                            className="injected-svg"
                            color="#fff"
                            data-src="https://cdn.hugeicons.com/icons/arrow-right-02-solid-standard.svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#fff"
                                d="M15.707 6.293a1 1 0 1 0-1.414 1.414L17.586 11H4a1 1 0 1 0 0 2h13.586l-3.293 3.293a1 1 0 0 0 1.414 1.414l4.995-4.995.053-.056a1 1 0 0 0 .245-.653V11.99a.999.999 0 0 0-.293-.697l-5-5Z"
                            />
                        </svg>
                    </button>
                </SignUpButton>

            </div>
        </div>  
    )
}

export default Navbar