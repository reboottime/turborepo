"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  PasswordInput,
  Spinner,
} from "@repo/ui";
import { useAuth } from "@/lib/auth-context";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      await signIn(data.email, data.password);
      // Redirect will be handled by middleware
      router.push("/employees");
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const email = form.watch("email");
  const password = form.watch("password");
  const isSubmitDisabled = !email || !password || isLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-base px-4">
      <Card className="w-full max-w-[400px] shadow-lg">
        <CardHeader className="flex items-center pb-6">
          {/* App Logo Placeholder */}
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-text-inverse text-2xl font-bold mb-6">
            P
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Server Error Banner */}
              {serverError && (
                <div className="bg-[#FEF2F2] border border-status-error rounded-md p-3 text-sm text-status-error flex items-start gap-2">
                  <span className="flex-shrink-0 text-lg leading-none">!</span>
                  <span>{serverError}</span>
                </div>
              )}

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        readOnly={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter your password"
                        readOnly={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full h-11 font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Spinner />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
