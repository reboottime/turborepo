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
  EyeIcon,
  EyeOffIcon,
  Spinner,
} from "@repo/ui";
import { useAuth } from "../../lib/auth-context";

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      await signIn(data.username, data.password);
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

  const username = form.watch("username");
  const password = form.watch("password");
  const isSubmitDisabled = !username || !password || isLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-[400px] shadow-lg">
        <CardHeader className="flex items-center pb-6">
          {/* App Logo Placeholder */}
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mb-6">
            P
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Server Error Banner */}
              {serverError && (
                <div className="bg-[#FEF2F2] border border-destructive rounded-md p-3 text-sm text-destructive flex items-start gap-2">
                  <span className="flex-shrink-0 text-lg leading-none">!</span>
                  <span>{serverError}</span>
                </div>
              )}

              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                rules={{ required: "Username is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
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
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          readOnly={isLoading}
                          className="pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
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
