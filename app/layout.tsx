import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ResumeStepper from "./ui/resume-stepper";
import ResumeContextProvider from "./ui/resume-context-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Build your professional resume with our easy-to-use builder",
  openGraph:{
    title: "Resume Builder",
    description: "Build your professional resume with our easy-to-use builder",
    images: [
      {
        url: "/site-image.jpg",
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Builder",
    description: "Build your professional resume with our easy-to-use builder",
    images: [
      {
        url: "/site-image.jpg",
        width: 1200,
        height: 630,
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         {/* <div className="container mx-auto bg-green-500 overflow-hidden"> */}
          <ResumeContextProvider>
            <ResumeStepper />
            <div className="w-full bg-amber-500">
              {children}
            </div>
          </ResumeContextProvider>
           
          
        {/* </div> */}
        
      </body>
    </html>
  );
}
