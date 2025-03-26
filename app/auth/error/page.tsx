import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const error = searchParams.error as string | undefined

  let errorMessage = "An error occurred during authentication."

  switch (error) {
    case "CredentialsSignin":
      errorMessage = "Invalid email or password. Please try again."
      break
    case "AccessDenied":
      errorMessage = "You do not have permission to access this resource."
      break
    case "OAuthAccountNotLinked":
      errorMessage = "This email is already associated with another account."
      break
    case "OAuthSignin":
    case "OAuthCallback":
    case "OAuthCreateAccount":
      errorMessage = "There was a problem with the authentication provider."
      break
    case "EmailCreateAccount":
    case "EmailSignin":
      errorMessage = "There was a problem with email authentication."
      break
    case "SessionRequired":
      errorMessage = "You must be signed in to access this page."
      break
    default:
      errorMessage = "An unknown error occurred during authentication."
  }

  return (
    <div className="container flex h-[calc(100vh-4rem)] w-screen flex-col items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
          </div>
          <CardDescription>There was a problem signing you in</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{errorMessage}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/auth/login">Try Again</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

