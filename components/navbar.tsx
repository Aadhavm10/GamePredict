"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    phoneNumber: "",
  })

  // Load user data on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("userData")
    if (savedUser) {
      setIsLoggedIn(true)
      const userData = JSON.parse(savedUser)
      setFormData((prev) => ({
        ...prev,
        fullName: userData.fullName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        birthday: userData.birthday || "",
      }))
    }

    const savedProfileImage = localStorage.getItem("profileImage")
    if (savedProfileImage) {
      setProfileImage(savedProfileImage)
    }

    // Listen for custom event to open login modal
    const handleOpenLoginModal = () => {
      setShowProfileModal(true)
      setIsLoggedIn(false)
      setIsSignUp(false)
      setIsForgotPassword(false)
    }

    document.addEventListener("openLoginModal", handleOpenLoginModal)

    return () => {
      document.removeEventListener("openLoginModal", handleOpenLoginModal)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileClick = () => {
    setShowProfileModal(true)
    setIsForgotPassword(false)
  }

  const closeModal = () => {
    setShowProfileModal(false)
    setIsForgotPassword(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isForgotPassword) {
      alert("Password reset link sent to your email!")
      setIsForgotPassword(false)
      return
    }

    if (isSignUp) {
      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!")
        return
      }
    }

    // Save user data
    localStorage.setItem(
      "userData",
      JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        birthday: formData.birthday,
        phoneNumber: formData.phoneNumber,
      }),
    )

    setIsLoggedIn(true)
    closeModal()

    // Refresh the page to update the UI
    window.location.reload()
  }

  const handleLogout = () => {
    localStorage.removeItem("userData")
    localStorage.removeItem("favoriteTeams")
    localStorage.removeItem("userNickname")
    // Don't remove profile image or theme settings
    setIsLoggedIn(false)
    closeModal()

    // Refresh the page to update the UI
    window.location.reload()
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setIsForgotPassword(false)
  }

  const handleForgotPassword = () => {
    setIsForgotPassword(true)
  }

  return (
    <nav className="bg-[#1a1a1a] py-4 px-6 border-b border-gray-800">
      <div className="container mx-auto flex items-center">
        <Link href="/about" className="flex items-center mr-12">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
            <Image
              src="/images/gamepredict-logo.png"
              alt="GamePredict"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="text-2xl font-bold">GamePredict</span>
        </Link>

        <div className="flex items-center space-x-8">
          <Link href="/" className={`hover:text-gray-300 ${pathname === "/" ? "font-semibold" : ""}`}>
            Home
          </Link>
          <Link
            href="/team-statistics"
            className={`hover:text-gray-300 ${pathname === "/team-statistics" ? "font-semibold" : ""}`}
          >
            Team Statistics
          </Link>
          <Link
            href="/prediction-history"
            className={`hover:text-gray-300 ${pathname === "/prediction-history" ? "font-semibold" : ""}`}
          >
            Prediction History
          </Link>
          <Link
            href="/playoff-bracket"
            className={`hover:text-gray-300 ${pathname === "/playoff-bracket" ? "font-semibold" : ""}`}
          >
            Playoff Bracket
          </Link>
          <Link href="/chat" className={`hover:text-gray-300 ${pathname === "/chat" ? "font-semibold" : ""}`}>
            Chat
          </Link>
          <Link href="/settings" className={`hover:text-gray-300 ${pathname === "/settings" ? "font-semibold" : ""}`}>
            Settings
          </Link>
        </div>

        <button onClick={handleProfileClick} className="ml-auto">
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <Image
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <User className="text-white" size={20} />
            )}
          </div>
        </button>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e] rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 p-4 border-b border-gray-700 flex justify-between items-center bg-[#1e1e1e] z-10">
              <h2 className="text-xl font-bold">
                {isLoggedIn ? "Profile" : isForgotPassword ? "Reset Password" : isSignUp ? "Sign Up" : "Log In"}
              </h2>
              <button className="p-2 hover:bg-gray-700 rounded-full" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {isLoggedIn ? (
                <div className="space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gray-600 overflow-hidden mb-4">
                      {profileImage ? (
                        <Image
                          src={profileImage || "/placeholder.svg"}
                          alt="Profile"
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-4 text-white" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold">{formData.fullName || "User"}</h3>
                    <p className="text-gray-400">{formData.email}</p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="destructive" onClick={handleLogout}>
                      Log Out
                    </Button>
                    <Button onClick={() => (window.location.href = "/settings")}>Edit Profile</Button>
                  </div>
                </div>
              ) : isForgotPassword ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-gray-400 mb-4">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-[#333] border-gray-700"
                    />
                  </div>
                  <div className="pt-4">
                    <Button type="submit" className="w-full">
                      Send Reset Link
                    </Button>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-white"
                      onClick={() => setIsForgotPassword(false)}
                    >
                      Back to Login
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="bg-[#333] border-gray-700"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-[#333] border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="bg-[#333] border-gray-700"
                    />
                  </div>
                  {isSignUp && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <Input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="bg-[#333] border-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Birthday</label>
                        <Input
                          type="date"
                          name="birthday"
                          value={formData.birthday}
                          onChange={handleInputChange}
                          className="bg-[#333] border-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <Input
                          type="tel"
                          name="phoneNumber"
                          placeholder="###-###-####"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="bg-[#333] border-gray-700"
                        />
                      </div>
                    </>
                  )}
                  <div className="pt-4">
                    <Button type="submit" className="w-full">
                      {isSignUp ? "Sign Up" : "Log In"}
                    </Button>
                  </div>
                  {!isSignUp && (
                    <div className="text-center mt-2">
                      <button type="button" className="text-gray-400 hover:text-white" onClick={handleForgotPassword}>
                        Forgot Password?
                      </button>
                    </div>
                  )}
                  <div className="text-center mt-4">
                    <button type="button" className="text-gray-400 hover:text-white" onClick={toggleMode}>
                      {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
