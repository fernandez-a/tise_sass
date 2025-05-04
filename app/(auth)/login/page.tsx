import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Authentication forms built using the components.",
};

export default function LogInAuthenticationPage() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Login
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your email below to create your account
          </p>
      </div>
      <LoginForm />
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="text-blue-500 hover:text-blue-400">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-500 hover:text-blue-400">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
}
