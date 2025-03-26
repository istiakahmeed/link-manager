import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/mongodb-client"
import { validateEmail } from "@/lib/email-validation"
import { randomBytes } from "crypto"

// Generate a verification token
function generateToken(): string {
  return randomBytes(32).toString("hex")
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email } = await req.json()

    // Validate email format
    const validation = validateEmail(email)
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.message }, { status: 400 })
    }

    // Generate verification token
    const token = generateToken()
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24) // Token expires in 24 hours

    // Store verification token in database
    const client = await clientPromise
    const db = client.db()

    await db.collection("verificationTokens").insertOne({
      userId: session.user.id,
      email,
      token,
      expiresAt,
      createdAt: new Date(),
    })

    // In a real application, you would send an email with the verification link
    // For demonstration purposes, we'll just return the token
    // sendVerificationEmail(email, token)

    return NextResponse.json({
      message: "Verification email sent",
      // Only include token in development for testing
      ...(process.env.NODE_ENV === "development" && { token }),
    })
  } catch (error) {
    console.error("Error sending verification email:", error)
    return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const token = url.searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Find and delete the token (one-time use)
    const verificationToken = await db.collection("verificationTokens").findOneAndDelete({
      token,
      expiresAt: { $gt: new Date() }, // Token must not be expired
    })

    if (!verificationToken.value) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    // Update user's email verification status
    await db.collection("users").updateOne(
      { _id: verificationToken.value.userId },
      {
        $set: {
          emailVerified: new Date(),
          email: verificationToken.value.email,
        },
      },
    )

    // Redirect to success page
    return NextResponse.redirect(new URL("/email-verified", req.url))
  } catch (error) {
    console.error("Error verifying email:", error)
    return NextResponse.json({ error: "Failed to verify email" }, { status: 500 })
  }
}

