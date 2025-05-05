import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function AccountRedirectPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile?.username) {
    return <div>Error: Username not found.</div>;
  }

  redirect(`/account/${profile.username}`);
}
