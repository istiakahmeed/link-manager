export function isValidEmailFormat(email: string): boolean {
  // RFC 5322 compliant regex for email validation
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}

/**
 * Checks for common disposable email domains
 * You can expand this list as needed
 */
export function isDisposableEmail(email: string): boolean {
  const disposableDomains = [
    "mailinator.com",
    "tempmail.com",
    "temp-mail.org",
    "guerrillamail.com",
    "yopmail.com",
    "sharklasers.com",
    "throwawaymail.com",
    "10minutemail.com",
    "mailnesia.com",
    "trashmail.com",
    "dispostable.com",
  ]

  const domain = email.split("@")[1]?.toLowerCase()
  return disposableDomains.includes(domain)
}

/**
 * Comprehensive email validation
 * Combines format validation and disposable email check
 */
export function validateEmail(email: string): { isValid: boolean; message?: string } {
  if (!email || email.trim() === "") {
    return { isValid: false, message: "Email is required" }
  }

  if (!isValidEmailFormat(email)) {
    return { isValid: false, message: "Invalid email format" }
  }

  if (isDisposableEmail(email)) {
    return { isValid: false, message: "Disposable email addresses are not allowed" }
  }

  return { isValid: true }
}

