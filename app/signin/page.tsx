"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/auth/login-form";
import { redirect, useRouter } from "next/navigation"; // Use next/navigation, not next/router
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  const error = searchParams?.get("error") || "";
  if (session) {
    redirect("/dashboard");
  }
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
      <LoginForm />
    </div>
  );
}
