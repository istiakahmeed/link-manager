import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { hash } from "bcryptjs" // Changed from bcrypt to bcryptjs

export type User = {
  _id: ObjectId
  name: string
  email: string
  password?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export async function getUserByEmail(email: string) {
  const client = await clientPromise
  const collection = client.db().collection("users")

  return collection.findOne({ email }) as Promise<User | null>
}

export async function getUserById(id: string) {
  const client = await clientPromise
  const collection = client.db().collection("users")

  return collection.findOne({ _id: new ObjectId(id) }) as Promise<User | null>
}

export async function createUser({ name, email, password }: { name: string; email: string; password: string }) {
  const client = await clientPromise
  const collection = client.db().collection("users")

  // Check if user already exists
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // Hash password
  const hashedPassword = await hash(password, 10)

  // Create user
  const now = new Date()
  const result = await collection.insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now,
  })

  return {
    id: result.insertedId.toString(),
    name,
    email,
  }
}

export async function updateUser(id: string, data: Partial<Omit<User, "_id">>) {
  const client = await clientPromise
  const collection = client.db().collection("users")

  const updateData = { ...data, updatedAt: new Date() }

  // If password is being updated, hash it
  if (updateData.password) {
    updateData.password = await hash(updateData.password, 10)
  }

  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

  return result.modifiedCount > 0
}

