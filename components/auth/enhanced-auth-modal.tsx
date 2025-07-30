"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Heart, Mail, Shield, Eye, EyeOff } from "lucide-react"

interface EnhancedAuthModalProps {
  onAuth: (userData: any) => void
}

export function EnhancedAuthModal({ onAuth }: EnhancedAuthModalProps) {
  const [activeTab, setActiveTab] = useState("quick")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
    enableNotifications: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const avatarOptions = [
    { emoji: "😊", name: "Happy" },
    { emoji: "🌸", name: "Peaceful" },
    { emoji: "🌟", name: "Bright" },
    { emoji: "🦋", name: "Free" },
    { emoji: "🌙", name: "Calm" },
    { emoji: "🌿", name: "Natural" },
  ]
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (activeTab === "detailed") {
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email"
      }

      if (formData.password && formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match"
      }

      if (!formData.agreeToTerms) {
        newErrors.terms = "Please agree to the terms"
      }

      if (!formData.agreeToPrivacy) {
        newErrors.privacy = "Please agree to the privacy policy"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData = {
      name: formData.name.trim(),
      email: formData.email || undefined,
      avatar: selectedAvatar.emoji,
      id: Date.now().toString(),
      preferences: {
        notifications: formData.enableNotifications,
        theme: "light" as const,
        dataRetention: 30,
      },
      stats: {
        totalSessions: 1,
        moodEntries: 0,
        checkinStreak: 0,
        lastActive: new Date().toISOString(),
      },
    }

    onAuth(userData)
    setIsLoading(false)
  }

  const handleQuickStart = () => {
    const userData = {
      name: "Anonymous User",
      id: Date.now().toString(),
      avatar: "😊",
      preferences: {
        notifications: false,
        theme: "light" as const,
        dataRetention: 7, // Shorter retention for anonymous users
      },
      stats: {
        totalSessions: 1,
        moodEntries: 0,
        checkinStreak: 0,
        lastActive: new Date().toISOString(),
      },
    }
    onAuth(userData)
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
          <CardDescription>Your safe space for emotional well-being</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="quick">Quick Start</TabsTrigger>
              <TabsTrigger value="detailed">Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="quick" className="space-y-4">
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-medium text-green-800 dark:text-green-200">Anonymous & Private</h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    Start immediately with no personal information required. Your data stays on your device.
                  </p>
                </div>
                <Button onClick={handleQuickStart} className="w-full" size="lg">
                  Start Anonymously
                </Button>
                <p className="text-xs text-gray-500">
                  You can always create an account later to sync your data across devices.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name or Nickname *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="What would you like to be called?"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  <p className="text-xs text-gray-500">Only for account recovery and important updates</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password (Optional)</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className={errors.password ? "border-red-500" : ""}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                {formData.password && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className={errors.confirmPassword ? "border-red-500" : ""}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>
                )}

                <div className="space-y-3">
                  <Label>Choose Your Avatar</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar.name}
                        type="button"
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`p-2 rounded-lg border-2 transition-colors ${
                          selectedAvatar.name === avatar.name
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-2xl">{avatar.emoji}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notifications"
                      checked={formData.enableNotifications}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, enableNotifications: checked as boolean })
                      }
                    />
                    <Label htmlFor="notifications" className="text-sm">
                      Enable gentle reminders for daily check-ins
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <button type="button" className="text-blue-500 hover:underline">
                        Terms of Service
                      </button>
                    </Label>
                  </div>
                  {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreeToPrivacy}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToPrivacy: checked as boolean })}
                    />
                    <Label htmlFor="privacy" className="text-sm">
                      I agree to the{" "}
                      <button type="button" className="text-blue-500 hover:underline">
                        Privacy Policy
                      </button>
                    </Label>
                  </div>
                  {errors.privacy && <p className="text-sm text-red-500">{errors.privacy}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Your Privacy Matters</p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  All data is stored locally on your device. We never share your personal information or mental health
                  data with third parties.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
