import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "TalkX - Conversational AI for Local Knowledge",
  description: "Experience the future of customer support with TalkX, an AI-powered chatbot that provides personalized and efficient solutions to your local knowledge needs",
};
export default function RootLayout({ children }) {
  return (

      <html lang="en">
        <body
          className={`${poppins.className}  antialiased`}
        >
          {children}
        </body>
      </html>
  );
}
