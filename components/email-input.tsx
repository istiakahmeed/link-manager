"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { isValidEmailFormat } from "@/lib/email-validation"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface EmailInputProps {
  id?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  disabled?: boolean
  placeholder?: string
  label?: string
  showValidation?: boolean
}

export function EmailInput({
  id = "email",
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder = "name@example.com",
  label = "Email",
  showValidation = true,
}: EmailInputProps) {
  const [isTouched, setIsTouched] = useState(false)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    // Only validate if there's a value and the field has been touched
    if (value && isTouched) {
      setIsValid(isValidEmailFormat(value))
    } else {
      setIsValid(false)
    }
  }, [value, isTouched])

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsTouched(true)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={
            showValidation && isTouched ? (isValid ? "pr-10 border-green-500" : "pr-10 border-destructive") : ""
          }
        />
        {showValidation && isTouched && value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValid ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-destructive" />
            )}
          </div>
        )}
      </div>
      {showValidation && isTouched && value && !isValid && (
        <p className="text-sm text-destructive">Please enter a valid email address</p>
      )}
    </div>
  )
}

