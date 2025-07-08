import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import Script from "next/script"
import Widget from "../components/widget"

export const metadata: Metadata = {
  title: "Compute for Humans",
  description: "Exploring technology and making computing more accessible for everyone.",
  generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://plausible.idontlikeeagles.us/js/script.js"
          data-domain="computeforhumans.com"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}
      </body>
    </html>
  )
}
