"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Activity,
  Brain,
  Palette,
  Users,
  Leaf,
  Moon,
  Coffee,
  Music,
  BookOpen,
  Camera,
  Smile,
} from "lucide-react"

interface WellnessSuggestion {
  category: string
  title: string
  description: string
  duration: string
  icon: React.ComponentType<{ className?: string }>
  difficulty: "Easy" | "Medium" | "Challenging"
  benefits: string[]
}

const wellnessSuggestions: WellnessSuggestion[] = [
  {
    category: "Physical Activity",
    title: "10-Minute Nature Walk",
    description: "Step outside and take a gentle walk, focusing on your surroundings and breathing fresh air.",
    duration: "10 minutes",
    icon: Activity,
    difficulty: "Easy",
    benefits: ["Reduces stress", "Improves mood", "Increases energy"],
  },
  {
    category: "Physical Activity",
    title: "Gentle Yoga Flow",
    description: "Simple stretches and poses to release tension and connect with your body.",
    duration: "15-20 minutes",
    icon: Heart,
    difficulty: "Easy",
    benefits: ["Reduces anxiety", "Improves flexibility", "Promotes relaxation"],
  },
  {
    category: "Mindfulness",
    title: "5-4-3-2-1 Grounding",
    description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
    duration: "5 minutes",
    icon: Brain,
    difficulty: "Easy",
    benefits: ["Reduces anxiety", "Increases present-moment awareness", "Calms racing thoughts"],
  },
  {
    category: "Mindfulness",
    title: "Guided Meditation",
    description: "Follow a simple breathing meditation to center yourself and find calm.",
    duration: "10-15 minutes",
    icon: Moon,
    difficulty: "Medium",
    benefits: ["Reduces stress", "Improves focus", "Promotes inner peace"],
  },
  {
    category: "Creative Expression",
    title: "Emotion Journaling",
    description: "Write freely about your feelings without judgment - let your thoughts flow onto paper.",
    duration: "15-20 minutes",
    icon: BookOpen,
    difficulty: "Easy",
    benefits: ["Processes emotions", "Increases self-awareness", "Reduces mental clutter"],
  },
  {
    category: "Creative Expression",
    title: "Art Therapy Drawing",
    description: "Draw, doodle, or color to express emotions that might be hard to put into words.",
    duration: "20-30 minutes",
    icon: Palette,
    difficulty: "Easy",
    benefits: ["Emotional release", "Boosts creativity", "Reduces stress"],
  },
  {
    category: "Social Connection",
    title: "Reach Out to a Friend",
    description: "Send a text, make a call, or plan to meet someone who makes you feel supported.",
    duration: "15-30 minutes",
    icon: Users,
    difficulty: "Medium",
    benefits: ["Reduces isolation", "Provides support", "Strengthens relationships"],
  },
  {
    category: "Nature Connection",
    title: "Indoor Plant Care",
    description: "Tend to houseplants or start a small herb garden - connecting with nature indoors.",
    duration: "10-15 minutes",
    icon: Leaf,
    difficulty: "Easy",
    benefits: ["Provides purpose", "Connects with nature", "Improves air quality"],
  },
  {
    category: "Routine Building",
    title: "Morning Gratitude Ritual",
    description: "Start your day by writing down 3 things you're grateful for, no matter how small.",
    duration: "5-10 minutes",
    icon: Coffee,
    difficulty: "Easy",
    benefits: ["Improves mood", "Shifts perspective", "Creates positive routine"],
  },
  {
    category: "Creative Expression",
    title: "Music Therapy Session",
    description: "Listen to calming music, create a playlist, or try humming/singing along.",
    duration: "15-30 minutes",
    icon: Music,
    difficulty: "Easy",
    benefits: ["Regulates emotions", "Reduces stress", "Boosts mood"],
  },
  {
    category: "Mindfulness",
    title: "Photography Mindfulness",
    description: "Take photos of things that bring you joy or peace - focus on the present moment.",
    duration: "20-30 minutes",
    icon: Camera,
    difficulty: "Easy",
    benefits: ["Increases mindfulness", "Finds beauty in everyday", "Creative expression"],
  },
  {
    category: "Social Connection",
    title: "Acts of Kindness",
    description: "Do something kind for someone else - send encouragement, help a neighbor, volunteer.",
    duration: "30+ minutes",
    icon: Smile,
    difficulty: "Medium",
    benefits: ["Boosts mood", "Creates connection", "Provides purpose"],
  },
]

export function WellnessSuggestions() {
  const categories = Array.from(new Set(wellnessSuggestions.map((s) => s.category)))

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Challenging":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            Wellness Activity Suggestions
          </CardTitle>
          <CardDescription>
            Evidence-based activities to support your mental well-being. These are suggestions, not medical advice.
          </CardDescription>
        </CardHeader>
      </Card>

      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            {category === "Physical Activity" && <Activity className="h-5 w-5 text-green-500" />}
            {category === "Mindfulness" && <Brain className="h-5 w-5 text-purple-500" />}
            {category === "Creative Expression" && <Palette className="h-5 w-5 text-orange-500" />}
            {category === "Social Connection" && <Users className="h-5 w-5 text-blue-500" />}
            {category === "Nature Connection" && <Leaf className="h-5 w-5 text-green-600" />}
            {category === "Routine Building" && <Coffee className="h-5 w-5 text-amber-500" />}
            {category}
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {wellnessSuggestions
              .filter((suggestion) => suggestion.category === category)
              .map((suggestion, index) => {
                const IconComponent = suggestion.icon
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-blue-500" />
                          <CardTitle className="text-base">{suggestion.title}</CardTitle>
                        </div>
                        <Badge className={getDifficultyColor(suggestion.difficulty)}>{suggestion.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{suggestion.description}</p>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>⏱️ {suggestion.duration}</span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Benefits:</p>
                        <div className="flex flex-wrap gap-1">
                          {suggestion.benefits.map((benefit, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      ))}

      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Important Reminder</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                These wellness activities are suggestions to support your mental health, not medical treatment. If
                you're experiencing persistent mental health challenges, please consult with a qualified healthcare
                professional or therapist.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
