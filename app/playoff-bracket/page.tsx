"use client"

import { useState } from "react"
import TeamLogo from "@/components/team-logo"

export default function PlayoffBracketPage() {
  const [year] = useState(2025)

  // First round matchups - all complete with 4 wins
  const westFirstRound = [
    { team1: { seed: 1, abbr: "OKC", wins: 4 }, team2: { seed: 8, abbr: "MEM", wins: 0 } },
    { team1: { seed: 4, abbr: "DEN", wins: 4 }, team2: { seed: 5, abbr: "LAC", wins: 2 } },
    { team1: { seed: 3, abbr: "LAL", wins: 1 }, team2: { seed: 6, abbr: "MIN", wins: 4 } },
    { team1: { seed: 2, abbr: "HOU", wins: 4 }, team2: { seed: 7, abbr: "GSW", wins: 1 } },
  ]

  const eastFirstRound = [
    { team1: { seed: 1, abbr: "CLE", wins: 4 }, team2: { seed: 8, abbr: "MIA", wins: 0 } },
    { team1: { seed: 4, abbr: "IND", wins: 1 }, team2: { seed: 5, abbr: "MIL", wins: 4 } },
    { team1: { seed: 3, abbr: "NYK", wins: 4 }, team2: { seed: 6, abbr: "DET", wins: 1 } },
    { team1: { seed: 2, abbr: "BOS", wins: 4 }, team2: { seed: 7, abbr: "ORL", wins: 0 } },
  ]

  // Second round matchups (based on first round winners)
  const westSecondRound = [
    { team1: { seed: 1, abbr: "OKC", wins: 4 }, team2: { seed: 4, abbr: "DEN", wins: 2 } },
    { team1: { seed: 6, abbr: "MIN", wins: 3 }, team2: { seed: 2, abbr: "HOU", wins: 4 } },
  ]

  const eastSecondRound = [
    { team1: { seed: 1, abbr: "CLE", wins: 4 }, team2: { seed: 5, abbr: "MIL", wins: 1 } },
    { team1: { seed: 3, abbr: "NYK", wins: 2 }, team2: { seed: 2, abbr: "BOS", wins: 4 } },
  ]

  // Conference Finals
  const westFinals = {
    team1: { seed: 1, abbr: "OKC", wins: 4 },
    team2: { seed: 2, abbr: "HOU", wins: 2 },
  }

  const eastFinals = {
    team1: { seed: 1, abbr: "CLE", wins: 3 },
    team2: { seed: 2, abbr: "BOS", wins: 4 },
  }

  // NBA Finals
  const nbaFinals = {
    team1: { seed: 1, abbr: "OKC", wins: 4 },
    team2: { seed: 2, abbr: "BOS", wins: 2 },
  }

  // Helper function to render a playoff matchup
  const renderMatchup = (matchup: any) => {
    const { team1, team2 } = matchup
    const seriesText = `${team1.wins}-${team2.wins}`
    const team1Leading = team1.wins > team2.wins
    const team2Leading = team2.wins > team1.wins
    const seriesComplete = team1.wins === 4 || team2.wins === 4

    return (
      <div className="flex flex-col bg-[#2a2a2a] rounded-lg overflow-hidden mb-2 h-[120px]">
        <div
          className={`flex items-center p-2 ${team1Leading && !seriesComplete ? "bg-[#333]" : ""} ${seriesComplete && team1.wins > team2.wins ? "bg-green-900/30" : ""}`}
        >
          <div className="w-6 text-center font-bold mr-2">{team1.seed}</div>
          <div className="w-8 h-8 mr-2">
            <TeamLogo teamAbbr={team1.abbr} size={32} />
          </div>
          <div className="flex-1 font-medium">{team1.abbr}</div>
          <div className={`font-bold ${team1Leading ? "text-green-500" : ""}`}>{team1.wins}</div>
        </div>
        <div
          className={`flex items-center p-2 ${team2Leading && !seriesComplete ? "bg-[#333]" : ""} ${seriesComplete && team2.wins > team1.wins ? "bg-green-900/30" : ""}`}
        >
          <div className="w-6 text-center font-bold mr-2">{team2.seed}</div>
          <div className="w-8 h-8 mr-2">
            <TeamLogo teamAbbr={team2.abbr} size={32} />
          </div>
          <div className="flex-1 font-medium">{team2.abbr}</div>
          <div className={`font-bold ${team2Leading ? "text-green-500" : ""}`}>{team2.wins}</div>
        </div>
        <div className="text-center text-sm py-1 bg-[#1e1e1e] border-t border-gray-700">
          {seriesComplete ? <span className="text-green-500">Series Complete</span> : <span>Series: {seriesText}</span>}
        </div>
      </div>
    )
  }

  // Helper function to render the NBA Finals matchup
  const renderNBAFinals = (matchup: any) => {
    const { team1, team2 } = matchup
    const seriesText = `${team1.wins}-${team2.wins}`
    const team1Leading = team1.wins > team2.wins
    const team2Leading = team2.wins > team1.wins
    const seriesComplete = team1.wins === 4 || team2.wins === 4

    return (
      <div className="flex flex-col bg-[#2a2a2a] rounded-lg overflow-hidden mb-2 h-[120px]">
        <div
          className={`flex items-center p-2 ${team1Leading && !seriesComplete ? "bg-[#333]" : ""} ${seriesComplete && team1.wins > team2.wins ? "bg-green-900/30" : ""}`}
        >
          <div className="w-6 text-center font-bold mr-2">{team1.seed}</div>
          <div className="w-8 h-8 mr-2">
            <TeamLogo teamAbbr={team1.abbr} size={32} />
          </div>
          <div className="flex-1 font-medium">{team1.abbr}</div>
          <div className={`font-bold ${team1Leading ? "text-green-500" : ""}`}>{team1.wins}</div>
        </div>
        <div
          className={`flex items-center p-2 ${team2Leading && !seriesComplete ? "bg-[#333]" : ""} ${seriesComplete && team2.wins > team1.wins ? "bg-green-900/30" : ""}`}
        >
          <div className="w-6 text-center font-bold mr-2">{team2.seed}</div>
          <div className="w-8 h-8 mr-2">
            <TeamLogo teamAbbr={team2.abbr} size={32} />
          </div>
          <div className="flex-1 font-medium">{team2.abbr}</div>
          <div className={`font-bold ${team2Leading ? "text-green-500" : ""}`}>{team2.wins}</div>
        </div>
        <div className="text-center text-sm py-1 bg-[#1e1e1e] border-t border-gray-700">
          {seriesComplete ? <span className="text-green-500">Series Complete</span> : <span>Series: {seriesText}</span>}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">{year} NBA Playoffs</h1>

      <div className="text-center mb-8 bg-[#2a2a2a] p-4 rounded-lg">
        <p className="text-lg">This is our prediction for how the {year} NBA Playoffs will unfold.</p>
        <p className="text-gray-400 mt-2">All series are best-of-7 games. First team to win 4 games advances.</p>
      </div>

      <div className="relative">
        {/* Horizontal Bracket Layout */}
        <div className="flex flex-row relative z-10">
          {/* Western Conference Label - Vertical */}
          <div className="flex flex-col justify-center items-center w-[50px] mr-2">
            <div className="transform -rotate-90 whitespace-nowrap">
              <h2 className="text-2xl font-bold">Western Conference</h2>
            </div>
          </div>

          {/* Western Conference - First Round */}
          <div className="flex flex-col space-y-4 w-[250px]">
            <h3 className="text-xl font-bold text-center mb-2">First Round</h3>
            <div>{renderMatchup(westFirstRound[0])}</div>
            <div className="mt-4">{renderMatchup(westFirstRound[1])}</div>
            <div className="mt-4">{renderMatchup(westFirstRound[2])}</div>
            <div className="mt-4">{renderMatchup(westFirstRound[3])}</div>
          </div>

          {/* Western Conference - Second Round */}
          <div className="flex flex-col justify-center space-y-16 w-[250px] mx-4">
            <h3 className="text-xl font-bold text-center mb-2">Second Round</h3>
            <div>{renderMatchup(westSecondRound[0])}</div>
            <div className="mt-16">{renderMatchup(westSecondRound[1])}</div>
          </div>

          {/* Western Conference - Finals */}
          <div className="flex flex-col justify-center w-[250px]">
            <h3 className="text-xl font-bold text-center mb-2">West Finals</h3>
            <div className="mt-16">{renderMatchup(westFinals)}</div>
          </div>

          {/* NBA Finals - Center */}
          <div className="flex flex-col justify-center items-center w-[250px] mx-4">
            <h3 className="text-xl font-bold text-center mb-2">NBA Finals</h3>
            <div className="mt-16">{renderNBAFinals(nbaFinals)}</div>
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold">CHAMPIONS</h3>
              <div className="flex items-center justify-center mt-2">
                <div className="w-10 h-10 mr-2">
                  <TeamLogo
                    teamAbbr={nbaFinals.team1.wins > nbaFinals.team2.wins ? nbaFinals.team1.abbr : nbaFinals.team2.abbr}
                    size={40}
                  />
                </div>
                <span className="text-xl font-bold">
                  {nbaFinals.team1.wins > nbaFinals.team2.wins ? nbaFinals.team1.abbr : nbaFinals.team2.abbr}
                </span>
              </div>
            </div>
          </div>

          {/* Eastern Conference - Finals */}
          <div className="flex flex-col justify-center w-[250px]">
            <h3 className="text-xl font-bold text-center mb-2">East Finals</h3>
            <div className="mt-16">{renderMatchup(eastFinals)}</div>
          </div>

          {/* Eastern Conference - Second Round */}
          <div className="flex flex-col justify-center space-y-16 w-[250px] mx-4">
            <h3 className="text-xl font-bold text-center mb-2">Second Round</h3>
            <div>{renderMatchup(eastSecondRound[0])}</div>
            <div className="mt-16">{renderMatchup(eastSecondRound[1])}</div>
          </div>

          {/* Eastern Conference - First Round */}
          <div className="flex flex-col space-y-4 w-[250px]">
            <h3 className="text-xl font-bold text-center mb-2">First Round</h3>
            <div>{renderMatchup(eastFirstRound[0])}</div>
            <div className="mt-4">{renderMatchup(eastFirstRound[1])}</div>
            <div className="mt-4">{renderMatchup(eastFirstRound[2])}</div>
            <div className="mt-4">{renderMatchup(eastFirstRound[3])}</div>
          </div>

          {/* Eastern Conference Label - Vertical */}
          <div className="flex flex-col justify-center items-center w-[50px] ml-2">
            <div className="transform rotate-90 whitespace-nowrap">
              <h2 className="text-2xl font-bold">Eastern Conference</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
