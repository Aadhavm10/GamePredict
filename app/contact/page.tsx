"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    // Reset submission status after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

      {isSubmitted ? (
        <div className="bg-green-800/30 p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">Thank You!</h2>
          <p>Your message has been sent. We'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#2a2a2a] p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-[#333] border-gray-700"
              />
            </div>
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
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Subject</label>
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="bg-[#333] border-gray-700"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="min-h-[150px] bg-[#333] border-gray-700"
            />
          </div>

          <div className="text-center">
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#2a2a2a] p-6 rounded-lg text-center">
          <h3 className="font-bold mb-2">Email</h3>
          <p className="text-gray-400">support@gamepredict.com</p>
        </div>

        <div className="bg-[#2a2a2a] p-6 rounded-lg text-center">
          <h3 className="font-bold mb-2">Phone</h3>
          <p className="text-gray-400">+1 (469) 349-4553</p>
        </div>

        <div className="bg-[#2a2a2a] p-6 rounded-lg text-center">
          <h3 className="font-bold mb-2">Address</h3>
          <p className="text-gray-400">2520 Rutford Ave, Richardson, TX 75080</p>
        </div>
      </div>
    </div>
  )
}
