"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

interface TikTokFeedProps {
  username: string
}

export default function TikTokFeed({ username }: TikTokFeedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [videos, setVideos] = useState<string[]>([
    "7503266232011918622",
    "7505183988265323807",
    "7504258792163511582",
    "7503613563181731103"
  ])
  const [embeds, setEmbeds] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchOEmbeds = async () => {
      const embedResults: Record<string, string> = {}
      
      for (const videoId of videos) {
        try {
          const url = `https://www.tiktok.com/@${username}/video/${videoId}`
          const response = await fetch(
            `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
          )
          
          if (response.ok) {
            const data = await response.json()
            // Store the HTML directly from the oEmbed response
            embedResults[videoId] = data.html
          }
        } catch (error) {
          console.error(`Error fetching oEmbed for video ${videoId}:`, error)
        }
      }
      
      setEmbeds(embedResults)
      setIsLoading(false)
    }
    
    fetchOEmbeds()
  }, [videos, username])

  return (
    <>
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      
      {isLoading ? (
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="aspect-[9/16] animate-pulse rounded-lg bg-gray-200"></div>
          ))}
        </div>
      ) : (
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {videos.map((videoId) => (
            <div key={videoId} className="mx-auto w-full">
              {embeds[videoId] ? (
                <div 
                  className="tiktok-embed-container" 
                  dangerouslySetInnerHTML={{ __html: embeds[videoId] }} 
                />
              ) : (
                <div className="aspect-[9/16] rounded-lg bg-gray-200 flex items-center justify-center">
                  <p className="text-sm text-gray-500">Video unavailable</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
