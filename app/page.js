"use client"
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("");
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
          {text: "Hello\n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("hi");
  console.log(result.response.text());
}

// run();
export default function Home() {
  return (
 <div>

 </div>
  );
}
