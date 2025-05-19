import Link from "next/link"
import { Github, Twitter, Youtube } from "lucide-react"
import TikTokFeed from "@/components/tiktok-feed"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <header className="container mx-auto py-8 px-4">
        <div className="flex justify-end space-x-4">
          <Link
            href="https://x.com/compute4humans"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 text-gray-800"
          >
            <Twitter className="h-5 w-5" />
            <span>Twitter</span>
          </Link>
          <Link
            href="https://github.com/joshuaakanetuk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 text-gray-800"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </Link>
          <Link
            href="https://www.youtube.com/@computeforhumans"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 text-gray-800"
          >
            <Youtube className="h-5 w-5" />
            <span>YouTube</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
         Coming Soon
      </main>

      <footer className="container mx-auto border-t border-gray-200 px-4 py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Compute for Humans. All rights reserved.</p>
      </footer>
    </div>
  )
}
