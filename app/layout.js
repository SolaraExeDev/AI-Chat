import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Chat AI",
  description: "AI Chat App ",
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
