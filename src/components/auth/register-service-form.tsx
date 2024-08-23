"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RegisterServiceSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { register, createService } from "@/actions/register";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { TermsModal } from "./terms-modal";
import { FileInput } from "../ui/file-input";
import { z } from "zod";
import { useRouter } from "next/navigation"; // Import useRouter

type RegisterServiceSchemaType = z.infer<typeof RegisterServiceSchema>;

// Custom hook to handle delayed redirect
const useDelayedRedirect = (success: boolean, delay: number, path: string) => {
  const router = useRouter();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push(path);
      }, delay);

      return () => clearTimeout(timer); // Cleanup the timer if component unmounts
    }
  }, [success, delay, path, router]);
};

export const RegisterServiceForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const router = useRouter(); // Initialize the router

  const form = useForm<RegisterServiceSchemaType>({
    resolver: zodResolver(RegisterServiceSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      serviceName: "",
      pdfFile: undefined,
      terms: false,
    },
  });

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload-pdf?type=service", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    const data = await response.json();
    return data.fileUrl;
  };

  const onSubmit = async (values: RegisterServiceSchemaType) => {
    try {
      setIsPending(true);
      setError("");
      setSuccess("");

      const { pdfFile, ...registerValues } = values;

      // Step 1: Register the user as a service provider
      const registerResponse = await register(registerValues, "SERVICE");

      if (registerResponse.error) {
        setError(registerResponse.error);
        setIsPending(false);
        return;
      }

      let pdfFileUrl = "";
      if (pdfFile) {
        // Step 2: Upload the PDF file
        pdfFileUrl = await handleFileUpload(pdfFile);
      }

      // Step 3: Create the service record
      if (registerResponse?.userId) {
        const serviceResponse = await createService(
          registerResponse.userId,
          registerValues.serviceName,
          registerValues.phoneNumber,
          pdfFileUrl
        );

        if ("error" in serviceResponse) {
          setError(serviceResponse.error);
        } else {
          setSuccess(serviceResponse.success);
        }
      }

      setIsPending(false);
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred.");
      setIsPending(false);
    }
  };

  // Use the custom hook to handle redirect after success
  useDelayedRedirect(!!success, 5000, "/auth/login");

  return (
    <CardWrapper
      headerLabel="Create a Service Account"
      backButtonLabel="Already have an account?"
      backButtonHerf="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Legal First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Legal Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Doe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your phone number"
                      defaultCountry="US"
                      onChange={(value) => form.setValue("phoneNumber", value)}
                      maxLength={15}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Top Services Inc."
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pdfFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Upload Service Certificate (PDF only, max 4MB)
                  </FormLabel>
                  <FormControl>
                    <FileInput
                      label=""
                      id="pdfFile"
                      disabled={isPending}
                      onChange={(files) => {
                        const selectedFile = files?.[0];
                        if (selectedFile) {
                          form.setValue("pdfFile", selectedFile);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="terms"
                    />
                  </FormControl>
                  <FormLabel htmlFor="terms" className="font-normal">
                    I accept the{" "}
                    <span
                      className="text-blue-500 underline cursor-pointer"
                      onClick={() => setTermsOpen(true)}
                    >
                      terms and conditions
                    </span>
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex gap-y-4 items-center justify-between">
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
              <Link href="/auth/register">Buyer account?</Link>
            </Button>
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
              <Link href="/auth/register-dealer">Dealer account?</Link>
            </Button>
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Create an account
          </Button>
        </form>
      </Form>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </CardWrapper>
  );
};
