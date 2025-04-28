"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import TeamLogo from "@/components/team-logo"

export default function PredictionHistoryPage() {
  // Create an array of dates and track the current index
  const dates = ["March 30, 2025", "March 31, 2025", "April 1, 2025", "April 2, 2025", "April 3, 2025"]
  const [dateIndex, setDateIndex] = useState(2) // Start with "April 1, 2025" (index 2)

  // Mock data for prediction history
  const dailyStats = {
    correct: 3,
    incorrect: 3,
    accuracy: 50,
  }

  const overallStats = {
    correct: 65,
    incorrect: 22,
    accuracy: 74.7,
  }

  // Update the predictions array to use real logos
  const predictions = [
    {
      team1: { name: "Hawks", abbr: "ATL", score: 121 },
      team2: { name: "Magic", abbr: "ORL", score: 113 },
      correct: true,
    },
    {
      team1: { name: "Cavaliers", abbr: "CLE", score: 108 },
      team2: { name: "Nuggets", abbr: "DEN", score: 110 },
      correct: false,
    },
    {
      team1: { name: "Lakers", abbr: "LAL", score: 135 },
      team2: { name: "Knicks", abbr: "NYK", score: 142 },
      correct: true,
    },
    {
      team1: { name: "Spurs", abbr: "SAS", score: 116 },
      team2: { name: "Heat", abbr: "MIA", score: 131 },
      correct: false,
    },
    {
      team1: { name: "Rockets", abbr: "HOU", score: 99 },
      team2: { name: "Mavericks", abbr: "DAL", score: 127 },
      correct: true,
    },
    {
      team1: { name: "Celtics", abbr: "BOS", score: 123 },
      team2: { name: "Thunder", abbr: "OKC", score: 122 },
      correct: false,
    },
  ]

  const handlePrevDate = () => {
    setDateIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }

  const handleNextDate = () => {
    setDateIndex((prevIndex) => (prevIndex < dates.length - 1 ? prevIndex + 1 : prevIndex))
  }

  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold text-center mb-12">Prediction History</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-[#2a2a2a] rounded-lg p-6">
          <div className="text-2xl font-bold mb-2">{dailyStats.accuracy}% Accuracy</div>
          <div className="flex items-center mb-1">
            <Check className="text-green-500 mr-2" />
            <span>{dailyStats.correct} Correct</span>
          </div>
          <div className="flex items-center">
            <X className="text-red-500 mr-2" />
            <span>{dailyStats.incorrect} Incorrect</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center space-x-4 mb-4">
            <button onClick={handlePrevDate} className="p-2" disabled={dateIndex === 0}>
              <ChevronLeft size={24} className={dateIndex === 0 ? "text-gray-600" : ""} />
            </button>
            <div className="text-2xl font-bold">{dates[dateIndex]}</div>
            <button onClick={handleNextDate} className="p-2" disabled={dateIndex === dates.length - 1}>
              <ChevronRight size={24} className={dateIndex === dates.length - 1 ? "text-gray-600" : ""} />
            </button>
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-lg p-6">
          <div className="text-2xl font-bold mb-2">{overallStats.accuracy}% Overall Accuracy</div>
          <div className="flex items-center mb-1">
            <Check className="text-green-500 mr-2" />
            <span>{overallStats.correct} Total Correct</span>
          </div>
          <div className="flex items-center">
            <X className="text-red-500 mr-2" />
            <span>{overallStats.incorrect} Total Incorrect</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {predictions.map((prediction, index) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden ${prediction.correct ? "bg-green-900/30" : "bg-red-900/30"}`}
          >
            <div className="grid grid-cols-2 p-6">
              <div className="flex flex-col items-center">
                <TeamLogo teamAbbr={prediction.team1.abbr} size={60} />
                <div className="text-3xl font-bold mt-2">{prediction.team1.score}</div>
              </div>
              <div className="flex flex-col items-center">
                <TeamLogo teamAbbr={prediction.team2.abbr} size={60} />
                <div className="text-3xl font-bold mt-2">{prediction.team2.score}</div>
              </div>
            </div>
            <div className="flex justify-end p-2 bg-black/20">
              {prediction.correct ? (
                <Check className="text-green-500" size={24} />
              ) : (
                <X className="text-red-500" size={24} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
