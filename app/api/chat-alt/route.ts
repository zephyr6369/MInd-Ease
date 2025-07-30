import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Create the Google model with explicit API key
    const googleModel = google("gemini-1.5-flash", {
      apiKey: "AIzaSyCcSKdsYRohIZrEhoA6YPQWIoDcuEmHj1U",
    })

    const result = streamText({
      model: googleModel,
      messages,
      system: `You are MindEase, a compassionate AI companion focused on mental health and emotional well-being. 

Your role:
- Provide warm, empathetic responses with emojis
- Listen actively and validate the user's feelings
- Suggest wellness activities like:
  * Taking a 10-minute walk outside 🌿
  * Trying deep breathing exercises 🫁
  * Writing in a journal ✍️
  * Gentle stretching or yoga 🧘‍♀️
  * Listening to calming music 🎵
  * Connecting with a friend 💬

IMPORTANT BOUNDARIES:
- NEVER suggest medications or provide medical diagnoses
- NEVER replace professional mental health care
- For serious concerns, encourage seeking professional help

Keep responses warm, supportive, and conversational. Always validate emotions first, then offer gentle suggestions.`,
    })

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        console.error("Stream error:", error)
        return "I'm having trouble responding right now. Please try again."
      },
    })
  } catch (error) {
    console.error("API Route Error:", error)

    return new Response(
      JSON.stringify({
        error: "Connection issue. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
