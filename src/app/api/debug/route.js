import mongoose from "mongoose"
import { authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export async function GET() {
  const debug = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      MONGO_URL_EXISTS: !!process.env.MONGO_URL,
      MONGO_URL_LENGTH: process.env.MONGO_URL?.length || 0,
    },
    mongoose: {
      connection: mongoose.connection.readyState,
      states: {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting",
      },
    },
  }

  try {
    const session = await getServerSession(authOptions)
    debug.session = {
      exists: !!session,
      hasUser: !!session?.user,
      hasEmail: !!session?.user?.email,
      email: session?.user?.email || "No email",
    }
  } catch (error) {
    debug.sessionError = error.message
  }

  return new Response(JSON.stringify(debug, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
