import UserAccount from "@/components/account/user-account";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function AccountPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return notFound();
  const { data: profile } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile || profile.user_id !== user.id) {
    return notFound(); // optional: redirect or show 404 if someone tries to access another user's page
  }
  if (!profile || profile.user_id !== user.id) {
    return <div>Not authorized or user not found.</div>;
  }
  if (profile && user && user.email) {
    const safe_profile = {
      username: profile.username,
      name: profile.name,
      surname: profile.surname,
    };
  
    const safe_user = {
      email: user.email,
      phone: user.phone ?? null,
      created_at: user.created_at,
    };
  
    return <UserAccount profile={safe_profile} user={safe_user} />;
  }
  
 
}
