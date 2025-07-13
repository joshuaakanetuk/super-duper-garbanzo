import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Script from "next/script"
import Link from "next/link"
import { Home, MoreHorizontal } from "lucide-react"
import { SiTiktok, SiGithub, SiYoutube, SiX, SiDiscord } from "react-icons/si"

export const metadata: Metadata = {
  title: "Compute for Humans",
  description: "Exploring technology and making computing more accessible for everyone.",
  generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

// Initialize Inter font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <Script
          src="https://plausible.idontlikeeagles.us/js/script.js"
          data-domain="computeforhumans.com"
          strategy="beforeInteractive"
        />
      </head>
      <body className="flex flex-col">
        <header className="max-w-prose mx-auto py-8 px-4">
          <div className="flex flex overflow-x-auto pb-2 justify-end space-x-4">
            <Link href={"/"} className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 text-gray-800">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link href={"/blog"} className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 text-gray-800">
              <MoreHorizontal className="h-5 w-5" />
              <span>Blog</span>
            </Link>
          </div>
        </header>
        {children}
        <footer className="max-w-prose mx-auto px-4 py-6 text-center text-xs text-gray-500 flex flex-col gap-2">
          <div className="flex justify-center space-x-2">
            <p>© {new Date().getFullYear()} Compute for Humans. All rights reserved.</p>
          </div>
          <div className="flex justify-center space-x-2">
          <Link
              href="https://github.com/joshuaakanetuk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 text-gray-800"
            >
              <SiGithub size={16} />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCarSlrZMBPNY3RdR44uQ_Rg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 text-gray-800"
            >
              <SiYoutube size={16} />
            </Link>
            <Link
              href="https://www.tiktok.com/@computeforhumans"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 text-gray-800"
            >
              <SiTiktok size={16} />
            </Link>
            <Link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 text-gray-800"
            >
              <SiDiscord size={16} />
            </Link>
          </div>
        </footer>
      </body>
    </html>
  )
}
