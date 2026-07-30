"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signUpSchema } from "../schema/signup.schema"
import { createUser } from "../services/signup.services"
import { useRouter } from "next/navigation"

export default function SignUpForm() {

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    try {
      const user = await createUser(data);
      if (!user.user) {
        toast.error(user.message);
        return;
      }
      toast.success(user.message);
      router.push("/login");
      
    } catch {
      toast.error("Something went wrong with creating your account! Try again");
    }
  }

  return (
    <div className="w-full sm:max-w-md">
      <div>
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex gap-2">
                <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="firstName">
                        First name
                    </FieldLabel>
                    <Input
                        {...field}
                        id="firstName"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please enter your first name"
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
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lastName">
                        Last name
                    </FieldLabel>
                    <Input
                        {...field}
                        id="lastName"
                        placeholder="Please enter your last name"
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
            </div>
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
                    placeholder="Please enter your password"
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
          <Button type="submit" form="signup-form" className="w-full py-5 text-md bg-secondary hover:bg-secondary/90 font-semibold">
            Create an account
          </Button>
        </Field>
      </div>
    </div>
  )
}
