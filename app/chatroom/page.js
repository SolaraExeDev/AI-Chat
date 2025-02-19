"use client"
import { Client, Account } from 'appwrite';
import React, { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from 'uuid';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { redirect } from 'next/navigation';
const Chatroom = () => {
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);
    const account = new Account(client);
    const [personaldata, setpersonaldata] = useState("")
    const [responseText, setResponseText] = useState(""); // Store the full response
    const [currentIndex, setCurrentIndex] = useState(0);

    const [nonedisplay, setnonedisplay] = useState({
        display: "",
        height: "36vh"
    })
    const [responses, setresponses] = useState({
        user: [],
        bot: []
    })
    const [input, setinput] = useState("")
    useEffect(() => {
        (async function name() {
            let a = await account.get();
            setpersonaldata(a)
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
    useEffect(() => {
        let a = JSON.parse(localStorage.getItem("TalkX"))
        if (a) {
            setresponses(a)
        }
        return () => {

        }
    }, [])

    const handleinputchange = (e) => {
        setinput(e.target.value)
    }
    const handlekeydown = (e) => {
        if (e.key === "Enter") {
            document.querySelector(".button-enter").click()
        }
    }
    function User({ name }) {
        return (
            <div className='bg-gray-800 text-white w-fit px-8  rounded-xl flex items-center gap-6 max-w-[88%] leading-7 text-sm relative  '>
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
                    <span className='text-xs'>{personaldata.name}</span>
                    <div className='py-1'>
                        {name}
                    </div>
                </div>
            </div>
        );
    }
    function Bot({ response }) {
        let truestate = false;
        if (response.props) {
            if (response.props.className.trim() === "relative flex items-center justify-center") {
                truestate = true;
            }
        }
        return (
            <div className=' text-black  w-fit px-4   rounded-xl flex items-center gap-3 max-w-[87%] relative pt-1 pb-2'>
                <div className='mx-4'>
                    <div className='absolute left-2 top-2'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="none"
                            className="injected-svg"
                            color="black"
                            data-src="https://cdn.hugeicons.com/icons/robotic-solid-rounded.svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#fff"
                                d="M9.75 3.5a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z"
                            />
                            <path
                                fill="black"
                                fillRule="evenodd"
                                d="M12 4.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0V5a.75.75 0 0 1 .75-.75Z"
                                clipRule="evenodd"
                            />
                            <path
                                fill="black"
                                fillRule="evenodd"
                                d="M13.055 7.25h-2.11c-1.367 0-2.47 0-3.337.117-.9.12-1.658.38-2.26.981-.602.602-.86 1.36-.981 2.26-.117.867-.117 1.97-.117 3.337v2.11c0 1.367 0 2.47.117 3.337.12.9.38 1.658.981 2.26.602.602 1.36.86 2.26.982.867.116 1.97.116 3.337.116h2.11c1.367 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337v-2.11c0-1.367 0-2.47-.116-3.337-.122-.9-.38-1.658-.982-2.26-.602-.602-1.36-.86-2.26-.981-.867-.117-1.97-.117-3.337-.117ZM9.75 13a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0v-1Zm5.25-.75a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75Zm-4.56 4.643a.75.75 0 1 0-.874 1.218c.046.03.141.093.191.12.115.065.274.144.48.221.412.155 1 .298 1.763.298a5.01 5.01 0 0 0 1.763-.298 3.46 3.46 0 0 0 .48-.22c.05-.028.145-.091.191-.121l.016-.011a.75.75 0 0 0-.89-1.207c-.052.03-.195.107-.323.155A3.518 3.518 0 0 1 12 17.25c-.57 0-.982-.107-1.237-.202a2.618 2.618 0 0 1-.323-.155Z"
                                clipRule="evenodd"
                            />
                            <path
                                fill="black"
                                d="M3.044 11.346c-.415.08-.808.236-1.135.563-.382.382-.531.853-.597 1.345-.062.459-.062 1.13-.062 1.795s0 1.238.062 1.697c.066.492.215.963.597 1.345.327.328.72.484 1.135.563C3 17.9 3 17.048 3 16.131v-2.262c0-.917 0-1.768.044-2.523ZM20.955 18.654c.415-.08.808-.235 1.135-.563.383-.382.532-.853.598-1.345.061-.459.061-1.032.061-1.696 0-.665 0-1.337-.061-1.796-.066-.491-.215-.963-.598-1.345-.327-.327-.72-.484-1.135-.563.044.755.044 1.607.044 2.523v2.262c0 .917 0 1.768-.044 2.523Z"
                            />
                        </svg>
                    </div>
                    <span className='text-xs pt-2'>Talk X</span>
                    <div className='py-1 text-sm leading-7'>
                        {
                            truestate ? response : <Markdown remarkPlugins={[remarkGfm]}>{String(response)}</Markdown>
                        }
                    </div>
                </div>
            </div>
        );
    }

    const handleclick = async () => {
        if (input) {
            document.querySelector(".chats").scrollTop = document.querySelector(".chats").scrollHeight
            setinput("");
            setresponses({
                user: [...responses.user, input], bot: [
                    ...responses.bot,
                    <div key={uuidv4()} className="relative flex items-center justify-center">
                        <div className="text-sm font-medium whitespace-nowrap bg-gradient-to-r from-gray-900 via-white to-black bg-[length:200%_100%] bg-clip-text text-transparent animate-[shine_3s_linear_infinite]">
                            Thinking...
                        </div>
                    </div>
                ]

            })
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

            const result = await chatSession.sendMessage(input);
            const response = await result.response.text();
            if (response) {
                let currentIndex = 0;

                setresponses(prevResponses => ({
                    ...prevResponses,
                    bot: [...prevResponses.bot.slice(0, -1), response[0]]
                }));

                const interval = setInterval(() => {
                    setresponses(prevResponses => {
                        if (currentIndex < response.length) {
                            return {
                                ...prevResponses,
                                bot: prevResponses.bot.map((msg, index) =>
                                    index === prevResponses.bot.length - 1 ? msg + response[currentIndex] : msg
                                )
                            };
                        } else {
                            clearInterval(interval);
                        }
                        return prevResponses;
                    });

                    currentIndex++; 
                }, 5); 
            }

        }


    }
    useEffect(() => {
        document.querySelector(".chats") ? document.querySelector(".chats").scrollTop = document.querySelector(".chats").scrollHeight : ""
        console.clear()
        localStorage.setItem("TalkX", JSON.stringify(responses))
        if (responses.user.length > 0) {
            setnonedisplay({
                display: "none",
                height: "66vh"
            })

        }
        else {
            setnonedisplay({
                display: "",
                height: "36vh"
            })

        }
        return () => {

        }
    }, [responses])
    const deletechat = () => {
        setresponses({
            user: [],
            bot: []
        })
    }
    const logout = () => {
        account.deleteSessions();
        redirect("/")
    }
    return (
        <div className='w-full h-[100vh] bg-gradient-to-r from-white to-pink-200'>
            <div className='w-full h-full'>
                <div className='flex items-center justify-between w-[90%] mx-auto '>
                    <div className='font-bold flex items-center justify-center'>
                        <img src="/logo.webp" className='w-20 h-20 rounded-full' alt="Bot Logo" />
                        <span className='text-lg'>

                            {personaldata.name}
                        </span>
                    </div>
                    <div onClick={logout}>
                        <button
                            className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                        >
                            <div
                                className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                                    <path
                                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                    ></path>
                                </svg>
                            </div>
                            <div
                                className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                            >
                                Logout
                            </div>
                        </button>

                    </div>
                </div>

                <div style={{ display: nonedisplay.display }} className='text-center -mt-10 sm:-mt-16  flex flex-col gap-1 sm:gap-3 items-center'>
                    <img src="/logo.webp" className='h-20 sm:h-24 rounded-full' alt="Bot Logo" />
                    <h1 className='font-extrabold text-4xl text-gray-500'>Hi {personaldata.name} </h1>
                    <h2 className='text-2xl font-bold'>Can I help you anything?</h2>
                    <p className='w-5/6 sm:w-1/2 text-base '>Ready to assist you with anything you need,from answering questions to providing personalized recommendations. Lets get started!</p>
                </div>
                <div style={{ height: nonedisplay.height }} className='w-5/6 chats mx-auto mt-10 flex flex-col gap-3  overflow-y-auto py-3 '>
                    {responses.user.map((e, index) => (
                        <React.Fragment key={uuidv4()}>
                            <User name={e} />
                            {responses.bot[index] && <Bot response={responses.bot[index]} />}
                        </React.Fragment>
                    ))}


                </div>

            </div>
            <div className="fixed bottom-2 left-[14%] sm:left-[8%]   bg-white shadow-xl sm:w-[90%] w-10/12 mx-auto rounded-xl border">
                <button
                    onClick={deletechat}
                    title='clear all chat'
                    className="group absolute -left-[12%] sm:-left-[8%] flex w-12 h-12 bottom-0 md:h-14 md:w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
                >
                    <svg
                        viewBox="0 0 1.625 1.625"
                        className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                        height="15"
                        width="15"
                    >
                        <path
                            d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"
                        ></path>
                        <path
                            d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"
                        ></path>
                        <path
                            d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"
                        ></path>
                    </svg>
                    <svg
                        width="16"
                        fill="none"
                        viewBox="0 0 39 7"
                        className="origin-right duration-500 group-hover:rotate-90"
                    >
                        <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
                        <line
                            strokeWidth="3"
                            stroke="white"
                            y2="1.5"
                            x2="26.0357"
                            y1="1.5"
                            x1="12"
                        ></line>
                    </svg>
                    <svg width="16" fill="none" viewBox="0 0 33 39" className="">
                        <mask fill="white" id="path-1-inside-1_8_19">
                            <path
                                d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                            ></path>
                        </mask>
                        <path
                            mask="url(#path-1-inside-1_8_19)"
                            fill="white"
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                        ></path>
                        <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
                        <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
                    </svg>
                </button>
                <input
                    className="input bg-transparent outline-none border-none pl-6 pr-6 py-4 w-11/12 "
                    placeholder="Ask me anything"
                    name="text"
                    type="text"
                    autoFocus={true}
                    value={input}
                    onKeyDown={handlekeydown}

                    onChange={handleinputchange}
                />
                <div onClick={handleclick} className="button-enter absolute right-2 top-[0.4em]">
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
        </div>

    )
}

export default Chatroom