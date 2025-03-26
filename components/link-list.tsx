"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  Edit,
  Trash,
  Tag,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Globe,
  PenTool,
} from "lucide-react"
import type { LinkType } from "@/lib/link-utils"
import { DeleteLinkDialog } from "@/components/delete-link-dialog"
import { EditLinkDialog } from "@/components/edit-link-dialog"

// Define a client-side Link type
interface ClientLink {
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

interface LinkListProps {
  links: ClientLink[]
}

export function LinkList({ links }: LinkListProps) {
  const [linkToEdit, setLinkToEdit] = useState<ClientLink | null>(null)
  const [linkToDelete, setLinkToDelete] = useState<ClientLink | null>(null)

  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">No links found</h3>
        <p className="text-muted-foreground mb-4">Start adding links to your collection</p>
      </div>
    )
  }

  const getLinkTypeIcon = (type: LinkType) => {
    switch (type) {
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />
      case "twitter":
        return <Twitter className="h-4 w-4 text-sky-500" />
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-600" />
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-blue-700" />
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-600" />
      case "github":
        return <Github className="h-4 w-4" />
      case "pinterest":
        return <PenTool className="h-4 w-4 text-red-600" />
      case "tiktok":
        return <PenTool className="h-4 w-4 text-black" />
      case "reddit":
        return <PenTool className="h-4 w-4 text-orange-600" />
      case "website":
      default:
        return <Globe className="h-4 w-4 text-green-600" />
    }
  }

  const getLinkTypeColor = (type: LinkType) => {
    switch (type) {
      case "facebook":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "twitter":
        return "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400"
      case "instagram":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400"
      case "linkedin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "youtube":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "github":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
      case "pinterest":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "tiktok":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
      case "reddit":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case "website":
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {links.map((link) => (
        <Card key={link._id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="line-clamp-1 text-lg">{link.title}</CardTitle>
              <Badge className={`${getLinkTypeColor(link.linkType)} flex items-center gap-1`}>
                {getLinkTypeIcon(link.linkType)}
                <span className="capitalize">{link.linkType}</span>
              </Badge>
            </div>
            <CardDescription className="line-clamp-1">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary flex items-center gap-1"
              >
                {link.url}
                <ExternalLink className="h-3 w-3" />
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            {link.description && <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{link.description}</p>}
            <div className="flex flex-wrap gap-1 mt-2">
              {link.category && (
                <Link href={`/dashboard?category=${encodeURIComponent(link.category)}`}>
                  <Badge variant="outline" className="bg-primary/10">
                    {link.category}
                  </Badge>
                </Link>
              )}
              {link.tags &&
                link.tags.map((tag) => (
                  <Link key={tag} href={`/dashboard?tag=${encodeURIComponent(tag)}`}>
                    <Badge variant="secondary" className="hover:bg-secondary/80">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  </Link>
                ))}
            </div>
          </CardContent>
          <CardFooter className="pt-2 flex justify-between">
            <div className="text-xs text-muted-foreground">{new Date(link.createdAt).toLocaleDateString()}</div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setLinkToEdit(link)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setLinkToDelete(link)}>
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Open</span>
                </a>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}

      {linkToEdit && <EditLinkDialog link={linkToEdit} open={!!linkToEdit} onOpenChange={() => setLinkToEdit(null)} />}

      {linkToDelete && (
        <DeleteLinkDialog link={linkToDelete} open={!!linkToDelete} onOpenChange={() => setLinkToDelete(null)} />
      )}
    </div>
  )
}

