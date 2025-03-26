import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {
  getLinksByUserId,
  getUserTags,
  getUserCategories,
  getUserLinkTypes,
} from "@/lib/link-service";
import { LinkList } from "@/components/link-list";
import { LinkFilters } from "@/components/link-filters";
import { AddLinkButton } from "@/components/add-link-button";
import { SearchLinks } from "@/components/search-links";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  // Await the searchParams promise before accessing its properties
  const params = await searchParams;
  const tag = params.tag as string | undefined;
  const category = params.category as string | undefined;
  const query = params.q as string | undefined;
  const linkType = params.type as string | undefined;

  const userId = session.user.id;

  try {
    const links = await getLinksByUserId(userId);
    const tags = await getUserTags(userId);
    const categories = await getUserCategories(userId);
    const linkTypes = await getUserLinkTypes(userId);

    // Filter links based on search parameters
    let filteredLinks = links;

    if (tag) {
      filteredLinks = filteredLinks.filter(
        (link) =>
          link.tags &&
          link.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    }

    if (category) {
      filteredLinks = filteredLinks.filter(
        (link) =>
          link.category &&
          link.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (linkType) {
      filteredLinks = filteredLinks.filter(
        (link) =>
          link.linkType &&
          link.linkType.toLowerCase() === linkType.toLowerCase()
      );
    }

    if (query) {
      filteredLinks = filteredLinks.filter(
        (link) =>
          link.title.toLowerCase().includes(query.toLowerCase()) ||
          (link.description &&
            link.description.toLowerCase().includes(query.toLowerCase())) ||
          link.url.toLowerCase().includes(query.toLowerCase()) ||
          (link.tags &&
            link.tags.some((t) =>
              t.toLowerCase().includes(query.toLowerCase())
            )) ||
          (link.category &&
            link.category.toLowerCase().includes(query.toLowerCase()))
      );
    }

    return (
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {/* Mobile Responsive Header with Filters Drawer */}
        <div className='md:hidden mb-6 flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
            <p className='text-muted-foreground text-sm'>
              Manage your saved links
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant='outline' size='icon'>
                  <Filter className='h-5 w-5' />
                </Button>
              </DrawerTrigger>
              <DrawerContent className='p-4'>
                <DrawerHeader>
                  <DrawerTitle>Filters & Search</DrawerTitle>
                  <DrawerDescription>
                    Find and filter your links
                  </DrawerDescription>
                </DrawerHeader>
                <div className='space-y-4'>
                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle>Search</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SearchLinks />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className='pb-3'>
                      <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LinkFilters
                        tags={tags}
                        categories={categories}
                        linkTypes={linkTypes}
                      />
                    </CardContent>
                  </Card>
                </div>
                <DrawerClose asChild>
                  <Button variant='outline' className='w-full mt-4'>
                    Close
                  </Button>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
            <AddLinkButton />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className='hidden md:block mb-8'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
              <p className='text-muted-foreground'>Manage your saved links</p>
            </div>
            <AddLinkButton />
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className='grid gap-6 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]'>
          {/* Sidebar Filters (Desktop) */}
          <div className='hidden md:block space-y-6'>
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle>Search</CardTitle>
                <CardDescription>Find links by keyword</CardDescription>
              </CardHeader>
              <CardContent>
                <SearchLinks />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <CardTitle>Filters</CardTitle>
                <CardDescription>
                  Browse by type, tag or category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LinkFilters
                  tags={tags}
                  categories={categories}
                  linkTypes={linkTypes}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div>
            <h2 className='text-2xl font-bold mb-6 hidden md:block'>
              Your Links
            </h2>
            <LinkList links={filteredLinks} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground'>Manage your saved links</p>
        </div>
        <Card className='p-8 text-center'>
          <CardTitle className='mb-4'>Error Loading Dashboard</CardTitle>
          <CardDescription>
            There was a problem loading your links. Please try again later.
          </CardDescription>
        </Card>
      </div>
    );
  }
}
