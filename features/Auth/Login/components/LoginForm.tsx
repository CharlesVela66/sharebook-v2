"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginSchema } from "../schema/login.schema"
import { toast } from "sonner"
import { authenticate } from "../services/login.services"
import { useRouter } from "next/navigation"


export default function LoginForm() {

  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
      try {
        const result = await authenticate(data);
        if (!result.success){
          toast.error(result.message);
        }
        else {
          toast.success(result.message);
          router.push('/');
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Try again.")
      }
  }

  return (
    <div className="w-full sm:max-w-md">
      <div>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please enter your email"
                    autoComplete="off"
                    className="py-4"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="password"
                    placeholder="Plase enter your password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    className="py-4"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>
      <div className="w-full mt-4">
        <Field orientation="horizontal" className="w-full">
          <Button type="submit" form="login-form" className="w-full py-5 text-md bg-secondary hover:bg-secondary/90 font-semibold">
            Log In
          </Button>
        </Field>
      </div>
    </div>
  )
}
