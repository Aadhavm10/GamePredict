// Map of team abbreviations to their full names (for display purposes)
export const teamFullNames: Record<string, string> = {
  ATL: "Atlanta Hawks",
  BOS: "Boston Celtics",
  BKN: "Brooklyn Nets",
  CHA: "Charlotte Hornets",
  CHI: "Chicago Bulls",
  CLE: "Cleveland Cavaliers",
  DAL: "Dallas Mavericks",
  DEN: "Denver Nuggets",
  DET: "Detroit Pistons",
  GSW: "Golden State Warriors",
  HOU: "Houston Rockets",
  IND: "Indiana Pacers",
  LAC: "Los Angeles Clippers",
  LAL: "Los Angeles Lakers",
  MEM: "Memphis Grizzlies",
  MIA: "Miami Heat",
  MIL: "Milwaukee Bucks",
  MIN: "Minnesota Timberwolves",
  NOP: "New Orleans Pelicans",
  NYK: "New York Knicks",
  OKC: "Oklahoma City Thunder",
  ORL: "Orlando Magic",
  PHI: "Philadelphia 76ers",
  PHX: "Phoenix Suns",
  POR: "Portland Trail Blazers",
  SAC: "Sacramento Kings",
  SAS: "San Antonio Spurs",
  TOR: "Toronto Raptors",
  UTA: "Utah Jazz",
  WAS: "Washington Wizards",
}

// Map of team names to their abbreviations
export const teamNameToAbbr: Record<string, string> = {
  hawks: "ATL",
  celtics: "BOS",
  nets: "BKN",
  hornets: "CHA",
  bulls: "CHI",
  cavaliers: "CLE",
  mavericks: "DAL",
  nuggets: "DEN",
  pistons: "DET",
  warriors: "GSW",
  rockets: "HOU",
  pacers: "IND",
  clippers: "LAC",
  lakers: "LAL",
  grizzlies: "MEM",
  heat: "MIA",
  bucks: "MIL",
  timberwolves: "MIN",
  pelicans: "NOP",
  knicks: "NYK",
  thunder: "OKC",
  magic: "ORL",
  "76ers": "PHI",
  suns: "PHX",
  "trail blazers": "POR",
  kings: "SAC",
  spurs: "SAS",
  raptors: "TOR",
  jazz: "UTA",
  wizards: "WAS",
}

// Helper function to get a team abbreviation from a name
export function getTeamAbbr(teamName: string): string {
  const normalizedName = teamName.toLowerCase()
  return teamNameToAbbr[normalizedName] || teamName.toUpperCase()
}

// Helper function to get a team's full name from an abbreviation
export function getTeamFullName(abbr: string): string {
  return teamFullNames[abbr.toUpperCase()] || abbr
}
