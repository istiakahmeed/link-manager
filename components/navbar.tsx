"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkIcon, Menu, LogOut, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  // Helper for consistent link styling
  const getLinkClassName = (path: string) =>
    pathname === path
      ? "text-foreground font-medium"
      : "text-foreground/60 transition-colors hover:text-foreground";

  return (
    <header className='sticky flex justify-center items-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center px-4 sm:h-16 sm:px-6 lg:px-8'>
        {/* Menu button - mobile only */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='mr-3 md:hidden shrink-0'
            >
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[min(80vw,300px)]'>
            <div className='flex flex-col gap-8'>
              <Link href='/' className='flex items-center gap-2'>
                <LinkIcon className='h-5 w-5' />
                <span className='font-bold'>Link Manager</span>
              </Link>
              <nav className='flex flex-col gap-4'>
                <Link href='/' className={getLinkClassName("/")}>
                  Home
                </Link>
                {session && (
                  <Link
                    href='/dashboard'
                    className={getLinkClassName("/dashboard")}
                  >
                    Dashboard
                  </Link>
                )}
                {!session && (
                  <>
                    <Link
                      href='/auth/login'
                      className={getLinkClassName("/auth/login")}
                    >
                      Log in
                    </Link>
                    <Link
                      href='/auth/register'
                      className={getLinkClassName("/auth/register")}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo - all screens (aligned left on mobile) */}
        <div className='flex mr-4 md:mr-6'>
          <Link href='/' className='flex items-center gap-2'>
            <LinkIcon className='h-5 w-5' />
            <span className='font-bold text-sm sm:text-base'>Link Manager</span>
          </Link>
        </div>

        {/* Navigation - desktop only */}
        <nav className='hidden md:flex items-center space-x-6 text-sm font-medium'>
          <Link href='/' className={getLinkClassName("/")}>
            Home
          </Link>
          {session && (
            <Link href='/dashboard' className={getLinkClassName("/dashboard")}>
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right side actions - grows to fill space */}
        <div className='flex items-center gap-2 ml-auto'>
          <ThemeToggle />

          {isLoading ? (
            <Skeleton className='h-8 w-8 rounded-full' />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='ml-1 rounded-full'
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className='h-8 w-8 rounded-full object-cover'
                    />
                  ) : (
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                      {session.user?.name?.charAt(0) ||
                        session.user?.email?.charAt(0) ||
                        "U"}
                    </div>
                  )}
                  <span className='sr-only'>User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                <div className='flex items-center justify-start gap-3 p-3'>
                  <div className='flex h-9 w-9 items-center justify-center rounded-full bg-muted'>
                    <User className='h-4 w-4' />
                  </div>
                  <div className='flex flex-col space-y-1 leading-none'>
                    {session.user?.name && (
                      <p className='font-medium'>{session.user.name}</p>
                    )}
                    {session.user?.email && (
                      <p className='w-[200px] truncate text-xs text-muted-foreground'>
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href='/dashboard' className='w-full cursor-pointer'>
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/profile' className='w-full cursor-pointer'>
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='cursor-pointer text-destructive focus:text-destructive'
                  onSelect={(e) => {
                    e.preventDefault();
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  <LogOut className='mr-2 h-4 w-4' />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className='hidden sm:flex items-center gap-2'>
              <Link href='/auth/login'>
                <Button variant='ghost' size='sm'>
                  Log in
                </Button>
              </Link>
              <Link href='/auth/register'>
                <Button size='sm' className='whitespace-nowrap'>
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
