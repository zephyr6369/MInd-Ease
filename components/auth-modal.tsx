"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface AuthModalProps {
  onAuth: (userData: { name: string; id: string }) => void
}

export function AuthModal({ onAuth }: AuthModalProps) {
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      const userData = {
        name: name.trim(),
        id: Date.now().toString(),
      }
      onAuth(userData)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-pink-500" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to MindEase
          </CardTitle>
          <CardDescription>Your safe space for emotional well-being. What would you like to be called?</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter your name or nickname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={!name.trim()}>
              Continue to MindEase
            </Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            Your privacy is important. We only store your name locally on your device.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
