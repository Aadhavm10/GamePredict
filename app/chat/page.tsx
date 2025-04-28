"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User } from "lucide-react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"

interface ChatMessage {
  id: string
  text: string
  sender: {
    name: string
    image: string | null
  }
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [userData, setUserData] = useState({
    fullName: "Anonymous User",
    profileImage: null as string | null,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load user data and initial messages on component mount
  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem("userData")
    const savedProfileImage = localStorage.getItem("profileImage")

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUserData({
        fullName: parsedUser.fullName || "Anonymous User",
        profileImage: savedProfileImage,
      })
    }

    // Load saved messages from localStorage
    const savedMessages = localStorage.getItem("chatMessages")
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        // Convert string timestamps back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error("Error parsing saved messages:", error)
      }
    } else {
      // Add some initial messages if none exist
      const initialMessages: ChatMessage[] = [
        {
          id: "1",
          text: "Welcome to the GamePredict chat! Discuss predictions and games with other users.",
          sender: {
            name: "GamePredict Bot",
            image: "/images/gamepredict-logo.png",
          },
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        },
        {
          id: "2",
          text: "I think the Cavaliers are going to win it all this year!",
          sender: {
            name: "Basketball Fan",
            image: null,
          },
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        },
        {
          id: "3",
          text: "No way, the Thunder have been dominating all season.",
          sender: {
            name: "OKC Supporter",
            image: null,
          },
          timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        },
      ]
      setMessages(initialMessages)
      localStorage.setItem("chatMessages", JSON.stringify(initialMessages))
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: {
        name: userData.fullName,
        image: userData.profileImage,
      },
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, newMsg]
    setMessages(updatedMessages)
    setNewMessage("")

    // Save to localStorage
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages))
  }

  const formatMessageTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true })
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Global Chat</h1>

      <div className="bg-[#2a2a2a] rounded-lg overflow-hidden flex flex-col h-[70vh]">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender.name === userData.fullName ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender.name === userData.fullName
                    ? "bg-[#3a3a3a] rounded-tr-none"
                    : "bg-[#333] rounded-tl-none"
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.sender.name !== userData.fullName && (
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-gray-700 flex items-center justify-center">
                      {message.sender.image ? (
                        <Image
                          src={message.sender.image || "/placeholder.svg"}
                          alt={message.sender.name}
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      ) : (
                        <User size={16} className="text-gray-300" />
                      )}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-300">{message.sender.name}</span>
                  <span className="text-xs text-gray-500 ml-2">{formatMessageTime(message.timestamp)}</span>
                </div>
                <p className="text-white">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <div className="border-t border-gray-700 p-3">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-[#333] border-gray-700"
            />
            <Button type="submit" size="icon" className="ml-2">
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>

      <p className="text-center text-gray-400 mt-4 text-sm">
        Messages are stored locally and will be visible to all users of this device.
      </p>
    </div>
  )
}
