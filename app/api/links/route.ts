import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createLink, getLinksByUserId } from "@/lib/link-service"
import { detectLinkType } from "@/lib/link-utils"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const links = await getLinksByUserId(userId)

    return NextResponse.json(links)
  } catch (error) {
    console.error("Error fetching links:", error)
    return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    // Validate required fields
    if (!body.url || !body.title) {
      return NextResponse.json({ error: "URL and title are required" }, { status: 400 })
    }

    // Ensure userId matches the authenticated user
    if (body.userId !== session.user.id) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 403 })
    }

    // Auto-detect link type if not provided
    if (!body.linkType) {
      body.linkType = detectLinkType(body.url)
    }

    const linkId = await createLink({
      userId: body.userId,
      url: body.url,
      title: body.title,
      description: body.description || "",
      tags: body.tags || [],
      category: body.category || "",
      linkType: body.linkType,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({ id: linkId }, { status: 201 })
  } catch (error) {
    console.error("Error creating link:", error)
    return NextResponse.json({ error: "Failed to create link" }, { status: 500 })
  }
}

