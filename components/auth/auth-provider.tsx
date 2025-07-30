"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email?: string
  avatar?: string
  createdAt: string
  preferences: {
    theme: "light" | "dark" | "night"
    notifications: boolean
    dataRetention: number // days
  }
  stats: {
    totalSessions: number
    moodEntries: number
    checkinStreak: number
    lastActive: string
  }
}

interface AuthContextType {
  user: User | null
  login: (userData: Partial<User>) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("mindease-user")
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)

          // Update last active timestamp
          const updatedUser = {
            ...userData,
            stats: {
              ...userData.stats,
              lastActive: new Date().toISOString(),
            },
          }
          setUser(updatedUser)
          localStorage.setItem("mindease-user", JSON.stringify(updatedUser))
        }
      } catch (error) {
        console.error("Error loading user:", error)
        localStorage.removeItem("mindease-user")
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (userData: Partial<User>) => {
    const newUser: User = {
      id: userData.id || Date.now().toString(),
      name: userData.name || "Anonymous",
      email: userData.email,
      avatar: userData.avatar,
      createdAt: userData.createdAt || new Date().toISOString(),
      preferences: {
        theme: "light",
        notifications: true,
        dataRetention: 30,
        ...userData.preferences,
      },
      stats: {
        totalSessions: 1,
        moodEntries: 0,
        checkinStreak: 0,
        lastActive: new Date().toISOString(),
        ...userData.stats,
      },
    }

    setUser(newUser)
    localStorage.setItem("mindease-user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mindease-user")
    // Clear other user data
    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
      if (key.startsWith("mindease-")) {
        localStorage.removeItem(key)
      }
    })
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return

    const updatedUser = {
      ...user,
      ...updates,
      stats: {
        ...user.stats,
        ...updates.stats,
        lastActive: new Date().toISOString(),
      },
    }

    setUser(updatedUser)
    localStorage.setItem("mindease-user", JSON.stringify(updatedUser))
  }

  return <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
