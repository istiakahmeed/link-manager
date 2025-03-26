import type { LinkType } from "./link-service"

// This function can be safely used in client components
export function detectLinkType(url: string): LinkType {
  const lowerUrl = url.toLowerCase()

  if (lowerUrl.includes("facebook.com") || lowerUrl.includes("fb.com")) {
    return "facebook"
  } else if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) {
    return "twitter"
  } else if (lowerUrl.includes("instagram.com")) {
    return "instagram"
  } else if (lowerUrl.includes("linkedin.com")) {
    return "linkedin"
  } else if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
    return "youtube"
  } else if (lowerUrl.includes("github.com")) {
    return "github"
  } else if (lowerUrl.includes("pinterest.com")) {
    return "pinterest"
  } else if (lowerUrl.includes("tiktok.com")) {
    return "tiktok"
  } else if (lowerUrl.includes("reddit.com")) {
    return "reddit"
  } else {
    return "website"
  }
}

// Export LinkType for client components to use
export type { LinkType }

