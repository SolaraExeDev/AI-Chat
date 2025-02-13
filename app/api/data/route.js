import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { userId, sessionClaims } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("User ID:", userId) // Debugging

    return NextResponse.json({
      id: userId,
      username: sessionClaims?.username || "Unknown",
    })
  } catch (error) {
    console.error("API Error:", error) // Log error to Netlify
    return NextResponse.json({ error: "Server Error", details: error.message }, { status: 500 })
  }
}
