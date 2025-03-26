import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "@/lib/user-service";
import { getLinksByUserId } from "@/lib/link-service";
import { LinkIcon, FolderIcon, TagIcon, UserIcon } from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const userId = session.user.id;
  const user = await getUserById(userId);
  const links = await getLinksByUserId(userId);

  // Calculate statistics
  const totalLinks = links.length;
  const totalCategories = new Set(
    links.map((link) => link.category).filter(Boolean)
  ).size;

  const allTags = links.flatMap((link) => link.tags || []);
  const totalTags = new Set(allTags).size;

  // Get member since date
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  return (
    <div className='container py-4 sm:py-6 md:py-8 max-w-[95%] sm:max-w-[90%] md:max-w-4xl mx-auto'>
      <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>My Profile</h1>

      <div className='grid gap-4 sm:gap-6'>
        {/* Profile Card */}
        <Card>
          <CardHeader className='flex flex-col sm:flex-row items-center gap-4 pb-4'>
            <Avatar className='h-16 w-16 sm:h-20 sm:w-20 border-2 border-muted'>
              <AvatarImage
                src={session.user.image || ""}
                alt={session.user.name || "User"}
              />
              <AvatarFallback className='bg-primary/10 text-lg sm:text-xl'>
                {session.user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1 text-center sm:text-left mt-2 sm:mt-0'>
              <CardTitle className='text-lg sm:text-xl'>
                {session.user.name}
              </CardTitle>
              <CardDescription className='text-sm sm:text-base break-all sm:break-normal'>
                {session.user.email}
              </CardDescription>
              <p className='text-xs text-muted-foreground mt-1'>
                Member since {memberSince}
              </p>
            </div>
            {/* <Button
              variant='outline'
              size='sm'
              className='gap-2 mt-3 sm:mt-0 w-full sm:w-auto'
            >
              <UserIcon className='h-4 w-4' />
              <span>Edit Profile</span>
            </Button> */}
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4'>
          <Card>
            <CardContent className='p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4'>
              <div className='bg-primary/10 p-2 sm:p-3 rounded-full'>
                <LinkIcon className='h-4 w-4 sm:h-5 sm:w-5 text-primary' />
              </div>
              <div className='text-center sm:text-left'>
                <p className='text-xs sm:text-sm font-medium'>Total Links</p>
                <p className='text-xl sm:text-2xl font-bold'>{totalLinks}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4'>
              <div className='bg-primary/10 p-2 sm:p-3 rounded-full'>
                <FolderIcon className='h-4 w-4 sm:h-5 sm:w-5 text-primary' />
              </div>
              <div className='text-center sm:text-left'>
                <p className='text-xs sm:text-sm font-medium'>Categories</p>
                <p className='text-xl sm:text-2xl font-bold'>
                  {totalCategories}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='xs:col-span-2 md:col-span-1'>
            <CardContent className='p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4'>
              <div className='bg-primary/10 p-2 sm:p-3 rounded-full'>
                <TagIcon className='h-4 w-4 sm:h-5 sm:w-5 text-primary' />
              </div>
              <div className='text-center sm:text-left'>
                <p className='text-xs sm:text-sm font-medium'>Tags</p>
                <p className='text-xl sm:text-2xl font-bold'>{totalTags}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader className='pb-2 sm:pb-4'>
            <CardTitle className='text-lg sm:text-xl'>
              Recent Activity
            </CardTitle>
            <CardDescription className='text-xs sm:text-sm'>
              Your most recently saved links
            </CardDescription>
          </CardHeader>
          <CardContent>
            {links.length > 0 ? (
              <div className='space-y-3 sm:space-y-4'>
                {links.slice(0, 3).map((link, index) => (
                  <div
                    key={index}
                    className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border'
                  >
                    <div className='flex items-center gap-2 w-full sm:w-auto'>
                      <LinkIcon className='h-4 w-4 text-muted-foreground' />
                      <div className='flex-1 min-w-0'>
                        <p className='font-medium text-sm sm:text-base truncate'>
                          {link.title}
                        </p>
                        <p className='text-xs text-muted-foreground truncate max-w-[280px] sm:max-w-full'>
                          {link.url}
                        </p>
                      </div>
                    </div>
                    {link.category && (
                      <Badge
                        variant='secondary'
                        className='mt-1 sm:mt-0 sm:ml-auto'
                      >
                        {link.category}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-muted-foreground text-center py-4 text-sm'>
                You haven't saved any links yet.
              </p>
            )}
          </CardContent>
          {links.length > 3 && (
            <CardFooter className='flex justify-center border-t pt-3 sm:pt-4'>
              <Button variant='ghost' size='sm' className='text-xs sm:text-sm'>
                View all links
              </Button>
            </CardFooter>
          )}
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader className='pb-2 sm:pb-4'>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0'>
              <CardTitle className='text-lg sm:text-xl'>
                Account Settings
              </CardTitle>
              <Badge variant='outline' className='self-start sm:self-auto'>
                Coming Soon
              </Badge>
            </div>
            <CardDescription className='text-xs sm:text-sm mt-1'>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
            <div className='p-3 sm:p-4 border rounded-lg'>
              <h3 className='font-medium text-sm sm:text-base mb-1'>
                Email Preferences
              </h3>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Manage your email notification settings
              </p>
            </div>
            <div className='p-3 sm:p-4 border rounded-lg'>
              <h3 className='font-medium text-sm sm:text-base mb-1'>
                Account Security
              </h3>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Update your password and security settings
              </p>
            </div>
          </CardContent>
          <CardFooter className='border-t pt-3 sm:pt-4'>
            <p className='text-xs sm:text-sm text-muted-foreground w-full text-center'>
              Account settings will be available in a future update.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
