"use client"

import { useState, useEffect } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { MoodTracker } from "@/components/mood-tracker"
import { DailyCheckin } from "@/components/daily-checkin"
import { SelfCareResources } from "@/components/self-care-resources"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthModal } from "@/components/auth-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, BarChart3, BookOpen, Sparkles } from "lucide-react"

export default function Home() {
  const [user, setUser] = useState<{ name: string; id: string } | null>(null)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("mindease-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      setShowAuth(true)
    }

    // Ensure theme is properly initialized
    const savedTheme = localStorage.getItem("mindease-theme")
    if (!savedTheme) {
      localStorage.setItem("mindease-theme", "light")
    }
  }, [])

  const handleAuth = (userData: { name: string; id: string }) => {
    setUser(userData)
    localStorage.setItem("mindease-user", JSON.stringify(userData))
    setShowAuth(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("mindease-user")
    setShowAuth(true)
  }

  if (showAuth) {
    return <AuthModal onAuth={handleAuth} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              MindEase
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, {user?.name}</span>
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Your Safe Space for Emotional Well-being
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Express yourself freely in this compassionate, non-judgmental environment. I'm here to listen and support
            you on your mental health journey.
          </p>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="mood" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Mood Tracker
            </TabsTrigger>
            <TabsTrigger value="checkin" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Daily Check-in
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Self-Care
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Card>
              <CardContent className="p-0">
                <ChatInterface userId={user?.id || ""} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mood">
            <MoodTracker userId={user?.id || ""} />
          </TabsContent>

          <TabsContent value="checkin">
            <DailyCheckin userId={user?.id || ""} />
          </TabsContent>

          <TabsContent value="resources">
            <SelfCareResources />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
