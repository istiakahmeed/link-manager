import clientPromise from "@/lib/mongodb-client"
import { ObjectId } from "mongodb"

export type LinkType =
  | "website"
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "github"
  | "pinterest"
  | "tiktok"
  | "reddit"
  | "other"

export type Link = {
  _id?: string
  userId: string
  url: string
  title: string
  description?: string
  tags: string[]
  category?: string
  linkType: LinkType
  createdAt: Date
  updatedAt: Date
}

// Modify the getLinksByUserId function to properly serialize MongoDB documents
export async function getLinksByUserId(userId: string) {
  try {
    const client = await clientPromise
    const collection = client.db().collection("links")

    const links = await collection.find({ userId }).sort({ createdAt: -1 }).toArray()

    // Convert MongoDB documents to plain JavaScript objects
    return links.map((link) => ({
      _id: link._id.toString(), // Convert ObjectId to string
      userId: link.userId,
      url: link.url,
      title: link.title,
      description: link.description || "",
      tags: link.tags || [],
      category: link.category || "",
      linkType: link.linkType || "website",
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    })) as Link[]
  } catch (error) {
    console.error("Error fetching links:", error)
    return []
  }
}

// Also update getLinkById to properly serialize the MongoDB document
export async function getLinkById(id: string) {
  try {
    const client = await clientPromise
    const collection = client.db().collection("links")

    const link = await collection.findOne({ _id: new ObjectId(id) })

    if (!link) return null

    // Convert MongoDB document to plain JavaScript object
    return {
      _id: link._id.toString(), // Convert ObjectId to string
      userId: link.userId,
      url: link.url,
      title: link.title,
      description: link.description || "",
      tags: link.tags || [],
      category: link.category || "",
      linkType: link.linkType || "website",
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    } as Link
  } catch (error) {
    console.error("Error fetching link:", error)
    return null
  }
}

export async function createLink(link: Omit<Link, "_id">) {
  const client = await clientPromise
  const collection = client.db().collection("links")

  const result = await collection.insertOne({
    ...link,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return result.insertedId
}

export async function updateLink(id: string, link: Partial<Link>) {
  const client = await clientPromise
  const collection = client.db().collection("links")

  return collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...link,
        updatedAt: new Date(),
      },
    },
  )
}

export async function deleteLink(id: string) {
  const client = await clientPromise
  const collection = client.db().collection("links")

  return collection.deleteOne({ _id: new ObjectId(id) })
}

export async function getUserTags(userId: string) {
  try {
    const client = await clientPromise
    const collection = client.db().collection("links")

    const links = await collection.find({ userId }).toArray()
    const tags = new Set<string>()

    links.forEach((link) => {
      if (link.tags && Array.isArray(link.tags)) {
        link.tags.forEach((tag) => tags.add(tag))
      }
    })

    return Array.from(tags)
  } catch (error) {
    console.error("Error fetching tags:", error)
    return []
  }
}

export async function getUserCategories(userId: string) {
  try {
    const client = await clientPromise
    const collection = client.db().collection("links")

    const links = await collection.find({ userId }).toArray()
    const categories = new Set<string>()

    links.forEach((link) => {
      if (link.category) {
        categories.add(link.category)
      }
    })

    return Array.from(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getUserLinkTypes(userId: string) {
  try {
    const client = await clientPromise
    const collection = client.db().collection("links")

    const links = await collection.find({ userId }).toArray()
    const linkTypes = new Set<string>()

    links.forEach((link) => {
      if (link.linkType) {
        linkTypes.add(link.linkType)
      }
    })

    return Array.from(linkTypes) as LinkType[]
  } catch (error) {
    console.error("Error fetching link types:", error)
    return []
  }
}

// Update searchLinks to properly serialize MongoDB documents
export async function searchLinks(userId: string, query: string) {
  try {
    const client = await clientPromise
    const collection = client.db().collection("links")

    const links = await collection
      .find({
        userId,
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { url: { $regex: query, $options: "i" } },
          { tags: { $in: [new RegExp(query, "i")] } },
          { category: { $regex: query, $options: "i" } },
          { linkType: { $regex: query, $options: "i" } },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray()

    // Convert MongoDB documents to plain JavaScript objects
    return links.map((link) => ({
      _id: link._id.toString(), // Convert ObjectId to string
      userId: link.userId,
      url: link.url,
      title: link.title,
      description: link.description || "",
      tags: link.tags || [],
      category: link.category || "",
      linkType: link.linkType || "website",
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    })) as Link[]
  } catch (error) {
    console.error("Error searching links:", error)
    return []
  }
}

