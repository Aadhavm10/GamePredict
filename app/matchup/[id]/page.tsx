"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import TeamLogo from "@/components/team-logo"
import { getTeamFullName } from "@/lib/team-logos"

export default function MatchupPage({ params }: { params: { id: string } }) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const [globalVotes, setGlobalVotes] = useState<{ [key: string]: number }>({})
  const [hasVoted, setHasVoted] = useState(false)
  const searchParams = useSearchParams()

  // Parse the matchup teams from the URL
  const matchupTeams = params.id.split("-")
  const team1Abbr = matchupTeams[0] || "NYK"
  const team2Abbr = matchupTeams[1] || "CLE"

  // Get the full team names from the abbreviations
  const team1Name = getTeamFullName(team1Abbr)
  const team2Name = getTeamFullName(team2Abbr)

  // Get data from URL parameters
  const time = searchParams.get("time") || "6:00 PM ET"
  const location = searchParams.get("location") || "Madison Square Garden, New York"
  const date = searchParams.get("date") || "April 27, 2025"
  const team1WinChance = Number.parseInt(searchParams.get("team1win") || "45")
  const team2WinChance = Number.parseInt(searchParams.get("team2win") || "55")

  // Load voting data on component mount
  useEffect(() => {
    const savedVotes = localStorage.getItem(`votes_${team1Abbr}_${team2Abbr}`)
    if (savedVotes) {
      setGlobalVotes(JSON.parse(savedVotes))
    } else {
      // Initialize with some random votes
      const initialVotes = {
        [team1Abbr]: Math.floor(Math.random() * 40) + 30,
        [team2Abbr]: Math.floor(Math.random() * 40) + 30,
      }

      // Normalize to ensure they add up to 100%
      const total = initialVotes[team1Abbr] + initialVotes[team2Abbr]
      initialVotes[team1Abbr] = Math.round((initialVotes[team1Abbr] / total) * 100)
      initialVotes[team2Abbr] = 100 - initialVotes[team1Abbr]

      setGlobalVotes(initialVotes)
      localStorage.setItem(`votes_${team1Abbr}_${team2Abbr}`, JSON.stringify(initialVotes))
    }

    // Check if user has already voted
    const userVote = localStorage.getItem(`user_vote_${team1Abbr}_${team2Abbr}`)
    if (userVote) {
      setSelectedTeam(userVote)
      setHasVoted(true)
    }
  }, [team1Abbr, team2Abbr])

  // Mock data for the matchup - now using dynamic team names and URL parameters
  const matchup = {
    time,
    date,
    location,
    team1: {
      name: team1Name,
      abbr: team1Abbr,
      record: "42-27",
      winChance: team1WinChance,
      stats: {
        fg: "55%",
        threePoint: "10",
      },
    },
    team2: {
      name: team2Name,
      abbr: team2Abbr,
      record: "60-15",
      winChance: team2WinChance,
      stats: {
        fg: "65%",
        threePoint: "15",
      },
    },
    spread: `${team2Name} by 10.5`,
    stats: `Last 10: 3-7 (${team1Name} Down)`,
  }

  // Create prediction questions with answers
  const predictionQuestions = [
    {
      question: "Player with most points",
      answer: `Donovan Mitchell (${team2Abbr}) - 32 points`,
      confidence: "High",
    },
    {
      question: "Player with most assists",
      answer: `Darius Garland (${team2Abbr}) - 11 assists`,
      confidence: "Medium",
    },
    {
      question: "Player with most rebounds",
      answer: `Evan Mobley (${team2Abbr}) - 14 rebounds`,
      confidence: "High",
    },
    {
      question: "Player of the match",
      answer: `Donovan Mitchell (${team2Abbr})`,
      confidence: "Medium",
    },
  ]

  const handleTeamSelect = (team: string) => {
    if (hasVoted) return

    setSelectedTeam(team)
    setHasVoted(true)

    // Update global votes
    const updatedVotes = { ...globalVotes }
    updatedVotes[team] = (updatedVotes[team] || 0) + 1

    // Recalculate percentages
    const total = Object.values(updatedVotes).reduce((sum, count) => sum + count, 0)
    const normalizedVotes: { [key: string]: number } = {}

    Object.keys(updatedVotes).forEach((teamAbbr) => {
      normalizedVotes[teamAbbr] = Math.round((updatedVotes[teamAbbr] / total) * 100)
    })

    // Ensure they add up to 100%
    const keys = Object.keys(normalizedVotes)
    const sum = keys.reduce((sum, key) => sum + normalizedVotes[key], 0)
    if (sum !== 100 && keys.length > 0) {
      normalizedVotes[keys[0]] += 100 - sum
    }

    setGlobalVotes(normalizedVotes)
    localStorage.setItem(`votes_${team1Abbr}_${team2Abbr}`, JSON.stringify(normalizedVotes))
    localStorage.setItem(`user_vote_${team1Abbr}_${team2Abbr}`, team)
  }

  const toggleQuestion = (index: number) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null)
    } else {
      setExpandedQuestion(index)
    }
  }

  return (
    <div className="mt-8">
      <Link href="/" className="flex items-center text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back to Games
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center mb-2">
            <Clock className="mr-2" size={24} />
            <span className="text-xl">{matchup.time}</span>
          </div>
          <div className="text-gray-400 mb-6">
            <div>{matchup.date}</div>
            <div>{matchup.location}</div>
          </div>

          <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <TeamLogo teamAbbr={matchup.team1.abbr} size={60} />
                <div className="ml-4">
                  <div className="text-xl font-bold">{matchup.team1.name}</div>
                  <div className="text-gray-400">{matchup.team1.record}</div>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <TeamLogo teamAbbr={matchup.team2.abbr} size={60} />
                <div className="ml-4">
                  <div className="text-xl font-bold">{matchup.team2.name}</div>
                  <div className="text-gray-400">{matchup.team2.record}</div>
                </div>
              </div>
            </div>

            <div className="p-4 text-center">
              <div className="text-lg font-medium">{matchup.spread}</div>
              <div className="flex justify-center mt-2 space-x-4">
                <div className={`text-sm ${matchup.team1.winChance > 50 ? "text-green-500" : "text-gray-400"}`}>
                  {matchup.team1.name}: {matchup.team1.winChance}%
                </div>
                <div className={`text-sm ${matchup.team2.winChance > 50 ? "text-green-500" : "text-gray-400"}`}>
                  {matchup.team2.name}: {matchup.team2.winChance}%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Picks</h2>
            <div className="mb-6">
              <p className="mb-2">Who do you think will win?</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`p-4 rounded-lg flex flex-col items-center ${
                    selectedTeam === team2Abbr ? "bg-gray-700" : "bg-[#2a2a2a] hover:bg-gray-700"
                  }`}
                  onClick={() => handleTeamSelect(team2Abbr)}
                  disabled={hasVoted}
                >
                  <TeamLogo teamAbbr={matchup.team2.abbr} size={60} />
                  <div className="mt-2 font-bold">{team2Abbr}</div>
                </button>
                <button
                  className={`p-4 rounded-lg flex flex-col items-center ${
                    selectedTeam === team1Abbr ? "bg-gray-700" : "bg-[#2a2a2a] hover:bg-gray-700"
                  }`}
                  onClick={() => handleTeamSelect(team1Abbr)}
                  disabled={hasVoted}
                >
                  <TeamLogo teamAbbr={matchup.team1.abbr} size={60} />
                  <div className="mt-2 font-bold">{team1Abbr}</div>
                </button>
              </div>

              {hasVoted && (
                <div className="mt-4 bg-[#2a2a2a] p-4 rounded-lg">
                  <h3 className="text-center font-bold mb-3">Fan Predictions</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span>{team1Name}</span>
                    <span>{globalVotes[team1Abbr] || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${globalVotes[team1Abbr] || 0}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center mt-3 mb-2">
                    <span>{team2Name}</span>
                    <span>{globalVotes[team2Abbr] || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-red-500 h-2.5 rounded-full"
                      style={{ width: `${globalVotes[team2Abbr] || 0}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {predictionQuestions.map((item, index) => (
                <div key={index} className="bg-[#2a2a2a] rounded-lg overflow-hidden">
                  <button
                    className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-700"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span>{item.question}</span>
                    {expandedQuestion === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {expandedQuestion === index && (
                    <div className="p-4 bg-gray-800 border-t border-gray-700">
                      <div className="font-medium mb-1">{item.answer}</div>
                      <div className="text-sm text-gray-400">
                        Confidence:{" "}
                        <span className={item.confidence === "High" ? "text-green-500" : "text-yellow-500"}>
                          {item.confidence}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Our Pick</h2>
          <div className="bg-[#1e1e1e] rounded-lg p-6 mb-8">
            <p className="text-lg">Written by AI..</p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Stats</h2>
          <div className="bg-[#1e1e1e] rounded-lg p-4 mb-4">
            <p className="mb-2">{matchup.stats}</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-bold mb-2">{matchup.team2.name}</h3>
                <p>FG%: {matchup.team2.stats.fg}</p>
                <p>3PM: {matchup.team2.stats.threePoint}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">{matchup.team1.name}</h3>
                <p>FG%: {matchup.team1.stats.fg}</p>
                <p>3PM: {matchup.team1.stats.threePoint}</p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <Link href="/team-statistics">
              <Button variant="outline" className="bg-gray-700 hover:bg-gray-600">
                Stats Page
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
