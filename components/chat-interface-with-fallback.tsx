"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { FallbackChat } from "@/components/fallback-chat"
import { Card, CardContent } from "@/components/ui/card"

interface ChatInterfaceWithFallbackProps {
  userId: string
}

export function ChatInterfaceWithFallback({ userId }: ChatInterfaceWithFallbackProps) {
  const [showFallback, setShowFallback] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const handleRetryAI = () => {
    setShowFallback(false)
    setRetryCount((prev) => prev + 1)
  }

  // Show fallback after multiple failures
  if (showFallback) {
    return (
      <Card>
        <CardContent className="p-4">
          <FallbackChat onRetryAI={handleRetryAI} />
        </CardContent>
      </Card>
    )
  }

  return (
    <ChatInterface
      userId={userId}
      key={retryCount} // Force re-render on retry
      onConnectionFail={() => setShowFallback(true)}
    />
  )
}
