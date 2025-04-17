"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema } from "@/validations/auth"
import { ForgotPasswordFormType } from "@/validations/auth"
import { Form } from "@/components/ui/form"
import { InputField } from "../fields/InputField"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const RESEND_TIMEOUT = 10 // seconds

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [countdown, setCountdown] = useState(RESEND_TIMEOUT)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isSubmitted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else if (countdown === 0) {
      setCanResend(true)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isSubmitted, countdown])

  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: ForgotPasswordFormType) {
    try {
      console.log(data)
      setIsSubmitted(true)
      setCountdown(RESEND_TIMEOUT)
      setCanResend(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleResend = () => {
    if (canResend) {
      onSubmit(form.getValues())
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-4 text-center">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? {canResend ? (
              <Button variant="link" className="p-0 h-auto" onClick={handleResend}>
                Click here to resend
              </Button>
            ) : (
              <span className="text-muted-foreground">
                You can resend in {countdown}s
              </span>
            )}
          </p>
        </div>
        <Button asChild variant="link" className="w-full">
          <Link href="/login">Back to login</Link>
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <Button type="submit" className="w-full">
          Send reset link
        </Button>

        <Button asChild variant="link" className="w-full">
          <Link href="/login">Back to login</Link>
        </Button>
      </form>
    </Form>
  )
} 