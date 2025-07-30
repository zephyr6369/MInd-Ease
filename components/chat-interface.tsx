"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, Bot, User, AlertCircle, RefreshCw } from "lucide-react"

interface ChatInterfaceProps {
  userId: string
}

export function ChatInterface({ userId }: ChatInterfaceProps) {
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [useAltRoute, setUseAltRoute] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading, reload, stop, error } = useChat({
    api: useAltRoute ? "/api/chat-alt" : "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm here to listen and support you. Feel free to share what's on your mind - whether you're feeling anxious, stressed, happy, or anything in between. This is your safe space. 💙",
      },
    ],
    onError: (err) => {
      console.error("useChat error:", err)
      setConnectionError("I'm having trouble connecting. Let me try a different approach...")

      // Try alternative route if main route fails
      if (!useAltRoute) {
        setUseAltRoute(true)
        setTimeout(() => {
          reload()
        }, 1000)
      }
    },
    onResponse: (response) => {
      if (response.ok) {
        setConnectionError(null)
      } else {
        console.error("Response not OK:", response.status, response.statusText)
      }
    },
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleRetry = () => {
    setConnectionError(null)
    reload()
  }

  const handleSwitchRoute = () => {
    setUseAltRoute(!useAltRoute)
    setConnectionError(null)
    setTimeout(() => {
      reload()
    }, 500)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setConnectionError(null)
    handleSubmit(e)
  }

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" ? "bg-blue-500 text-white" : "bg-pink-500 text-white"
                  }`}
                >
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <Card className={`${message.role === "user" ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-800"}`}>
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {(error || connectionError) && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>{connectionError || "Something went wrong. Please try again."}</span>
                  <Button variant="outline" size="sm" onClick={handleRetry} className="ml-2 bg-transparent">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Retry
                  </Button>
                </div>
                {connectionError && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleSwitchRoute} className="bg-transparent">
                      Try Alternative Connection
                    </Button>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Share what's on your mind..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
          {isLoading && (
            <Button type="button" variant="outline" onClick={stop}>
              Stop
            </Button>
          )}
        </form>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            MindEase provides emotional support but is not a substitute for professional mental health care.
          </p>
          {useAltRoute && <span className="text-xs text-blue-500">Using alternative connection</span>}
        </div>
      </div>
    </div>
  )
}
