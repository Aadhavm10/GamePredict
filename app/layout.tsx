import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GamePredict",
  description: "NBA Game Prediction Application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1a1a1a] text-white min-h-screen`}>
        <Navbar />
        <main className="container mx-auto px-4 pb-10">{children}</main>
        <footer className="py-6 border-t border-gray-800 text-center">
          <div className="container mx-auto flex justify-center space-x-10">
            <a href="/about" className="hover:text-gray-300">
              About Us
            </a>
            <a href="/contact" className="hover:text-gray-300">
              Contact Us
            </a>
            <a href="/terms" className="hover:text-gray-300">
              Terms of Service
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
