"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TagInput } from "@/components/tag-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type LinkType, detectLinkType } from "@/lib/link-utils"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github, Globe, AlertCircle, PenTool } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AddLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddLinkDialog({ open, onOpenChange }: AddLinkDialogProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    description: "",
    category: "",
    tags: [] as string[],
    linkType: "website" as LinkType,
  })

  // Auto-detect link type when URL changes
  useEffect(() => {
    if (formData.url) {
      const detectedType = detectLinkType(formData.url)
      setFormData((prev) => ({ ...prev, linkType: detectedType }))
    }
  }, [formData.url])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }))
  }

  const handleLinkTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, linkType: value as LinkType }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!session?.user.id) {
      setError("You must be signed in to add links")
      return
    }

    if (!formData.url || !formData.title) {
      setError("URL and title are required")
      return
    }

    try {
      setIsLoading(true)

      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: session.user.id,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add link")
      }

      toast({
        title: "Link added",
        description: "Your link has been added successfully",
      })

      // Reset form and close dialog
      setFormData({
        url: "",
        title: "",
        description: "",
        category: "",
        tags: [],
        linkType: "website",
      })
      onOpenChange(false)

      // Refresh the page to show the new link
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to add link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getLinkTypeIcon = (type: LinkType) => {
    switch (type) {
      case "facebook":
        return <Facebook className="h-4 w-4 mr-2" />
      case "twitter":
        return <Twitter className="h-4 w-4 mr-2" />
      case "instagram":
        return <Instagram className="h-4 w-4 mr-2" />
      case "linkedin":
        return <Linkedin className="h-4 w-4 mr-2" />
      case "youtube":
        return <Youtube className="h-4 w-4 mr-2" />
      case "github":
        return <Github className="h-4 w-4 mr-2" />
      case "website":
      default:
        return <Globe className="h-4 w-4 mr-2" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Link</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkType">Link Type</Label>
            <Select value={formData.linkType} onValueChange={handleLinkTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select link type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </div>
                </SelectItem>
                <SelectItem value="facebook">
                  <div className="flex items-center">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </div>
                </SelectItem>
                <SelectItem value="twitter">
                  <div className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </div>
                </SelectItem>
                <SelectItem value="instagram">
                  <div className="flex items-center">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </div>
                </SelectItem>
                <SelectItem value="linkedin">
                  <div className="flex items-center">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </div>
                </SelectItem>
                <SelectItem value="youtube">
                  <div className="flex items-center">
                    <Youtube className="h-4 w-4 mr-2" />
                    YouTube
                  </div>
                </SelectItem>
                <SelectItem value="github">
                  <div className="flex items-center">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </div>
                </SelectItem>
                <SelectItem value="pinterest">
                  <div className="flex items-center">
                    <PenTool className="h-4 w-4 mr-2" />
                    Pinterest
                  </div>
                </SelectItem>
                <SelectItem value="tiktok">
                  <div className="flex items-center">
                    <PenTool className="h-4 w-4 mr-2" />
                    TikTok
                  </div>
                </SelectItem>
                <SelectItem value="reddit">
                  <div className="flex items-center">
                    <PenTool className="h-4 w-4 mr-2" />
                    Reddit
                  </div>
                </SelectItem>
                <SelectItem value="other">
                  <div className="flex items-center">
                    <PenTool className="h-4 w-4 mr-2" />
                    Other
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="Link title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of the link"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="e.g., Development, Design, Marketing"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <TagInput
              id="tags"
              placeholder="Add tags and press Enter"
              tags={formData.tags}
              setTags={handleTagsChange}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

