"use client"
import { UserButton, SignedIn } from '@clerk/nextjs'
import React, { useState, useEffect } from 'react'
const Chatroom = () => {
    const [personaldata, setpersonaldata] = useState("")
    useEffect(() => {

        (async function name() {
            let a = await fetch("/api")
            let r = await a.json();
            setpersonaldata(r)
        })()

        return () => {

        }
    }, [])

    return (
        <div className='w-full h-[100vh] bg-gradient-to-r from-white to-pink-200'>
            <SignedIn>
                <div className='w-full h-full'>
                    <div className='flex items-center justify-between w-[90%] mx-auto '>
                        <div className='font-bold flex items-center justify-center'>
                            <img src="/logo.webp" className='w-20 h-20 rounded-full' alt="Bot Logo" />
                            <span className='text-lg'>

                                {personaldata.username}
                            </span>
                        </div>
                        <div className='bg-black w-9 h-9 text-center justify-self-center align-bottom rounded-full py-1'>
                            <UserButton />
                        </div>
                    </div>
                    <div className='text-center -mt-16  flex flex-col gap-3 items-center'>
                        <img src="/logo.webp" className='h-24 rounded-full' alt="Bot Logo" />
                        <h1 className='font-extrabold text-4xl text-gray-500'>Hi {personaldata.username} </h1>
                        <h2 className='text-2xl font-bold'>Can I help you anything?</h2>
                        <p className='w-1/2 text-base '>Ready to assist you with anything you need,from answering questions to providing personalized recommendations. Lets get started!</p>
                    </div>
                    <div className='w-5/6 mx-auto mt-10 flex flex-col gap-3 h-[36vh] overflow-y-scroll py-3 '>
                        <div className='bg-gray-800 text-white w-fit px-4  rounded-xl flex items-center gap-6 '>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="none"
                                className="injected-svg"
                                color="#000"
                                data-src="https://cdn.hugeicons.com/icons/user-bulk-rounded.svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="white"
                                    d="M17.806 14.837c.116.07.26.15.423.242.713.402 1.79 1.01 2.528 1.733.462.452.9 1.047.98 1.777.085.776-.253 1.504-.932 2.15-1.172 1.117-2.578 2.011-4.396 2.011H7.591c-1.818 0-3.224-.894-4.396-2.01-.679-.647-1.017-1.375-.932-2.151.08-.73.518-1.325.98-1.777.738-.723 1.815-1.33 2.528-1.733.163-.091.307-.173.423-.242a11.413 11.413 0 0 1 11.612 0Z"
                                />
                                <path
                                    fill="white"
                                    d="M6.75 6.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
                                    opacity={0.4}
                                />
                            </svg>
                            <div className=' '>
                                <span className='text-xs'>{personaldata.username}</span>
                                <div className='py-1'>
                                    hello
                                </div>
                            </div>
                        </div>
                        <div className='bg-[#282828] text-white w-fit pr-4   rounded-xl flex items-center gap-3 max-w-[87%]'>
                            <img className='w-10 h-10 invert' src="/logo.webp" alt="Bot Image" />
                            <div>
                                <span className='text-xs'>Bot</span>
                                <div className='py-1'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus consectetur architecto suscipit sequi omnis excepturi deserunt consequatur nulla laboriosam voluptate cum eligendi, magni aliquam corrupti, ad a cupiditate in esse perspiciatis quo totam. Mollitia aperiam sapiente hic atque ex reprehenderit porro quas cumque voluptate quis? Fugiat iure aliquid magnam, suscipit ipsam rem reiciendis enim molestiae tempora aut exercitationem iusto cupiditate autem nihil fuga ipsa dolorum? Autem aliquid consequatur ut rem nesciunt deserunt quasi maiores architecto ab id ratione molestias eveniet, omnis facilis quas eaque? Veniam nulla esse voluptas ab illo eveniet, iste voluptates, possimus molestiae neque delectus iusto reprehenderit velit.
                                </div>
                            </div>
                        </div>



                    </div>

                </div>
                    <div className="fixed bottom-2 left-[5%]  overflow-hidden bg-white shadow-xl w-[90%] mx-auto rounded-xl border">
                        <input
                            className="input bg-transparent outline-none border-none pl-6 pr-6 py-4 w-full "
                            placeholder="Ask me anything"
                            name="text"
                            type="text"
                            autoFocus={true }
                        />
                        <div className="absolute right-2 top-[0.4em]">
                            <button
                                className="w-11 h-11 rounded-full bg-violet-500 group shadow-xl flex items-center justify-center relative overflow-hidden"
                            >
                                <svg
                                    className="relative z-10"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 64 64"
                                    height="50"
                                    width="50"
                                >
                                    <path
                                        fillOpacity={0.01}
                                        fill="white"
                                        d="M63.6689 29.0491L34.6198 63.6685L0.00043872 34.6194L29.0496 1.67708e-05L63.6689 29.0491Z"
                                    ></path>
                                    <path
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="3.76603"
                                        stroke="white"
                                        d="M42.8496 18.7067L21.0628 44.6712"
                                    ></path>
                                    <path
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="3.76603"
                                        stroke="white"
                                        d="M26.9329 20.0992L42.85 18.7067L44.2426 34.6238"
                                    ></path>
                                </svg>
                                <div
                                    className="w-full h-full rotate-45 absolute left-[32%] top-[32%] bg-black group-hover:-left-[100%] group-hover:-top-[100%] duration-1000"
                                ></div>
                                <div
                                    className="w-full h-full -rotate-45 absolute -left-[32%] -top-[32%] group-hover:left-[100%] group-hover:top-[100%] bg-black duration-1000"
                                ></div>
                            </button>
                        </div>
                    </div>

            </SignedIn>
        </div>
    )
}

export default Chatroom