import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  const error = searchParams?.get("error") || "";

  useEffect(() => {
    // Only redirect if we're sure the session is loaded and user is authenticated
    if (status === "authenticated") {
      router.push(callbackUrl);
    } else if (status !== "loading") {
      // Only set loading to false after we've determined the session status
      setIsLoading(false);
    }
  }, [status, router, callbackUrl]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='auth-container'>
      <h1>Sign In</h1>
      {error && (
        <div className='error'>
          {error === "OAuthAccountNotLinked"
            ? "Email already in use with a different sign-in method."
            : "An error occurred. Please try again."}
        </div>
      )}
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
}
