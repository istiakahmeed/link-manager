"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EmailInput } from "@/components/email-input"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle } from "lucide-react"

export function EmailVerificationForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to send verification email")
      }

      setIsVerificationSent(true)
      toast({
        title: "Verification email sent",
        description: "Please check your inbox and click the verification link",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send verification email",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>We'll send a verification link to your email address</CardDescription>
      </CardHeader>
      <CardContent>
        {isVerificationSent ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <div className="text-center">
              <h3 className="text-lg font-medium">Verification Email Sent</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We've sent a verification link to <strong>{email}</strong>. Please check your inbox and click the link
                to verify your email.
              </p>
            </div>
            <Button variant="outline" onClick={() => setIsVerificationSent(false)} className="mt-4">
              Use a different email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <EmailInput value={email} onChange={setEmail} required showValidation />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Verification Link"
              )}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Make sure to check your spam folder if you don't see the email
      </CardFooter>
    </Card>
  )
}

