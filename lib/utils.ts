import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to save user data to localStorage
export function saveUserData(data: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("userData", JSON.stringify(data))
  }
}

// Function to get user data from localStorage
export function getUserData() {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("userData")
    return data ? JSON.parse(data) : null
  }
  return null
}

// Function to format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}
