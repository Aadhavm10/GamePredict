"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

// Define the props for the TeamLogo component
interface TeamLogoProps {
  teamAbbr: string
  size?: number
  className?: string
}

// Create a TeamLogo component that dynamically imports the correct logo
export default function TeamLogo({ teamAbbr, size = 40, className = "" }: TeamLogoProps) {
  const [error, setError] = useState(false)

  // Normalize the team abbreviation
  const normalizedAbbr = teamAbbr.toUpperCase()

  // If there was an error loading the dynamic component, fall back to a placeholder
  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-800 rounded-full ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-xs font-bold">{normalizedAbbr}</span>
      </div>
    )
  }

  // Dynamically import the logo component
  const LogoComponent = dynamic(
    () =>
      import("react-nba-logos").then((mod) => {
        // Check if the component exists in the module
        if (mod[normalizedAbbr]) {
          return mod[normalizedAbbr]
        }
        // If not, throw an error to trigger the fallback
        throw new Error(`Logo for ${normalizedAbbr} not found`)
      }),
    {
      loading: () => (
        <div
          className={`flex items-center justify-center bg-gray-800 rounded-full animate-pulse ${className}`}
          style={{ width: size, height: size }}
        >
          <span className="text-xs font-bold">{normalizedAbbr}</span>
        </div>
      ),
      ssr: false,
      onError: () => {
        setError(true)
        return () => (
          <div
            className={`flex items-center justify-center bg-gray-800 rounded-full ${className}`}
            style={{ width: size, height: size }}
          >
            <span className="text-xs font-bold">{normalizedAbbr}</span>
          </div>
        )
      },
    },
  )

  return <LogoComponent size={size} className={className} />
}
