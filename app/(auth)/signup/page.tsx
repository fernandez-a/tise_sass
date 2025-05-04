import { Metadata } from "next";
import SignupForm from "@/components/forms/signup-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Authentication forms built using the components.",
};

export default function SignUpAuthenticationPage() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Sign Up
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Fill in the form to sign up.
        </p>
      </div>
      <SignupForm />
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
