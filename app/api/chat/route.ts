import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Set the API key as environment variable for this request
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = "AIzaSyCcSKdsYRohIZrEhoA6YPQWIoDcuEmHj1U"

    const result = streamText({
      model: google("gemini-1.5-flash"),
      messages,
      system: `You are MindEase, a compassionate AI companion focused on mental health and emotional well-being. 

Your role:
- Provide warm, empathetic responses
- Listen and validate feelings
- Suggest wellness activities (exercise, breathing, journaling, nature walks)
- NEVER suggest medications or provide medical diagnoses
- Encourage professional help for serious concerns

Keep responses supportive, conversational, and include gentle wellness suggestions when appropriate.`,
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
