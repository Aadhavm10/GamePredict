"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react"
import TeamLogo from "@/components/team-logo"
import { teamFullNames } from "@/lib/team-logos"

export default function HomePage() {
  // Create an array of dates and track the current index
  const dates = ["YESTERDAY", "TODAY", "TOMORROW"]
  const [dateIndex, setDateIndex] = useState(1) // Start with "TODAY" (index 1)
  const [showConference, setShowConference] = useState<"WEST" | "EAST" | null>(null)

  // Mock data for the teams
  const westTeams = [
    { name: "Thunder", record: "63W-12L", abbr: "OKC" },
    { name: "Rockets", record: "49W-27L", abbr: "HOU" },
    { name: "Nuggets", record: "48W-28L", abbr: "DEN" },
    { name: "Lakers", record: "46W-29L", abbr: "LAL" },
  ]

  const eastTeams = [
    { name: "Cavaliers", record: "60W-15L", abbr: "CLE" },
    { name: "Celtics", record: "56W-19L", abbr: "BOS" },
    { name: "Knicks", record: "47W-27L", abbr: "NYK" },
    { name: "Pacers", record: "44W-31L", abbr: "IND" },
  ]

  // Generate full conference standings
  const generateFullConferenceStandings = (conference: "WEST" | "EAST") => {
    // Get all teams from the specified conference
    const conferenceTeams = Object.entries(teamFullNames)
      .filter(([abbr]) => {
        if (conference === "WEST") {
          return [
            "DAL",
            "DEN",
            "GSW",
            "HOU",
            "LAC",
            "LAL",
            "MEM",
            "MIN",
            "NOP",
            "OKC",
            "PHX",
            "POR",
            "SAC",
            "SAS",
            "UTA",
          ].includes(abbr)
        } else {
          return [
            "ATL",
            "BOS",
            "BKN",
            "CHA",
            "CHI",
            "CLE",
            "DET",
            "IND",
            "MIA",
            "MIL",
            "NYK",
            "ORL",
            "PHI",
            "TOR",
            "WAS",
          ].includes(abbr)
        }
      })
      .map(([abbr, name]) => {
        // Check if this team is in the top teams
        const topTeams = conference === "WEST" ? westTeams : eastTeams
        const topTeam = topTeams.find((t) => t.abbr === abbr)

        // Generate wins and losses
        let wins, losses
        if (topTeam) {
          const record = topTeam.record.split("-")
          wins = Number.parseInt(record[0])
          losses = Number.parseInt(record[1])
        } else {
          // Generate random record (worse than the top teams)
          wins = Math.floor(Math.random() * 45)
          losses = 82 - wins
        }

        return {
          name,
          abbr,
          record: `${wins}W-${losses}L`,
          winPercentage: wins / (wins + losses),
        }
      })

    // Sort by win percentage
    return conferenceTeams.sort((a, b) => b.winPercentage - a.winPercentage)
  }

  // Mock data for the matchups
  const matchups = [
    {
      team1: { abbr: "BOS", winChance: 69 },
      team2: { abbr: "MEM", winChance: 31 },
      date: "April 27, 2025",
      time: "7:30 PM ET",
      location: "TD Garden, Boston",
    },
    {
      team1: { abbr: "MIL", winChance: 98 },
      team2: { abbr: "ORL", winChance: 2 },
      date: "April 27, 2025",
      time: "8:00 PM ET",
      location: "Fiserv Forum, Milwaukee",
    },
    {
      team1: { abbr: "NYK", winChance: 28 },
      team2: { abbr: "MIN", winChance: 72 },
      date: "April 27, 2025",
      time: "7:00 PM ET",
      location: "Madison Square Garden, New York",
    },
    {
      team1: { abbr: "HOU", winChance: 41 },
      team2: { abbr: "LAL", winChance: 59 },
      date: "April 27, 2025",
      time: "10:30 PM ET",
      location: "Toyota Center, Houston",
    },
  ]

  const handlePrevDate = () => {
    setDateIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }

  const handleNextDate = () => {
    setDateIndex((prevIndex) => (prevIndex < dates.length - 1 ? prevIndex + 1 : prevIndex))
  }

  const handleConferenceClick = (conference: "WEST" | "EAST") => {
    setShowConference(conference)
  }

  const closeModal = () => {
    setShowConference(null)
  }

  return (
    <div className="mt-4">
      <h1 className="text-4xl font-bold text-center">GamePredict</h1>
      <p className="text-gray-400 mt-2 text-center mb-6">Your NBA Prediction Platform</p>

      <div className="flex justify-center items-center mb-8 space-x-4">
        <button onClick={handlePrevDate} className="p-2" disabled={dateIndex === 0}>
          <ChevronLeft size={24} className={dateIndex === 0 ? "text-gray-600" : ""} />
        </button>
        <div className="bg-[#2a2a2a] px-10 py-3 text-xl font-bold">{dates[dateIndex]}</div>
        <button onClick={handleNextDate} className="p-2" disabled={dateIndex === dates.length - 1}>
          <ChevronRight size={24} className={dateIndex === dates.length - 1 ? "text-gray-600" : ""} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4">West</h2>
            <button
              className="text-sm text-gray-400 hover:text-white flex items-center mb-4"
              onClick={() => handleConferenceClick("WEST")}
            >
              View full standings <ExternalLink size={14} className="ml-1" />
            </button>
          </div>

          {westTeams.map((team, index) => (
            <div key={index} className="bg-[#2a2a2a] rounded-lg p-3 flex items-center">
              <div className="w-10 h-10 mr-3 flex items-center justify-center">
                <TeamLogo teamAbbr={team.abbr} size={40} />
              </div>
              <div className="font-bold">{team.name}</div>
              <div className="ml-auto text-gray-300">{team.record}</div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-8">
            <h2 className="text-2xl font-bold mb-4">East</h2>
            <button
              className="text-sm text-gray-400 hover:text-white flex items-center mb-4"
              onClick={() => handleConferenceClick("EAST")}
            >
              View full standings <ExternalLink size={14} className="ml-1" />
            </button>
          </div>

          {eastTeams.map((team, index) => (
            <div key={index} className="bg-[#2a2a2a] rounded-lg p-3 flex items-center">
              <div className="w-10 h-10 mr-3 flex items-center justify-center">
                <TeamLogo teamAbbr={team.abbr} size={40} />
              </div>
              <div className="font-bold">{team.name}</div>
              <div className="ml-auto text-gray-300">{team.record}</div>
            </div>
          ))}
        </div>

        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchups.map((matchup, index) => (
            <div key={index} className="bg-[#2a2a2a] rounded overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="p-4 flex flex-col items-center justify-center border-r border-gray-700">
                  <TeamLogo teamAbbr={matchup.team1.abbr} size={60} />
                  <div className="text-xl font-bold mt-2">{matchup.team1.abbr}</div>
                  <div className={`text-lg mt-1 ${matchup.team1.winChance > 50 ? "text-green-500" : "text-red-500"}`}>
                    {matchup.team1.winChance}%
                  </div>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <TeamLogo teamAbbr={matchup.team2.abbr} size={60} />
                  <div className="text-xl font-bold mt-2">{matchup.team2.abbr}</div>
                  <div className={`text-lg mt-1 ${matchup.team2.winChance > 50 ? "text-green-500" : "text-red-500"}`}>
                    {matchup.team2.winChance}%
                  </div>
                </div>
              </div>
              <div className="text-center py-2 border-t border-gray-700 bg-[#222]">
                <div className="text-gray-400">VS</div>
              </div>
              <div className="p-3 border-t border-gray-700 bg-[#1e1e1e]">
                <div className="text-sm text-gray-400 flex justify-between">
                  <span>{matchup.date}</span>
                  <span>{matchup.time}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{matchup.location}</div>
              </div>
              <div className="text-center py-2 border-t border-gray-700 hover:bg-gray-700">
                <Link
                  href={`/matchup/${matchup.team1.abbr}-${matchup.team2.abbr}?time=${encodeURIComponent(matchup.time)}&location=${encodeURIComponent(matchup.location)}&date=${encodeURIComponent(matchup.date)}&team1win=${matchup.team1.winChance}&team2win=${matchup.team2.winChance}`}
                  className="text-sm"
                >
                  View Match
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conference Standings Modal */}
      {showConference && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">{showConference} Conference Standings</h2>
              <button className="p-2 hover:bg-gray-700 rounded-full" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto p-4 flex-grow">
              <div className="grid grid-cols-1 gap-2">
                {generateFullConferenceStandings(showConference).map((team, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-lg ${index < 4 ? "bg-[#2a2a2a]" : "bg-[#222]"}`}
                  >
                    <div className="w-8 text-center font-bold text-gray-400 mr-2">{index + 1}</div>
                    <div className="w-10 h-10 mr-3 flex items-center justify-center">
                      <TeamLogo teamAbbr={team.abbr} size={40} />
                    </div>
                    <div className="flex-1">{team.name}</div>
                    <div className="font-bold text-gray-300">{team.record}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
