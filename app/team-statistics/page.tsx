"use client"

import { useState } from "react"
import TeamLogo from "@/components/team-logo"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { teamFullNames } from "@/lib/team-logos"

export default function TeamStatisticsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Mock data for team statistics
  const pointsPerGame = [
    { team: "Cavaliers", abbr: "CLE", value: 122.4 },
    { team: "Grizzlies", abbr: "MEM", value: 121.8 },
    { team: "Nuggets", abbr: "DEN", value: 121.8 },
  ]

  const fieldGoalPercentage = [
    { team: "Nuggets", abbr: "DEN", value: 50.5 },
    { team: "Cavaliers", abbr: "CLE", value: 49.3 },
    { team: "Pacers", abbr: "IND", value: 49.1 },
  ]

  const threePointPercentage = [
    { team: "Bucks", abbr: "MIL", value: 38.5 },
    { team: "Suns", abbr: "PHX", value: 38.4 },
    { team: "Cavaliers", abbr: "CLE", value: 38.3 },
  ]

  const netRating = [
    { team: "Thunder", abbr: "OKC", value: 13.2 },
    { team: "Cavaliers", abbr: "CLE", value: 9.8 },
    { team: "Celtics", abbr: "BOS", value: 9.1 },
  ]

  const offensiveRating = [
    { team: "Thunder", abbr: "OKC", value: 121.6 },
    { team: "Cavaliers", abbr: "CLE", value: 119.6 },
    { team: "Celtics", abbr: "BOS", value: 119.1 },
  ]

  const defensiveRating = [
    { team: "Cavaliers", abbr: "CLE", value: 105.9 },
    { team: "Grizzlies", abbr: "MEM", value: 109.2 },
    { team: "Nuggets", abbr: "DEN", value: 109.3 },
  ]

  // Generate full team stats for each category
  const generateFullTeamStats = (topTeams: any[], statName: string) => {
    // Create a base array with all teams
    const allTeams = Object.entries(teamFullNames).map(([abbr, name]) => {
      // Check if this team is in the top teams
      const topTeam = topTeams.find((t) => t.abbr === abbr)

      // If it's a top team, use its actual value, otherwise generate a random value
      let value: number

      if (topTeam) {
        value = topTeam.value
      } else {
        // Generate a random value based on the stat type
        switch (statName) {
          case "Points Per Game":
            value = Math.round((95 + Math.random() * 25) * 10) / 10
            break
          case "Field Goal Percentage":
            value = Math.round((40 + Math.random() * 10) * 10) / 10
            break
          case "Three Point Percentage":
            value = Math.round((30 + Math.random() * 8) * 10) / 10
            break
          case "Net Rating":
            value = Math.round((Math.random() * 20 - 10) * 10) / 10
            break
          case "Offensive Rating":
            value = Math.round((100 + Math.random() * 20) * 10) / 10
            break
          case "Defensive Rating":
            value = Math.round((105 + Math.random() * 15) * 10) / 10
            break
          default:
            value = Math.round(Math.random() * 100)
        }
      }

      return {
        team: name.split(" ").pop() || name, // Just use the last part of the name
        fullName: name,
        abbr,
        value,
      }
    })

    // Sort based on the stat type (some stats are better when lower)
    if (statName === "Defensive Rating") {
      return allTeams.sort((a, b) => a.value - b.value)
    } else {
      return allTeams.sort((a, b) => b.value - a.value)
    }
  }

  // Get the appropriate data for the selected category
  const getCategoryData = (category: string) => {
    switch (category) {
      case "Points Per Game":
        return generateFullTeamStats(pointsPerGame, category)
      case "Field Goal Percentage":
        return generateFullTeamStats(fieldGoalPercentage, category)
      case "Three Point Percentage":
        return generateFullTeamStats(threePointPercentage, category)
      case "Net Rating":
        return generateFullTeamStats(netRating, category)
      case "Offensive Rating":
        return generateFullTeamStats(offensiveRating, category)
      case "Defensive Rating":
        return generateFullTeamStats(defensiveRating, category)
      default:
        return []
    }
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  const closeModal = () => {
    setSelectedCategory(null)
  }

  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold text-center mb-12">Team Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          title="Points Per Game"
          data={pointsPerGame}
          onTitleClick={() => handleCategoryClick("Points Per Game")}
        />
        <StatCard
          title="Field Goal Percentage"
          data={fieldGoalPercentage}
          onTitleClick={() => handleCategoryClick("Field Goal Percentage")}
        />
        <StatCard
          title="Three Point Percentage"
          data={threePointPercentage}
          onTitleClick={() => handleCategoryClick("Three Point Percentage")}
        />
        <StatCard title="Net Rating" data={netRating} onTitleClick={() => handleCategoryClick("Net Rating")} />
        <StatCard
          title="Offensive Rating"
          data={offensiveRating}
          onTitleClick={() => handleCategoryClick("Offensive Rating")}
        />
        <StatCard
          title="Defensive Rating"
          data={defensiveRating}
          onTitleClick={() => handleCategoryClick("Defensive Rating")}
        />
      </div>

      {/* Full Stats Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedCategory}</h2>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X size={20} />
              </Button>
            </div>
            <div className="overflow-y-auto p-4 flex-grow">
              <div className="grid grid-cols-1 gap-2">
                {getCategoryData(selectedCategory).map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-lg ${index < 3 ? "bg-[#2a2a2a]" : "bg-[#222]"}`}
                  >
                    <div className="w-8 text-center font-bold text-gray-400 mr-2">{index + 1}</div>
                    <div className="w-10 h-10 mr-3 flex items-center justify-center">
                      <TeamLogo teamAbbr={item.abbr} size={40} />
                    </div>
                    <div className="flex-1">{item.fullName}</div>
                    <div className="font-bold">
                      {selectedCategory.includes("Percentage") ? `${item.value}%` : item.value}
                    </div>
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

function StatCard({
  title,
  data,
  onTitleClick,
}: {
  title: string
  data: { team: string; abbr: string; value: number }[]
  onTitleClick: () => void
}) {
  return (
    <div className="bg-[#2a2a2a] rounded-lg overflow-hidden">
      <button
        className="w-full p-4 text-xl font-bold text-center border-b border-gray-700 hover:bg-gray-700 transition-colors"
        onClick={onTitleClick}
      >
        {title}
      </button>
      <div className="p-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center p-3 border-b border-gray-700 last:border-0">
            <div className="w-10 h-10 mr-3 flex items-center justify-center">
              <TeamLogo teamAbbr={item.abbr} size={40} />
            </div>
            <div className="flex-1">{item.team}</div>
            <div className="font-bold">{title.includes("Percentage") ? `${item.value}%` : item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
