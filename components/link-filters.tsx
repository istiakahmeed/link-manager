"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  Tag,
  FolderOpen,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Globe,
  PenTool,
  Layers,
} from "lucide-react"
import type { LinkType } from "@/lib/link-utils"

interface LinkFiltersProps {
  tags: string[]
  categories: string[]
  linkTypes?: LinkType[]
}

export function LinkFilters({ tags, categories, linkTypes = [] }: LinkFiltersProps) {
  const [tagsOpen, setTagsOpen] = useState(true)
  const [categoriesOpen, setCategoriesOpen] = useState(true)
  const [linkTypesOpen, setLinkTypesOpen] = useState(true)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTag = searchParams.get("tag")
  const currentCategory = searchParams.get("category")
  const currentLinkType = searchParams.get("type")

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
      case "pinterest":
        return <PenTool className="h-4 w-4 mr-2" />
      case "tiktok":
        return <PenTool className="h-4 w-4 mr-2" />
      case "reddit":
        return <PenTool className="h-4 w-4 mr-2" />
      case "website":
      default:
        return <Globe className="h-4 w-4 mr-2" />
    }
  }

  return (
    <div className="space-y-4">
      <Collapsible open={linkTypesOpen} onOpenChange={setLinkTypesOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="flex w-full justify-between p-2">
            <div className="flex items-center">
              <Layers className="mr-2 h-4 w-4" />
              Link Types
            </div>
            <ChevronRight
              className="h-4 w-4 transition-transform duration-200"
              style={{ transform: linkTypesOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ScrollArea className="h-[120px]">
            <div className="space-y-1 p-2">
              <Link href={pathname}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start ${!currentLinkType ? "bg-accent" : ""}`}
                >
                  All Types
                </Button>
              </Link>
              {[
                "website",
                "facebook",
                "twitter",
                "instagram",
                "linkedin",
                "youtube",
                "github",
                "pinterest",
                "tiktok",
                "reddit",
              ].map((type) => (
                <Link key={type} href={`${pathname}?type=${encodeURIComponent(type)}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start ${currentLinkType === type ? "bg-accent" : ""}`}
                  >
                    <div className="flex items-center">
                      {getLinkTypeIcon(type as LinkType)}
                      <span className="capitalize">{type}</span>
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="flex w-full justify-between p-2">
            <div className="flex items-center">
              <FolderOpen className="mr-2 h-4 w-4" />
              Categories
            </div>
            <ChevronRight
              className="h-4 w-4 transition-transform duration-200"
              style={{ transform: categoriesOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ScrollArea className="h-[120px]">
            <div className="space-y-1 p-2">
              {categories.length === 0 ? (
                <div className="text-sm text-muted-foreground py-2">No categories yet</div>
              ) : (
                <>
                  <Link href={pathname}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${!currentCategory ? "bg-accent" : ""}`}
                    >
                      All Categories
                    </Button>
                  </Link>
                  {categories.map((category) => (
                    <Link key={category} href={`${pathname}?category=${encodeURIComponent(category)}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start ${currentCategory === category ? "bg-accent" : ""}`}
                      >
                        {category}
                      </Button>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="flex w-full justify-between p-2">
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              Tags
            </div>
            <ChevronRight
              className="h-4 w-4 transition-transform duration-200"
              style={{ transform: tagsOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ScrollArea className="h-[200px]">
            <div className="flex flex-wrap gap-1 p-2">
              {tags.length === 0 ? (
                <div className="text-sm text-muted-foreground py-2">No tags yet</div>
              ) : (
                <>
                  <Link href={pathname}>
                    <Badge variant={!currentTag ? "default" : "outline"} className="cursor-pointer">
                      All
                    </Badge>
                  </Link>
                  {tags.map((tag) => (
                    <Link key={tag} href={`${pathname}?tag=${encodeURIComponent(tag)}`}>
                      <Badge variant={currentTag === tag ? "default" : "outline"} className="cursor-pointer">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

