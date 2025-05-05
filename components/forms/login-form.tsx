"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client
import Link from "next/link";
import DiscordSignInButton from "../discord-auth-button";

// Define the form schema using Zod
const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(6, { message: "Password is required" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    const supabase = createClient();

    try {
      const { data: signInData, error } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (error) {
        console.error("Login failed:", error.message);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("User not found after login.");
        return;
      }

      const { name, surname,username } = user.user_metadata || {};
      console.log(user.user_metadata)
      const { error: insertError } = await supabase
        .from("user_profile")
        .insert({
          user_id: user.id,
          name,
          surname,
          username
        });

      if (insertError) {
        console.error("Profile insert failed:", insertError.message);
      }
      router.push(callbackUrl ?? "/dashboard");
    } catch (error) {
      console.error("Unexpected login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
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
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <DiscordSignInButton />
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Sign Up
        </Link>
      </div>
    </>
  );
}
