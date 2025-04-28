"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { SettingsIcon, X, Plus, Upload, Check, Sun, Moon, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import TeamLogo from "@/components/team-logo"
import { teamFullNames } from "@/lib/team-logos"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    birthday: "",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isEditingTeams, setIsEditingTeams] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [selectedNickname, setSelectedNickname] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const router = useRouter()

  // Mock data for favorite teams
  const [favoriteTeams, setFavoriteTeams] = useState<{ name: string; abbr: string }[]>([])

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("userData")
    if (savedData) {
      setUserData(JSON.parse(savedData))
      setIsLoggedIn(true)
    }

    const savedTeams = localStorage.getItem("favoriteTeams")
    if (savedTeams) {
      setFavoriteTeams(JSON.parse(savedTeams))
    }

    const savedProfileImage = localStorage.getItem("profileImage")
    if (savedProfileImage) {
      setProfileImage(savedProfileImage)
    }

    const savedNickname = localStorage.getItem("userNickname")
    if (savedNickname) {
      setSelectedNickname(savedNickname)
    }

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    }
  }, [])

  // Effect to apply theme changes
  useEffect(() => {
    // This is a simplified implementation - in a real app, you'd use a theme provider
    if (!isDarkMode) {
      document.documentElement.classList.add("light-mode")
    } else {
      document.documentElement.classList.remove("light-mode")
    }

    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    // Save user data to localStorage
    localStorage.setItem("userData", JSON.stringify(userData))
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleSaveNickname = () => {
    localStorage.setItem("userNickname", selectedNickname)
    alert("Nickname updated successfully!")
  }

  const handleEditProfile = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }
    setIsEditing(true)
  }

  const handleEditTeams = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }
    setIsEditingTeams(true)
  }

  const handleSaveTeams = () => {
    localStorage.setItem("favoriteTeams", JSON.stringify(favoriteTeams))
    setIsEditingTeams(false)
    alert("Favorite teams updated successfully!")
  }

  const handleRemoveTeam = (index: number) => {
    setFavoriteTeams((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddTeam = (abbr: string, name: string) => {
    if (favoriteTeams.length < 3) {
      setFavoriteTeams((prev) => [...prev, { name, abbr }])
    } else {
      alert("You can only have up to 3 favorite teams. Please remove one first.")
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageUrl = event.target.result.toString()
          setProfileImage(imageUrl)
          localStorage.setItem("profileImage", imageUrl)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNicknameChange = (nickname: string) => {
    setSelectedNickname(nickname === "None" ? "" : nickname)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light")
  }

  const redirectToLogin = () => {
    setShowLoginPrompt(false)
    // Simulate opening the login modal by triggering a click on the profile button in navbar
    const event = new CustomEvent("openLoginModal")
    document.dispatchEvent(event)
    // In a real app, you might use router.push('/login') or similar
  }

  // Get all available teams
  const allTeams = Object.entries(teamFullNames).map(([abbr, name]) => ({
    abbr,
    name,
  }))

  // Filter out teams that are already favorites
  const availableTeams = allTeams.filter((team) => !favoriteTeams.some((favTeam) => favTeam.abbr === team.abbr))

  // List of nicknames
  const nicknames = [
    "Sports Enthusiast",
    "Basketball Fanatic",
    "NBA Expert",
    "Hoops Analyst",
    "Court Visionary",
    "Stats Guru",
    "Prediction Master",
    "Betting Wizard",
    "Odds Calculator",
    "None",
  ]

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e] rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Login Required</h2>
            <p className="mb-6">You need to be logged in to edit your profile settings.</p>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowLoginPrompt(false)}>
                Cancel
              </Button>
              <Button onClick={redirectToLogin} className="flex items-center">
                <LogIn className="mr-2" size={16} />
                Log In
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center mb-8">
        <div className="w-20 h-20 bg-gray-600 rounded-full overflow-hidden mr-6 relative group">
          {profileImage ? (
            <Image
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="text-white" size={40} />
            </div>
          )}
          {isEditing && (
            <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <Upload size={24} />
              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
            </label>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{userData.fullName || "User's Name"}</h1>
          <p className="text-gray-400">{selectedNickname}</p>
        </div>
        <Button variant="outline" className="ml-auto" onClick={handleEditProfile}>
          Edit Profile
        </Button>
      </div>

      <div className="bg-[#2a2a2a] rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-bold">Nickname</h2>
        </div>
        <p className="text-center text-gray-400 mb-6">Choose how you want to be known</p>

        {isLoggedIn ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {nicknames.map((nickname) => (
                <button
                  key={nickname}
                  className={`p-3 rounded-md flex items-center justify-between ${
                    selectedNickname === (nickname === "None" ? "" : nickname)
                      ? "bg-gray-700"
                      : "bg-[#333] hover:bg-gray-600"
                  }`}
                  onClick={() => isLoggedIn && handleNicknameChange(nickname)}
                  disabled={!isEditing || !isLoggedIn}
                >
                  <span>{nickname}</span>
                  {selectedNickname === (nickname === "None" ? "" : nickname) && (
                    <Check size={16} className="text-green-500" />
                  )}
                </button>
              ))}
            </div>

            {isEditing && isLoggedIn && (
              <div className="mt-6 text-center">
                <Button onClick={handleSaveNickname}>Save Nickname</Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">You need to be logged in to set a nickname.</p>
            <Button onClick={redirectToLogin} className="flex items-center mx-auto">
              <LogIn className="mr-2" size={16} />
              Log In
            </Button>
          </div>
        )}
      </div>

      <div className="bg-[#2a2a2a] rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">Favorite Teams</h2>
          {isEditing && isLoggedIn && (
            <Button variant="outline" size="sm" onClick={handleEditTeams} disabled={isEditingTeams}>
              Edit Favorite Teams
            </Button>
          )}
        </div>

        {isEditingTeams ? (
          <div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {favoriteTeams.map((team, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-[#333] rounded-lg relative">
                  <button
                    className="absolute top-2 right-2 p-1 bg-red-500/20 rounded-full hover:bg-red-500/40"
                    onClick={() => handleRemoveTeam(index)}
                  >
                    <X size={16} />
                  </button>
                  <TeamLogo teamAbbr={team.abbr} size={60} />
                  <div className="mt-2 text-center">{team.name}</div>
                  <div className="text-sm text-gray-400">Basketball Team</div>
                </div>
              ))}
              {favoriteTeams.length < 3 && (
                <div className="flex flex-col items-center justify-center p-4 bg-[#333] rounded-lg border-2 border-dashed border-gray-600 min-h-[160px]">
                  <p className="text-gray-400 text-center mb-2">Add a favorite team</p>
                  <Plus size={24} className="text-gray-400" />
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-bold mb-3">Available Teams</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto p-2">
                {availableTeams.map((team) => (
                  <button
                    key={team.abbr}
                    className="flex items-center p-2 bg-[#333] rounded hover:bg-gray-700 disabled:opacity-50"
                    onClick={() => handleAddTeam(team.abbr, team.name)}
                    disabled={favoriteTeams.length >= 3}
                  >
                    <TeamLogo teamAbbr={team.abbr} size={30} />
                    <span className="ml-2 text-sm">{team.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button onClick={handleSaveTeams}>Save Teams</Button>
            </div>
          </div>
        ) : (
          <div>
            {favoriteTeams.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {favoriteTeams.map((team, index) => (
                  <div key={index} className="flex flex-col items-center p-4 bg-[#333] rounded-lg">
                    <TeamLogo teamAbbr={team.abbr} size={60} />
                    <div className="mt-2 text-center">{team.name}</div>
                    <div className="text-sm text-gray-400">Basketball Team</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                {isLoggedIn ? "No favorite teams selected yet." : "Log in to add your favorite teams."}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-[#2a2a2a] rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <SettingsIcon className="ml-2" />
        </div>
        <p className="text-center text-gray-400 mb-6">Update your details and preferences</p>

        {isLoggedIn ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-[#333] border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-[#333] border-gray-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="###-###-####"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-[#333] border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Birthday</label>
                <Input
                  type="date"
                  name="birthday"
                  value={userData.birthday}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-[#333] border-gray-700"
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 text-center">
                <Button onClick={handleSaveChanges}>Save Profile</Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">You need to be logged in to manage your profile settings.</p>
            <Button onClick={redirectToLogin} className="flex items-center mx-auto">
              <LogIn className="mr-2" size={16} />
              Log In
            </Button>
          </div>
        )}
      </div>

      <div className="bg-[#2a2a2a] rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-2xl font-bold">Appearance</h2>
        </div>

        <div className="flex items-center justify-between p-4 bg-[#333] rounded-lg">
          <div className="flex items-center">
            {isDarkMode ? <Moon className="mr-3" /> : <Sun className="mr-3" />}
            <div>
              <div className="font-medium">{isDarkMode ? "Dark Mode" : "Light Mode"}</div>
              <div className="text-sm text-gray-400">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</div>
            </div>
          </div>
          <Switch checked={!isDarkMode} onCheckedChange={toggleTheme} />
        </div>
      </div>
    </div>
  )
}
