import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getLinksByUserId, getUserTags, getUserCategories, getUserLinkTypes } from "@/lib/link-service"
import { LinkList } from "@/components/link-list"
import { LinkFilters } from "@/components/link-filters"
import { AddLinkButton } from "@/components/add-link-button"
import { SearchLinks } from "@/components/search-links"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  // Await the searchParams promise before accessing its properties
  const params = await searchParams
  const tag = params.tag as string | undefined
  const category = params.category as string | undefined
  const query = params.q as string | undefined
  const linkType = params.type as string | undefined

  const userId = session.user.id

  try {
    const links = await getLinksByUserId(userId)
    const tags = await getUserTags(userId)
    const categories = await getUserCategories(userId)
    const linkTypes = await getUserLinkTypes(userId)

    // Filter links based on search parameters
    let filteredLinks = links

    if (tag) {
      filteredLinks = filteredLinks.filter(
        (link) => link.tags && link.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
      )
    }

    if (category) {
      filteredLinks = filteredLinks.filter(
        (link) => link.category && link.category.toLowerCase() === category.toLowerCase(),
      )
    }

    if (linkType) {
      filteredLinks = filteredLinks.filter(
        (link) => link.linkType && link.linkType.toLowerCase() === linkType.toLowerCase(),
      )
    }

    if (query) {
      filteredLinks = filteredLinks.filter(
        (link) =>
          link.title.toLowerCase().includes(query.toLowerCase()) ||
          (link.description && link.description.toLowerCase().includes(query.toLowerCase())) ||
          link.url.toLowerCase().includes(query.toLowerCase()) ||
          (link.tags && link.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))) ||
          (link.category && link.category.toLowerCase().includes(query.toLowerCase())),
      )
    }

    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your saved links</p>
        </div>

        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Search</CardTitle>
                <CardDescription>Find links by keyword</CardDescription>
              </CardHeader>
              <CardContent>
                <SearchLinks />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Filters</CardTitle>
                <CardDescription>Browse by type, tag or category</CardDescription>
              </CardHeader>
              <CardContent>
                <LinkFilters tags={tags} categories={categories} linkTypes={linkTypes} />
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Links</h2>
              <AddLinkButton />
            </div>
            <LinkList links={filteredLinks} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Dashboard error:", error)
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your saved links</p>
        </div>
        <Card className="p-8 text-center">
          <CardTitle className="mb-4">Error Loading Dashboard</CardTitle>
          <CardDescription>There was a problem loading your links. Please try again later.</CardDescription>
        </Card>
      </div>
    )
  }
}

