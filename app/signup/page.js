"use client"
import React, { useState, useRef } from 'react'
import { Client, Account, OAuthProvider, ID } from 'appwrite';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { redirect,useRouter } from 'next/navigation';
const page = () => {
    const router=useRouter()
    const client = new Client();
    const [inputs, setinputs] = useState({
        email: "",
        name: "",
        password: ""
    })
    const [logininputs, setlogininputs] = useState({
        email: "",
        password: ""
    })
    client.setProject(process.env.NEXT_PUBLIC_PROJECT_ID).setEndpoint('https://cloud.appwrite.io/v1');

    const account = new Account(client);
    const ref = useRef()
    const ref1 = useRef()
    const handleinputschange = (e) => {
        setinputs({ ...inputs, [e.target.name]: e.target.value })
        console.log(inputs);
    }
    const handleGoogleLogin = async () => {
        await account.createOAuth2Token(
            OAuthProvider.Google,
            "http://localhost:3000/verify",
            "http://localhost:3000/"
        )
    }
    const handlecreatelogin = async () => {
        if (!inputs.email || !inputs.password || !inputs.name) {
            toast('🚀 Kindly Fill all required Values', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return
        }
        if (inputs.password.length < 8) {
            toast('🚀 Password must be at least 8 characters',
                {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            return
        }
        await account.create(
            ID.unique(),
            inputs.email.trim(),
            inputs.password.trim(),
            inputs.name.trim()
        ).catch(e => {
            console.log(e);
            toast('🚀 User with this credential already exist', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        })
        await account.createEmailPasswordSession(inputs.email, inputs.password);
        setinputs({
            name: "",
            email: "",
            password: ""
        })
        redirect("/chatroom")
    }
    const rotate = () => {
        window.scrollTo(0, 1111)
        document.querySelector(".rotating-div").classList.add("rotate")
    }
    const handlelogininputs = (e) => {
        setlogininputs({
            ...logininputs,
            [e.target.name]: e.target.value
        })
    }
    const handlelogin = async () => {
        await account.createEmailPasswordSession(logininputs.email, logininputs.password)
        .then(()=>{
            setlogininputs({
                email: "",
                password: ""
            })
            router.push("/chatroom")
        })
            .catch(e => {
                console.log(e);
                toast('🚀 Invalid Email / Password', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                return;
            })
        


    }
    const derotate = () => {
        if (document.querySelector(".rotating-div").classList.contains("rotate")) {
            document.querySelector(".rotating-div").classList.remove("rotate")
        }
    }
    const handleeye = () => {
        if (ref.current.type === "text") {
            ref.current.type = "password"
        }
        else {
            ref.current.type = "text"

        }
    }
    const handlesecondeye = () => {
        if (ref1.current.type === "text") {
            ref1.current.type = "password"
        }
        else {
            ref1.current.type = "text"

        }
    }
    return (
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] overflow-hidden">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                theme="light"
                transition={Bounce}
                className="font-mono"
            />
            <div className='relative h-full w-full overflow-hidden items-center flex md:flex-row flex-col md:justify-between'>
                <div id='signup' className='relative z-0 flex flex-col items-center w-10/12 md:w-1/2 gap-3 md:gap-5 '>
                    <div className=' font-bold '>
                        <img src="/logo.webp" className='w-16 h-16 rounded-full' alt="Bot Logo" />

                    </div>
                    <h1 className='font-bold text-2xl'>Sign Up</h1>
                    <button onClick={handleGoogleLogin}
                        className="cursor-pointer text-black flex gap-2 items-center bg-white px-14 py-3 rounded-lg font-medium text-sm hover:bg-zinc-300 transition-all ease-in duration-200"
                    >
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-6">
                            <path
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                fill="#FFC107"
                            ></path>
                            <path
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                fill="#FF3D00"
                            ></path>
                            <path
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                fill="#4CAF50"
                            ></path>
                            <path
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                fill="#1976D2"
                            ></path>
                        </svg>
                        Continue with Google
                    </button>
                    <p className='text-sm'>or sign up using email </p>

                    <div className='flex flex-col gap-5'>
                        <div className="group relative flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="none"
                                className="icon absolute left-4 w-4 h-4 fill-none"

                                color="#000"
                                data-src="https://cdn.hugeicons.com/icons/user-twotone-rounded.svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M6.578 15.482c-1.415.842-5.125 2.562-2.865 4.715C4.816 21.248 6.045 22 7.59 22h8.818c1.546 0 2.775-.752 3.878-1.803 2.26-2.153-1.45-3.873-2.865-4.715a10.663 10.663 0 0 0-10.844 0Z"
                                />
                                <path
                                    stroke="#000"
                                    strokeWidth={1.5}
                                    d="M16.5 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
                                    opacity={0.4}
                                />
                            </svg>
                            <input onChange={handleinputschange} className="input w-full h-[45px]  pl-20 pr-16 rounded-lg border-2 border-transparent bg-[#f8fafc] text-[#0d0c22] placeholder-[#94a3b8] focus:outline-none focus:border-[#818cf8] focus:bg-white focus:shadow-[0_0_0_5px_rgba(129,140,248,0.3)] transition-all duration-500 ease-in-out" type="text" name='name' placeholder="Enter Your Name" value={inputs.name} />
                        </div>
                        <div className="group relative flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="none"
                                className="icon absolute left-4 w-4 h-4 fill-none"
                                color="#000"
                                data-src="https://cdn.hugeicons.com/icons/mail-01-stroke-standard.svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="#000"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                                />
                                <path
                                    stroke="#000"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="m22 7-9.106 4.553a2 2 0 0 1-1.788 0L2 7"
                                />
                            </svg>
                            <input onChange={handleinputschange} className="input w-full h-[45px] pl-12 pr-16 rounded-lg border-2 border-transparent bg-[#f8fafc] text-[#0d0c22] placeholder-[#94a3b8] focus:outline-none focus:border-[#818cf8] focus:bg-white focus:shadow-[0_0_0_5px_rgba(129,140,248,0.3)] transition-all duration-500 ease-in-out" type="email" name='email' placeholder="Enter Your email" value={inputs.email} />
                        </div>
                        <div className="group relative flex items-center justify-between">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="none"
                                className="icon absolute left-4 w-4 h-4 fill-none"
                                color="#000"
                                data-src="https://cdn.hugeicons.com/icons/lock-password-twotone-rounded.svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="#000"
                                    strokeWidth={1.5}
                                    d="M4.268 18.845c.225 1.67 1.608 2.979 3.292 3.056 1.416.065 2.855.099 4.44.099 1.585 0 3.024-.034 4.44-.1 1.684-.076 3.067-1.385 3.292-3.055.147-1.09.268-2.207.268-3.345 0-1.138-.121-2.255-.268-3.345-.225-1.67-1.608-2.979-3.292-3.056A95.434 95.434 0 0 0 12 9c-1.585 0-3.024.034-4.44.1-1.684.076-3.067 1.385-3.292 3.055C4.12 13.245 4 14.362 4 15.5c0 1.138.121 2.255.268 3.345Z"
                                />
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M7.5 9V6.5a4.5 4.5 0 0 1 9 0V9"
                                />
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 15.49v.01M12 15.49v.01M8 15.49v.01"
                                    opacity={0.4}
                                />
                            </svg>
                            <input ref={ref} onChange={handleinputschange} className="input w-full h-[45px] pl-12 pr-16 rounded-lg border-2 border-transparent bg-[#f8fafc] text-[#0d0c22] placeholder-[#94a3b8] focus:outline-none focus:border-[#818cf8] focus:bg-white focus:shadow-[0_0_0_5px_rgba(129,140,248,0.3)] transition-all duration-500 ease-in-out" type="password" name='password' placeholder="Enter Your Password" value={inputs.password} />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                onClick={handleeye}
                                fill="none"
                                className="icon absolute right-4 w-5 h-5 cursor-pointer fill-none"
                                color="#000"
                                data-src="https://cdn.hugeicons.com/icons/view-off-duotone-rounded.svg"
                                viewBox="0 0 24 24"
                            >
                                <path fill="#000" d="M12 14c6 0 10-6 10-6H2s4 6 10 6Z" opacity={0.4} />
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeWidth={1.5}
                                    d="M22 8s-4 6-10 6S2 8 2 8"
                                />
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="m15 13.5 1.5 2.5M20 11l2 2M2 13l2-2M9 13.5 7.5 16"
                                />
                            </svg>
                        </div>
                        <div onClick={handlecreatelogin} className="flex items-center justify-center ">
                            <div className="relative group">
                                <button
                                    className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                                >
                                    <span
                                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    ></span>

                                    <span className="relative z-10 block px-4 py-3 rounded-xl bg-gray-950">
                                        <div className="relative z-10 flex items-center space-x-2">
                                            <span className="transition-all duration-500 group-hover:translate-x-1"
                                            >Sign Up</span
                                            >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                data-slot="icon"
                                                viewBox="0 0 20 20"
                                                className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </span>
                                </button>
                            </div>
                        </div>


                    </div>
                    <div>Already have an account ? <a href='#login' onClick={rotate} className='font-bold text-[#f10ade] cursor-pointer'>Sign in</a> here</div>
                </div>
                <div className='rotating-div absolute top-0 hidden md:block z-10 left-[calc(100%-40%)] transition-all duration-1000 w-[40%] h-full bg-gradient-to-r from-[#642481] via-[#642481] to-[#f10ade]'>

                </div>
                <div id='login' className='relative z-0 flex flex-col items-center mt-10 md:mt-0  w-10/12 md:w-1/2 gap-6 md:gap-8'>
                    <div className=' font-bold '>
                        <img src="/logo.webp" className='w-16 h-16 rounded-full' alt="Bot Logo" />

                    </div>
                    <h1 className='font-bold text-2xl'>Login</h1>
                    <button onClick={handleGoogleLogin}
                        className="cursor-pointer text-black flex gap-2 items-center bg-white px-14 py-3 rounded-lg font-medium text-sm hover:bg-zinc-300 transition-all ease-in duration-200"
                    >
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-6">
                            <path
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                fill="#FFC107"
                            ></path>
                            <path
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                fill="#FF3D00"
                            ></path>
                            <path
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                fill="#4CAF50"
                            ></path>
                            <path
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                fill="#1976D2"
                            ></path>
                        </svg>
                        Continue with Google
                    </button>
                    <p className='text-sm'>or sign in using email </p>

                    <div className='flex flex-col gap-5'>

                        <div className="group relative flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="none"
                                className="icon absolute left-4 w-4 h-4 fill-none"
                                color="#000"
                                data-src="https://cdn.hugeicons.com/icons/mail-01-stroke-standard.svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="#000"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                                />
                                <path
                                    stroke="#000"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="m22 7-9.106 4.553a2 2 0 0 1-1.788 0L2 7"
                                />
                            </svg>
                            <input onChange={handlelogininputs} className="input w-full h-[45px] pl-12 pr-16 rounded-lg border-2 border-transparent bg-[#f8fafc] text-[#0d0c22] placeholder-[#94a3b8] focus:outline-none focus:border-[#818cf8] focus:bg-white focus:shadow-[0_0_0_5px_rgba(129,140,248,0.3)] transition-all duration-500 ease-in-out" type="email" name='email' placeholder="Enter Your email" value={logininputs.email} />
                        </div>
                        <div className="group relative flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="none"
                                className="icon absolute left-4 w-4 h-4 fill-none"
                                color="#000"
                                data-src="https://cdn.hugeicons.com/icons/lock-password-twotone-rounded.svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="#000"
                                    strokeWidth={1.5}
                                    d="M4.268 18.845c.225 1.67 1.608 2.979 3.292 3.056 1.416.065 2.855.099 4.44.099 1.585 0 3.024-.034 4.44-.1 1.684-.076 3.067-1.385 3.292-3.055.147-1.09.268-2.207.268-3.345 0-1.138-.121-2.255-.268-3.345-.225-1.67-1.608-2.979-3.292-3.056A95.434 95.434 0 0 0 12 9c-1.585 0-3.024.034-4.44.1-1.684.076-3.067 1.385-3.292 3.055C4.12 13.245 4 14.362 4 15.5c0 1.138.121 2.255.268 3.345Z"
                                />
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M7.5 9V6.5a4.5 4.5 0 0 1 9 0V9"
                                />
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 15.49v.01M12 15.49v.01M8 15.49v.01"
                                    opacity={0.4}
                                />
                            </svg>
                            <input ref={ref1} onChange={handlelogininputs} className="input w-full h-[45px] pl-12 pr-16 rounded-lg border-2 border-transparent bg-[#f8fafc] text-[#0d0c22] placeholder-[#94a3b8] focus:outline-none focus:border-[#818cf8] focus:bg-white focus:shadow-[0_0_0_5px_rgba(129,140,248,0.3)] transition-all duration-500 ease-in-out" type="password" name='password' placeholder="Enter Your Password" value={logininputs.password} />

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                onClick={handlesecondeye}
                                fill="none"
                                className="icon absolute right-4 w-5 h-5 cursor-pointer fill-none"
                                color="#000"
                                data-src="https://cdn.hugeicons.com/icons/view-off-duotone-rounded.svg"
                                viewBox="0 0 24 24"
                            >
                                <path fill="#000" d="M12 14c6 0 10-6 10-6H2s4 6 10 6Z" opacity={0.4} />
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeWidth={1.5}
                                    d="M22 8s-4 6-10 6S2 8 2 8"
                                />
                                <path
                                    stroke="#000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="m15 13.5 1.5 2.5M20 11l2 2M2 13l2-2M9 13.5 7.5 16"
                                />
                            </svg>
                        </div>
                        <div onClick={handlelogin} className="flex items-center justify-center ">
                            <div className="relative group">
                                <button
                                    className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                                >
                                    <span
                                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    ></span>

                                    <span className="relative z-10 block px-4 py-3 rounded-xl bg-gray-950">
                                        <div className="relative z-10 flex items-center space-x-2">
                                            <span className="transition-all duration-500 group-hover:translate-x-1"
                                            >Login</span
                                            >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                data-slot="icon"
                                                viewBox="0 0 20 20"
                                                className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </span>
                                </button>
                            </div>
                        </div>


                    </div>
                    <div>No account ? <a href='#signup' onClick={derotate} className='font-bold text-[#f10ade] cursor-pointer'>Sign Up</a> here</div>
                </div>
            </div>
        </div>

    )
}

export default page