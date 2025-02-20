"use client"
import Navbar from "@/components/navbar";
import Image from "next/image";
export default function Home() {
  return (
    <div className="w-full h-[100vh] bg-[#f5f3f3]">
      <Navbar />
      <section className="flex lg:flex-row flex-col lg:w-[97%] sm:w-[90%] items-center sm:mx-6 sm:my-16 bg-[#f5f3f3]" >
        <div className="lg:w-[60%] w-full py-3 px-6">
          <h2 className="font-bold text-3xl my-4 mx-3  ">Conversational AI Assistant for Local Knowledge</h2>
          <p className="mx-3 font-medium leading-7 text-base"> <span className="text-blue-800 font-bold text-lg">TalkX</span> is an advanced AI chatbot designed to revolutionize customer interactions. With cutting-edge machine learning technology, TalkX delivers intelligent, human-like conversations that engage and support users around the clock. Whether you're providing customer service, automating responses, or enhancing user experience, TalkX adapts to your needs with seamless integration across your website, apps, and social platforms. Say goodbye to long response times and hello to smarter, faster communication with TalkX—your ultimate AI assistant</p>
        </div>
        <div className="p-3 bg-[#f5f3f3]">
          <Image className="rounded-2xl transform transition duration-300 ease-in-out hover:scale-105" src="/Landing.jpeg" alt="chat" width={400} height={500} quality={90} priority={true}  loading="eager" />
        </div>
      </section>
    </div>
  );
}
