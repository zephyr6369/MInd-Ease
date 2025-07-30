"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Wind, Music, ExternalLink, Play, Pause } from "lucide-react"
import { WellnessSuggestions } from "@/components/wellness-suggestions"

export function SelfCareResources() {
  const [isBreathingActive, setIsBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale")

  const breathingExercises = [
    {
      name: "4-7-8 Breathing",
      description: "Inhale for 4, hold for 7, exhale for 8",
      duration: "2-3 minutes",
    },
    {
      name: "Box Breathing",
      description: "Inhale, hold, exhale, hold - each for 4 counts",
      duration: "5 minutes",
    },
    {
      name: "Deep Belly Breathing",
      description: "Slow, deep breaths focusing on your diaphragm",
      duration: "3-5 minutes",
    },
  ]

  const calmingVideos = [
    {
      title: "Peaceful Nature Sounds",
      description: "Rain and forest sounds for relaxation",
      url: "https://www.youtube.com/watch?v=q76bMs-NwRk",
      duration: "1 hour",
    },
    {
      title: "Guided Meditation for Anxiety",
      description: "10-minute guided meditation",
      url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
      duration: "10 minutes",
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Full body relaxation technique",
      url: "https://www.youtube.com/watch?v=1nZEdqcGVzo",
      duration: "15 minutes",
    },
  ]

  const mentalHealthResources = [
    {
      name: "Crisis Text Line",
      description: "Free 24/7 crisis support via text",
      contact: "Text HOME to 741741",
      url: "https://www.crisistextline.org/",
    },
    {
      name: "National Suicide Prevention Lifeline",
      description: "24/7 free and confidential support",
      contact: "988",
      url: "https://suicidepreventionlifeline.org/",
    },
    {
      name: "NAMI (National Alliance on Mental Illness)",
      description: "Mental health education and support",
      contact: "1-800-950-NAMI",
      url: "https://www.nami.org/",
    },
    {
      name: "Psychology Today",
      description: "Find therapists and mental health professionals",
      contact: "Online directory",
      url: "https://www.psychologytoday.com/",
    },
  ]

  const inspirationalQuotes = [
    "You are braver than you believe, stronger than you seem, and smarter than you think.",
    "Healing isn't linear. Be patient with yourself.",
    "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    "It's okay to not be okay. It's not okay to stay that way.",
    "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.",
    "Progress, not perfection.",
    "You are worthy of love and belonging.",
    "Take it one day at a time.",
  ]

  const startBreathingExercise = () => {
    setIsBreathingActive(true)
    // Simple breathing guide - in real app, you'd implement a proper timer
    const phases = ["inhale", "hold", "exhale"] as const
    let currentPhaseIndex = 0

    const interval = setInterval(() => {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length
      setBreathingPhase(phases[currentPhaseIndex])
    }, 4000)

    setTimeout(() => {
      clearInterval(interval)
      setIsBreathingActive(false)
      setBreathingPhase("inhale")
    }, 60000) // 1 minute
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Self-Care Resources
          </CardTitle>
          <CardDescription>Tools and resources to support your mental well-being</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="help">Get Help</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-4">
          <WellnessSuggestions />
        </TabsContent>

        <TabsContent value="breathing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-500" />
                Guided Breathing Exercise
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {!isBreathingActive ? (
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Take a moment to focus on your breathing. This simple exercise can help reduce stress and anxiety.
                  </p>
                  <Button onClick={startBreathingExercise} size="lg">
                    <Play className="h-4 w-4 mr-2" />
                    Start Breathing Exercise
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div
                    className={`w-32 h-32 mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
                      breathingPhase === "inhale"
                        ? "scale-110 border-blue-500 bg-blue-50"
                        : breathingPhase === "hold"
                          ? "scale-110 border-yellow-500 bg-yellow-50"
                          : "scale-90 border-green-500 bg-green-50"
                    }`}
                  >
                    <span className="text-lg font-medium capitalize">{breathingPhase}</span>
                  </div>
                  <p className="text-lg">
                    {breathingPhase === "inhale" && "Breathe in slowly..."}
                    {breathingPhase === "hold" && "Hold your breath..."}
                    {breathingPhase === "exhale" && "Breathe out slowly..."}
                  </p>
                  <Button variant="outline" onClick={() => setIsBreathingActive(false)}>
                    <Pause className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {breathingExercises.map((exercise, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{exercise.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{exercise.description}</p>
                    </div>
                    <Badge variant="secondary">{exercise.duration}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <div className="grid gap-4">
            {calmingVideos.map((video, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium flex items-center gap-2">
                        <Music className="h-4 w-4 text-purple-500" />
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{video.description}</p>
                      <Badge variant="outline" className="mt-2">
                        {video.duration}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={video.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quotes" className="space-y-4">
          <div className="grid gap-4">
            {inspirationalQuotes.map((quote, index) => (
              <Card
                key={index}
                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
              >
                <CardContent className="p-4">
                  <p className="text-center italic">"{quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="help" className="space-y-4">
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-300">Crisis Resources</CardTitle>
              <CardDescription className="text-red-600 dark:text-red-400">
                If you're in crisis or having thoughts of self-harm, please reach out immediately:
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4">
            {mentalHealthResources.map((resource, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium">{resource.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{resource.description}</p>
                      <p className="text-sm font-medium mt-2">{resource.contact}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Remember:</strong> MindEase is not a substitute for professional mental health care. If you're
                experiencing persistent mental health challenges, please consider speaking with a qualified mental
                health professional.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
