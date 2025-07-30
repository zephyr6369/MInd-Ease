"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Smile, Meh, Frown, Heart, Star } from "lucide-react"

interface MoodEntry {
  date: string
  mood: number
  note?: string
}

interface MoodTrackerProps {
  userId: string
}

const moodEmojis = [
  { icon: Frown, label: "Very Low", color: "text-red-500" },
  { icon: Frown, label: "Low", color: "text-orange-500" },
  { icon: Meh, label: "Neutral", color: "text-yellow-500" },
  { icon: Smile, label: "Good", color: "text-green-500" },
  { icon: Heart, label: "Great", color: "text-pink-500" },
]

export function MoodTracker({ userId }: MoodTrackerProps) {
  const [currentMood, setCurrentMood] = useState([3])
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])
  const [note, setNote] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem(`mindease-mood-${userId}`)
    if (saved) {
      setMoodHistory(JSON.parse(saved))
    }
  }, [userId])

  const saveMood = () => {
    const today = new Date().toISOString().split("T")[0]
    const newEntry: MoodEntry = {
      date: today,
      mood: currentMood[0],
      note: note.trim() || undefined,
    }

    const updatedHistory = moodHistory.filter((entry) => entry.date !== today)
    updatedHistory.push(newEntry)
    updatedHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    setMoodHistory(updatedHistory)
    localStorage.setItem(`mindease-mood-${userId}`, JSON.stringify(updatedHistory))
    setNote("")
  }

  const chartData = moodHistory.slice(-30).map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    mood: entry.mood,
  }))

  const currentMoodEmoji = moodEmojis[currentMood[0] - 1]
  const CurrentIcon = currentMoodEmoji.icon

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            How are you feeling today?
          </CardTitle>
          <CardDescription>Track your mood to better understand your emotional patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <CurrentIcon className={`h-16 w-16 mx-auto mb-2 ${currentMoodEmoji.color}`} />
            <p className="text-lg font-medium">{currentMoodEmoji.label}</p>
          </div>

          <div className="space-y-4">
            <Slider value={currentMood} onValueChange={setCurrentMood} max={5} min={1} step={1} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Very Low</span>
              <span>Low</span>
              <span>Neutral</span>
              <span>Good</span>
              <span>Great</span>
            </div>
          </div>

          <div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about how you're feeling (optional)"
              className="w-full p-3 border rounded-md resize-none h-20 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <Button onClick={saveMood} className="w-full">
            Save Today's Mood
          </Button>
        </CardContent>
      </Card>

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Mood Trends</CardTitle>
            <CardDescription>Your mood over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="#8884d8" strokeWidth={2} dot={{ fill: "#8884d8" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
