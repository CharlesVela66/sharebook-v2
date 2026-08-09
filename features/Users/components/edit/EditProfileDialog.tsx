"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "@/db/schema";
import { useState } from "react";
import EditProfileButton from "./EditProfileButton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { editProfileSchema } from "../../schema/edit.schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateUserInformation } from "../../services/user.services";

export default function EditProfileDialog( { user } : { user: User } ) {
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
    },
    })

    async function onSubmit(data: z.infer<typeof editProfileSchema>) {
        try {
            const result = await updateUserInformation(data);
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            toast.success(result.message);
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong updating your information. Try again.")
        }
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<EditProfileButton />} />
        <DialogContent className="sm:max-w-sm bg-background">
            <form id="edit-form" onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader className="mb-3">
                    <DialogTitle className="text-secondary text-xl font-normal">Edit profile information</DialogTitle>
                </DialogHeader>
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
                </FieldGroup>
                <DialogFooter className="bg-background">
                    <DialogClose render={<Button variant="outline" className="hover:bg-secondary-light/20 p-3">Cancel</Button>} />
                    <Button type="submit" className="bg-primary hover:bg-primary/90 p-3">Save</Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    )
}