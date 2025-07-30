"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot } from "lucide-react"

const fallbackResponses = [
  "I hear you, and I want you to know that your feelings are valid. Sometimes just expressing what's on your mind can be the first step toward feeling better. 💙",

  "It sounds like you're going through a challenging time. Remember that it's okay to not be okay sometimes. Have you tried taking a few deep breaths or going for a short walk? 🌿",

  "Thank you for sharing that with me. Your mental health matters, and taking time to check in with yourself is important. What's one small thing that usually brings you comfort? ☕",

  "I can sense that you're dealing with a lot right now. Sometimes when we're overwhelmed, it helps to focus on just the next small step. What feels manageable for you today? 🌱",

  "Your feelings are completely understandable. When things feel heavy, gentle activities like journaling, listening to calming music, or reaching out to someone you trust can help. 📝",

  "I appreciate you opening up. Remember that seeking support - whether from friends, family, or professionals - is a sign of strength, not weakness. You don't have to face this alone. 🤝",
]

interface FallbackChatProps {
  onRetryAI: () => void
}

export function FallbackChat({ onRetryAI }: FallbackChatProps) {
  const [currentResponse] = useState(() => fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)])

  return (
    <div className="space-y-4">
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
                <strong>Connection Issue:</strong> I'm having trouble connecting to my AI system right now.
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                While I work on reconnecting, here's a supportive message for you:
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm">{currentResponse}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={onRetryAI} variant="outline" className="flex-1 bg-transparent">
          Try AI Chat Again
        </Button>
        <Button asChild variant="outline">
          <a href="tel:988">Crisis Line: 988</a>
        </Button>
      </div>
    </div>
  )
}
