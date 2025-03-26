import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LinkIcon, BookmarkIcon, TagIcon, SearchIcon } from "lucide-react"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage Your Links in One Place
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Save, organize, and access your important links from anywhere. Never lose a valuable resource again.
                </p>
              </div>
              <div className="space-x-4">
                {session ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="h-12 px-8">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <Button size="lg" className="h-12 px-8">
                      Get Started
                    </Button>
                  </Link>
                )}
                <Link href="#features">
                  <Button variant="outline" size="lg" className="h-12 px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Features</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to organize your online resources
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="p-3 bg-primary/10 rounded-full">
                  <LinkIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Save Links</h3>
                <p className="text-center text-muted-foreground">Quickly save and organize links from around the web</p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="p-3 bg-primary/10 rounded-full">
                  <TagIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Tag & Categorize</h3>
                <p className="text-center text-muted-foreground">
                  Create custom tags and categories for easy organization
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="p-3 bg-primary/10 rounded-full">
                  <SearchIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Search & Filter</h3>
                <p className="text-center text-muted-foreground">
                  Find exactly what you need with powerful search and filtering
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="p-3 bg-primary/10 rounded-full">
                  <BookmarkIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Access Anywhere</h3>
                <p className="text-center text-muted-foreground">
                  Your links are available on any device, anytime you need them
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Personal Link Manager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

