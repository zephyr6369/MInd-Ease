"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Sun, Moon } from "lucide-react"

interface CheckinEntry {
  date: string
  gratitude: string
  reflection: string
  goals: string
}

interface DailyCheckinProps {
  userId: string
}

export function DailyCheckin({ userId }: DailyCheckinProps) {
  const [gratitude, setGratitude] = useState("")
  const [reflection, setReflection] = useState("")
  const [goals, setGoals] = useState("")
  const [checkinHistory, setCheckinHistory] = useState<CheckinEntry[]>([])
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(`mindease-checkin-${userId}`)
    if (saved) {
      const history = JSON.parse(saved)
      setCheckinHistory(history)

      const today = new Date().toISOString().split("T")[0]
      const todayEntry = history.find((entry: CheckinEntry) => entry.date === today)
      if (todayEntry) {
        setHasCheckedInToday(true)
        setGratitude(todayEntry.gratitude)
        setReflection(todayEntry.reflection)
        setGoals(todayEntry.goals)
      }
    }
  }, [userId])

  const saveCheckin = () => {
    const today = new Date().toISOString().split("T")[0]
    const newEntry: CheckinEntry = {
      date: today,
      gratitude: gratitude.trim(),
      reflection: reflection.trim(),
      goals: goals.trim(),
    }

    const updatedHistory = checkinHistory.filter((entry) => entry.date !== today)
    updatedHistory.push(newEntry)
    updatedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    setCheckinHistory(updatedHistory)
    localStorage.setItem(`mindease-checkin-${userId}`, JSON.stringify(updatedHistory))
    setHasCheckedInToday(true)
  }

  const affirmations = [
    "You are worthy of love and kindness",
    "Your feelings are valid and important",
    "You have the strength to overcome challenges",
    "You are making progress, even if it doesn't feel like it",
    "You deserve peace and happiness",
    "You are enough, just as you are",
  ]

  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)]

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            Daily Affirmation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium text-center italic">"{randomAffirmation}"</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Daily Check-in
          </CardTitle>
          <CardDescription>Take a moment to reflect on your day and set intentions</CardDescription>
          {hasCheckedInToday && (
            <Badge variant="secondary" className="w-fit">
              ✓ Completed today
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">What are you grateful for today? 🙏</label>
            <Textarea
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="I'm grateful for..."
              className="min-h-[80px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">How are you feeling right now? 💭</label>
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Today I feel..."
              className="min-h-[80px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">What's one small goal for tomorrow? 🌟</label>
            <Textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Tomorrow I want to..."
              className="min-h-[80px]"
            />
          </div>

          <Button
            onClick={saveCheckin}
            className="w-full"
            disabled={!gratitude.trim() && !reflection.trim() && !goals.trim()}
          >
            {hasCheckedInToday ? "Update Check-in" : "Complete Check-in"}
          </Button>
        </CardContent>
      </Card>

      {checkinHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-indigo-500" />
              Previous Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {checkinHistory.slice(0, 7).map((entry) => (
                <div key={entry.date} className="border-l-4 border-blue-200 pl-4 py-2">
                  <p className="font-medium text-sm text-gray-600 dark:text-gray-400">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {entry.gratitude && (
                    <p className="text-sm mt-1">
                      <strong>Grateful:</strong> {entry.gratitude}
                    </p>
                  )}
                  {entry.reflection && (
                    <p className="text-sm mt-1">
                      <strong>Feeling:</strong> {entry.reflection}
                    </p>
                  )}
                  {entry.goals && (
                    <p className="text-sm mt-1">
                      <strong>Goal:</strong> {entry.goals}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
