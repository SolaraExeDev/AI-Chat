"use client"
import { UserButton, SignedIn } from '@clerk/nextjs'
import React, { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
const Chatroom = () => {
    const [personaldata, setpersonaldata] = useState("")
    const [input, setinput] = useState("")
    useEffect(() => {

        (async function name() {
            let a = await fetch("/api")
            let r = await a.json();
            r ? setpersonaldata(r) : ""
        })()

        return () => {

        }
    }, [])

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
    });

    const generationConfig = {
        temperature: 0,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    async function run() {
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        { text: "Hello\n" },
                    ],
                },
            ],
        });

        const result = await chatSession.sendMessage("hi");
        console.log(result.response.text());
    }
    const handleinputchange = (e) => {
        setinput(e.target.value)
    }
    function User({ name }) {
        return (
            <div className='bg-gray-800 text-white w-fit px-8  rounded-xl flex items-center gap-6 max-w-[88%] leading-7 text-sm relative pb-3 '>
                <div className='absolute left-2 top-2 '>

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
                </div>

                <div>
                    <span className='text-xs'>{personaldata.username}</span>
                    <div className='py-1'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptates, minima, neque officia dicta incidunt, dignissimos aperiam veritatis odio amet quas quia! Nesciunt aspernatur aliquid illum provident vitae dicta recusandae magni voluptates exercitationem. Dicta temporibus ad hic tempore voluptates non suscipit eveniet. Ab voluptatibus sunt laudantium nisi! Saepe quae neque illo enim nulla aspernatur similique accusamus unde modi adipisci! Numquam laborum hic, delectus ea distinctio neque quam! Atque aliquid inventore distinctio, repudiandae rem expedita accusamus odit assumenda? Deleniti aperiam cum excepturi, mollitia deserunt repellat temporibus enim quas fuga eius omnis, quidem voluptas modi necessitatibus optio. Nulla doloremque repellendus aperiam suscipit.
                    </div>
                </div>
            </div>
        );
    }
    function Bot({ name }) {
        return (
            <div className='bg-[#282828] text-white w-fit px-4   rounded-xl flex items-center gap-3 max-w-[87%] relative pt-1 pb-2'>
                <div className='mx-4'>
                    <div className='absolute left-2 top-2'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="none"
                            className="injected-svg"
                            color="#fff"
                            data-src="https://cdn.hugeicons.com/icons/robotic-solid-rounded.svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#fff"
                                d="M9.75 3.5a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z"
                            />
                            <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M12 4.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0V5a.75.75 0 0 1 .75-.75Z"
                                clipRule="evenodd"
                            />
                            <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M13.055 7.25h-2.11c-1.367 0-2.47 0-3.337.117-.9.12-1.658.38-2.26.981-.602.602-.86 1.36-.981 2.26-.117.867-.117 1.97-.117 3.337v2.11c0 1.367 0 2.47.117 3.337.12.9.38 1.658.981 2.26.602.602 1.36.86 2.26.982.867.116 1.97.116 3.337.116h2.11c1.367 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337v-2.11c0-1.367 0-2.47-.116-3.337-.122-.9-.38-1.658-.982-2.26-.602-.602-1.36-.86-2.26-.981-.867-.117-1.97-.117-3.337-.117ZM9.75 13a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0v-1Zm5.25-.75a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75Zm-4.56 4.643a.75.75 0 1 0-.874 1.218c.046.03.141.093.191.12.115.065.274.144.48.221.412.155 1 .298 1.763.298a5.01 5.01 0 0 0 1.763-.298 3.46 3.46 0 0 0 .48-.22c.05-.028.145-.091.191-.121l.016-.011a.75.75 0 0 0-.89-1.207c-.052.03-.195.107-.323.155A3.518 3.518 0 0 1 12 17.25c-.57 0-.982-.107-1.237-.202a2.618 2.618 0 0 1-.323-.155Z"
                                clipRule="evenodd"
                            />
                            <path
                                fill="#fff"
                                d="M3.044 11.346c-.415.08-.808.236-1.135.563-.382.382-.531.853-.597 1.345-.062.459-.062 1.13-.062 1.795s0 1.238.062 1.697c.066.492.215.963.597 1.345.327.328.72.484 1.135.563C3 17.9 3 17.048 3 16.131v-2.262c0-.917 0-1.768.044-2.523ZM20.955 18.654c.415-.08.808-.235 1.135-.563.383-.382.532-.853.598-1.345.061-.459.061-1.032.061-1.696 0-.665 0-1.337-.061-1.796-.066-.491-.215-.963-.598-1.345-.327-.327-.72-.484-1.135-.563.044.755.044 1.607.044 2.523v2.262c0 .917 0 1.768-.044 2.523Z"
                            />
                        </svg>
                    </div>
                    <span className='text-xs pt-2'>Talk X</span>
                    <div className='py-1 text-sm leading-7'>
                        <div className="relative flex items-center justify-center">
                            <div className="text-sm font-medium whitespace-nowrap bg-gradient-to-r from-gray-600 via-white to-gray-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shine_3s_linear_infinite]">
                                Thinking...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    const handleclick = async() => {
        if(input){
            const chatSession = model.startChat({
                generationConfig,
                history: [
                    {
                        role: "user",
                        parts: [
                            { text: "Hello\n" },
                        ],
                    },
                ],
            });
    
            const result = await chatSession.sendMessage("hi");
        }
    }
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
                    <div className='w-5/6 mx-auto mt-10 flex flex-col gap-3 h-[36vh] overflow-y-scroll py-3 m'>
                        {/* <div className='bg-gray-800 text-white w-fit px-8  rounded-xl flex items-center gap-6 max-w-[88%] leading-7 text-sm relative pb-3 '>

                            <div className='absolute left-2 top-2 '>

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
                            </div>

                            <div>
                                <span className='text-xs'>{personaldata.username}</span>
                                <div className='py-1'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptates, minima, neque officia dicta incidunt, dignissimos aperiam veritatis odio amet quas quia! Nesciunt aspernatur aliquid illum provident vitae dicta recusandae magni voluptates exercitationem. Dicta temporibus ad hic tempore voluptates non suscipit eveniet. Ab voluptatibus sunt laudantium nisi! Saepe quae neque illo enim nulla aspernatur similique accusamus unde modi adipisci! Numquam laborum hic, delectus ea distinctio neque quam! Atque aliquid inventore distinctio, repudiandae rem expedita accusamus odit assumenda? Deleniti aperiam cum excepturi, mollitia deserunt repellat temporibus enim quas fuga eius omnis, quidem voluptas modi necessitatibus optio. Nulla doloremque repellendus aperiam suscipit.
                                </div>
                            </div>
                        </div> */}
                        <User />
                        {/* <div className='bg-[#282828] text-white w-fit px-4   rounded-xl flex items-center gap-3 max-w-[87%] relative pt-1 pb-2  '>
                            <div className='mx-4'>
                                <div className='absolute left-2 top-2'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="none"
                                        className="injected-svg"
                                        color="#fff"
                                        data-src="https://cdn.hugeicons.com/icons/robotic-solid-rounded.svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="#fff"
                                            d="M9.75 3.5a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z"
                                        />
                                        <path
                                            fill="#fff"
                                            fillRule="evenodd"
                                            d="M12 4.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0V5a.75.75 0 0 1 .75-.75Z"
                                            clipRule="evenodd"
                                        />
                                        <path
                                            fill="#fff"
                                            fillRule="evenodd"
                                            d="M13.055 7.25h-2.11c-1.367 0-2.47 0-3.337.117-.9.12-1.658.38-2.26.981-.602.602-.86 1.36-.981 2.26-.117.867-.117 1.97-.117 3.337v2.11c0 1.367 0 2.47.117 3.337.12.9.38 1.658.981 2.26.602.602 1.36.86 2.26.982.867.116 1.97.116 3.337.116h2.11c1.367 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337v-2.11c0-1.367 0-2.47-.116-3.337-.122-.9-.38-1.658-.982-2.26-.602-.602-1.36-.86-2.26-.981-.867-.117-1.97-.117-3.337-.117ZM9.75 13a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0v-1Zm5.25-.75a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75Zm-4.56 4.643a.75.75 0 1 0-.874 1.218c.046.03.141.093.191.12.115.065.274.144.48.221.412.155 1 .298 1.763.298a5.01 5.01 0 0 0 1.763-.298 3.46 3.46 0 0 0 .48-.22c.05-.028.145-.091.191-.121l.016-.011a.75.75 0 0 0-.89-1.207c-.052.03-.195.107-.323.155A3.518 3.518 0 0 1 12 17.25c-.57 0-.982-.107-1.237-.202a2.618 2.618 0 0 1-.323-.155Z"
                                            clipRule="evenodd"
                                        />
                                        <path
                                            fill="#fff"
                                            d="M3.044 11.346c-.415.08-.808.236-1.135.563-.382.382-.531.853-.597 1.345-.062.459-.062 1.13-.062 1.795s0 1.238.062 1.697c.066.492.215.963.597 1.345.327.328.72.484 1.135.563C3 17.9 3 17.048 3 16.131v-2.262c0-.917 0-1.768.044-2.523ZM20.955 18.654c.415-.08.808-.235 1.135-.563.383-.382.532-.853.598-1.345.061-.459.061-1.032.061-1.696 0-.665 0-1.337-.061-1.796-.066-.491-.215-.963-.598-1.345-.327-.327-.72-.484-1.135-.563.044.755.044 1.607.044 2.523v2.262c0 .917 0 1.768-.044 2.523Z"
                                        />
                                    </svg>
                                </div>
                                <span className='text-xs pt-2'>Talk X</span>
                                <div className='py-1 text-sm leading-7'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus consectetur architecto suscipit sequi omnis excepturi deserunt consequatur nulla laboriosam voluptate cum eligendi, magni aliquam corrupti, ad a cupiditate in esse perspiciatis quo totam. Mollitia aperiam sapiente hic atque ex reprehenderit porro quas cumque voluptate quis? Fugiat iure aliquid magnam, suscipit ipsam rem reiciendis enim molestiae tempora aut exercitationem iusto cupiditate autem nihil fuga ipsa dolorum? Autem aliquid consequatur ut rem nesciunt deserunt quasi maiores architecto ab id ratione molestias eveniet, omnis facilis quas eaque? Veniam nulla esse voluptas ab illo eveniet, iste voluptates, possimus molestiae neque delectus iusto reprehenderit velit.
                                </div>
                            </div>
                        </div> */}
                        <Bot />


                    </div>

                </div>
                <div className="fixed bottom-2 left-[5%]  overflow-hidden bg-white shadow-xl w-[90%] mx-auto rounded-xl border">
                    <input
                        className="input bg-transparent outline-none border-none pl-6 pr-6 py-4 w-full "
                        placeholder="Ask me anything"
                        name="text"
                        type="text"
                        autoFocus={true}
                        value={input}
                        onChange={handleinputchange}
                    />
                    <div onClick={handleclick} className="absolute right-2 top-[0.4em]">
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