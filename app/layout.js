import { Poppins } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { dark } from "@clerk/themes";


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
    <ClerkProvider
    signInFallbackRedirectUrl="/chatroom"
      appearance={{
        baseTheme: dark,
      }}
    >

      <html lang="en">
        <body
          className={`${poppins.className}  antialiased`}
        >

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
