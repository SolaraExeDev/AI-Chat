"use client"
import { Client, Account } from 'appwrite';
import { useSearchParams, redirect } from 'next/navigation';
import { Suspense, useEffect } from 'react';

const Verify = () => {
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);
    const account = new Account(client);
    
    const SearchParamsWithSuspense = () => {
        const searchParams = useSearchParams();
        return (
            <VerifyContent account={account} searchParams={searchParams} />
        );
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchParamsWithSuspense />
        </Suspense>
    );
};

const VerifyContent = ({ account, searchParams }) => {
    useEffect(() => {
        (async function () {
            if (localStorage.getItem("cookieFallback") !== null || localStorage.getItem("cookieFallback") !== '[]') {
                await account.deleteSessions();
            }
            const userid = searchParams.get("userId");
            const secret = searchParams.get("secret");
            if (userid && secret) {
                await account.createSession(userid, secret);
                redirect("/chatroom");
            }
        })();
    }, [account, searchParams]);

    return (
        <>
            <div className="absolute font-semibold text-3xl text-center w-full top-40">Verifying Your Request</div>
            <div className="flex items-center justify-center w-full h-[100vh]">
                <div className="relative">
                    <div className="absolute w-[60px] h-[60px] bg-blue-600 rounded-full -top-10 -left-[70px] animate-move-up6"></div>
                    <div className="absolute w-[25px] h-[25px] bg-red-600 rounded-full top-[-2px] left-[-5px] animate-move-down1"></div>
                    <div className="absolute w-[30px] h-[30px] bg-yellow-500 rounded-full top-[35px] left-[-7px] animate-move-updown1"></div>
                    <div className="absolute w-[12px] h-[12px] bg-green-600 rounded-full -top-[10px] left-[25px] animate-move-up6"></div>
                </div>
            </div>
        </>
    );
};

export default Verify;
