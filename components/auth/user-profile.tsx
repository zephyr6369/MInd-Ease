"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Settings, Shield, Trash2, Download, Calendar, Heart, Award, TrendingUp } from "lucide-react"

export function UserProfile() {
  const { user, updateUser, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  if (!user) return null

  const handleSave = () => {
    updateUser({
      name: editData.name,
      email: editData.email || undefined,
    })
    setIsEditing(false)
  }

  const handleExportData = () => {
    const userData = {
      profile: user,
      moodData: localStorage.getItem(`mindease-mood-${user.id}`),
      checkinData: localStorage.getItem(`mindease-checkin-${user.id}`),
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `mindease-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      logout()
    }
  }

  const daysSinceJoined = Math.floor(
    (new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-2xl">{user.avatar || "😊"}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-lg">{user.email || "Not provided"}</p>
                  </div>
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Days Active</p>
                    <p className="text-2xl font-bold">{daysSinceJoined}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Mood Entries</p>
                    <p className="text-2xl font-bold">{user.stats.moodEntries}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Check-in Streak</p>
                    <p className="text-2xl font-bold">{user.stats.checkinStreak}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Total Sessions</p>
                    <p className="text-2xl font-bold">{user.stats.totalSessions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your mental wellness milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                <Badge variant={daysSinceJoined >= 7 ? "default" : "secondary"} className="p-2 justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  First Week Complete
                </Badge>
                <Badge variant={user.stats.moodEntries >= 10 ? "default" : "secondary"} className="p-2 justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Mood Tracker
                </Badge>
                <Badge variant={user.stats.checkinStreak >= 3 ? "default" : "secondary"} className="p-2 justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Consistent Check-ins
                </Badge>
                <Badge variant={user.stats.totalSessions >= 5 ? "default" : "secondary"} className="p-2 justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Regular User
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Daily Check-in Reminders</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Get gentle reminders to complete your daily wellness check-in
                  </p>
                </div>
                <Switch
                  checked={user.preferences.notifications}
                  onCheckedChange={(checked) =>
                    updateUser({
                      preferences: { ...user.preferences, notifications: checked },
                    })
                  }
                />
              </div>

              <Separator />

              <div>
                <Label>Data Retention</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">How long to keep your data locally</p>
                <select
                  className="w-full p-2 border rounded-md"
                  value={user.preferences.dataRetention}
                  onChange={(e) =>
                    updateUser({
                      preferences: { ...user.preferences, dataRetention: Number.parseInt(e.target.value) },
                    })
                  }
                >
                  <option value={7}>1 Week</option>
                  <option value={30}>1 Month</option>
                  <option value={90}>3 Months</option>
                  <option value={365}>1 Year</option>
                  <option value={-1}>Forever</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Data
              </CardTitle>
              <CardDescription>Manage your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">Your Data is Safe</h3>
                <p className="text-sm text-green-600 dark:text-green-300">
                  All your data is stored locally on your device. We don't collect, store, or share your personal
                  information or mental health data with any third parties.
                </p>
              </div>

              <div className="space-y-3">
                <Button onClick={handleExportData} variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export My Data
                </Button>

                <Separator />

                <Button onClick={handleDeleteAccount} variant="destructive" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
                <p className="text-xs text-gray-500">
                  This will permanently delete all your data from this device. This action cannot be undone.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
