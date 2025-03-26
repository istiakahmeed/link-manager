"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Edit,
  Trash,
  Tag,
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  PenTool,
  Globe,
  Calendar,
} from "lucide-react";
import type { LinkType } from "@/lib/link-utils";
import { DeleteLinkDialog } from "@/components/delete-link-dialog";
import { EditLinkDialog } from "@/components/edit-link-dialog";

// Define a client-side Link type
interface ClientLink {
  _id?: string;
  userId: string;
  url: string;
  title: string;
  description?: string;
  tags: string[];
  category?: string;
  linkType: LinkType;
  createdAt: Date;
  updatedAt: Date;
}

interface LinkListProps {
  links: ClientLink[];
}

// Share Dialog Component
function ShareLinkDialog({ link }: { link: ClientLink }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const socialShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      link.url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      link.url
    )}&text=${encodeURIComponent(link.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      link.url
    )}`,
  };

  const openSocialShare = (platform: keyof typeof socialShareLinks) => {
    window.open(socialShareLinks[platform], "_blank", "width=600,height=400");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Share2 className='h-4 w-4' />
          <span className='sr-only'>Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center justify-between'>
            <div className='flex-grow mr-4'>
              <h3 className='font-medium text-sm truncate'>{link.title}</h3>
              <p className='text-xs text-gray-500 truncate'>{link.url}</p>
            </div>
            <Button
              variant='outline'
              size='icon'
              onClick={handleCopyLink}
              className={copiedLink ? "bg-green-100" : ""}
            >
              {copiedLink ? (
                <Check className='h-4 w-4 text-green-600' />
              ) : (
                <Copy className='h-4 w-4' />
              )}
            </Button>
          </div>
          <div className='flex justify-center space-x-4'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => openSocialShare("facebook")}
            >
              <Facebook className='h-5 w-5 text-blue-600' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => openSocialShare("twitter")}
            >
              <Twitter className='h-5 w-5 text-sky-500' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => openSocialShare("linkedin")}
            >
              <Linkedin className='h-5 w-5 text-blue-700' />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function LinkList({ links }: LinkListProps) {
  const [linkToEdit, setLinkToEdit] = useState<ClientLink | null>(null);
  const [linkToDelete, setLinkToDelete] = useState<ClientLink | null>(null);

  if (links.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <h3 className='text-xl font-semibold mb-2'>No links found</h3>
        <p className='text-muted-foreground mb-4'>
          Start adding links to your collection
        </p>
      </div>
    );
  }

  const getLinkTypeIcon = (type: LinkType) => {
    switch (type) {
      case "facebook":
        return <Facebook className='h-4 w-4 text-blue-600' />;
      case "twitter":
        return <Twitter className='h-4 w-4 text-sky-500' />;
      case "instagram":
        return <Instagram className='h-4 w-4 text-pink-600' />;
      case "linkedin":
        return <Linkedin className='h-4 w-4 text-blue-700' />;
      case "youtube":
        return <Youtube className='h-4 w-4 text-red-600' />;
      case "github":
        return <Github className='h-4 w-4' />;
      case "pinterest":
        return <PenTool className='h-4 w-4 text-red-600' />;
      case "tiktok":
        return <PenTool className='h-4 w-4 text-black' />;
      case "reddit":
        return <PenTool className='h-4 w-4 text-orange-600' />;
      case "website":
      default:
        return <Globe className='h-4 w-4 text-green-600' />;
    }
  };

  const getLinkTypeColor = (type: LinkType) => {
    switch (type) {
      case "facebook":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "twitter":
        return "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400";
      case "instagram":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400";
      case "linkedin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "youtube":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "github":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "pinterest":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "tiktok":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "reddit":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "website":
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    }
  };

  return (
    <div className='grid gap-5 md:grid-cols-2'>
      {links.map((link) => (
        <Card
          key={link._id}
          className='group relative overflow-hidden rounded-xl border border-border/10 shadow-sm hover:shadow-md hover:border-border/30 transition-all duration-300 bg-card/80 backdrop-blur-sm'
        >
          {/* Background gradient based on link type */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 ${getLinkTypeColor(
              link.linkType
            ).replace("text-", "bg-")}`}
          />

          <div
            className={`absolute inset-0 opacity-[0.02] bg-gradient-to-br from-${
              link.linkType === "website" ? "green" : link.linkType
            }-50/30 via-transparent to-transparent pointer-events-none`}
          />

          <CardHeader className='pb-2 relative'>
            <div className='flex items-center flex-wrap gap-2 mb-2'>
              <Badge
                variant='outline'
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${getLinkTypeColor(
                  link.linkType
                )}`}
              >
                {getLinkTypeIcon(link.linkType)}
                <span className='capitalize text-xs font-medium'>
                  {link.linkType}
                </span>
              </Badge>
              {link.category && (
                <Badge
                  variant='secondary'
                  className='px-2.5 py-0.5 rounded-full text-xs'
                >
                  {link.category}
                </Badge>
              )}
              <div className='ml-auto flex items-center text-xs text-muted-foreground gap-1'>
                <Calendar className='h-3 w-3' />
                <span>
                  {new Date(link.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <CardTitle className='text-lg mt-1.5 mb-1 line-clamp-1 font-semibold group-hover:text-primary transition-colors duration-200'>
              {link.title}
            </CardTitle>

            <CardDescription className='line-clamp-1 text-sm opacity-70 group-hover:opacity-100 transition-opacity'>
              {link.url}
            </CardDescription>
          </CardHeader>

          <CardContent className='pb-2 relative'>
            {link.description && (
              <p className='text-sm text-muted-foreground mb-3 line-clamp-2 group-hover:text-muted-foreground/90 transition-colors'>
                {link.description}
              </p>
            )}

            {link.tags && link.tags.length > 0 && (
              <div className='flex flex-wrap gap-1.5 mt-2'>
                {link.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant='outline'
                    className='text-xs px-2 py-0.5 rounded-full bg-card/80 hover:bg-card transition-colors'
                  >
                    <Tag className='h-3 w-3 mr-1 opacity-70' />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className='pt-3 flex justify-end border-t border-border/10 relative mt-2'>
            <div className='flex gap-1.5'>
              <Button
                variant='ghost'
                size='icon'
                asChild
                className='rounded-full hover:bg-success/10 text-success/80 hover:text-success transition-colors'
              >
                <a href={link.url} target='_blank' rel='noopener noreferrer'>
                  <ExternalLink className='h-4 w-4' />
                  <span className='sr-only'>Open</span>
                </a>
              </Button>

              <ShareLinkDialog link={link} />

              <Button
                variant='ghost'
                size='icon'
                onClick={() => setLinkToEdit(link)}
                className='rounded-full hover:bg-primary/10 text-primary/80 hover:text-primary transition-colors'
              >
                <Edit className='h-4 w-4' />
                <span className='sr-only'>Edit</span>
              </Button>

              <Button
                variant='ghost'
                size='icon'
                onClick={() => setLinkToDelete(link)}
                className='rounded-full hover:bg-destructive/10 text-destructive/80 hover:text-destructive transition-colors'
              >
                <Trash className='h-4 w-4' />
                <span className='sr-only'>Delete</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}

      {linkToEdit && (
        <EditLinkDialog
          link={linkToEdit}
          open={!!linkToEdit}
          onOpenChange={() => setLinkToEdit(null)}
        />
      )}

      {linkToDelete && (
        <DeleteLinkDialog
          link={linkToDelete}
          open={!!linkToDelete}
          onOpenChange={() => setLinkToDelete(null)}
        />
      )}
    </div>
  );
}
