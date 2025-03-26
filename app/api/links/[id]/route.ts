import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLinkById, updateLink, deleteLink } from "@/lib/link-service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const link = await getLinkById(params.id);

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Ensure the user can only access their own links
    if (link.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(link);
  } catch (error) {
    console.error("Error fetching link:", error);
    return NextResponse.json(
      { error: "Failed to fetch link" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const link = await getLinkById(params.id);

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Ensure the user can only update their own links
    if (link.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    // Validate required fields
    if (!body.url || !body.title) {
      return NextResponse.json(
        { error: "URL and title are required" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(body.url);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    const updatedLink = await updateLink(params.id, {
      url: body.url,
      title: body.title,
      description: body.description || "",
      tags: body.tags || [],
      category: body.category || "",
      linkType: body.linkType || "website",
    });

    return NextResponse.json({ success: true, link: updatedLink });
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json(
      { error: "Failed to update link", details: (error as any).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const link = await getLinkById(params.id);

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Ensure the user can only delete their own links
    if (link.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await deleteLink(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}
