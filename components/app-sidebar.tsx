"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import {
  Home,
  Funnel,
  Tags,
  Settings,
  User2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUser } from "@/context/UserContext"; // Corrected import to 'user'

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Monitor", url: "/monitor", icon: Funnel },
  { title: "Listings", url: "/listings", icon: Tags },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const router = useRouter();
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    username: string;
    name: string;
    surname: string;
  } | null>(null);
  const user = useUser(); // Get user from context

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        // User not yet loaded from context
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("user_profile")
        .select("username, name, surname")
        .eq("user_id", user.id)
        .single();

      if (profileError) {
        console.error("Failed to fetch profile", profileError);
      } else {
        setUserProfile(profile);
      }
    };

    fetchUserData();
  }, [supabase, user]);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error.message);
    } else {
      router.push("/login");
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={`/account/${userProfile?.username}`}>
                <Image src="/next.svg" alt="logo" width={20} height={20} />
                <span>{userProfile ? `${userProfile.username}` : "Loading..."}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            const isMonitor = item.title === "Monitor";
            if (isMonitor) {
              return (
                <Collapsible key={item.title} open={isOpen} onOpenChange={setIsOpen}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton onClick={() => setIsOpen(!isOpen)}>
                        <item.icon />
                        <span>{item.title}</span>
                        {isOpen ? (
                          <ChevronUp className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>

                  <CollapsibleContent className="pl-10">
                    <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                      {userProfile?.username && (
                        <li>
                          <Link
                            href={`/monitor/${userProfile.username}/filters`}
                            className="flex items-center gap-1 hover:text-foreground transition"
                          >
                            My Filters
                          </Link>
                          <Link
                            href={`/monitor/${userProfile.username}/new_filter`}
                            className="flex items-center gap-1 hover:text-foreground transition"
                          >
                            Add a filter
                          </Link>
                        </li>
                      )}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  {userProfile ? `${userProfile.name} ${userProfile.surname}` : "Loading..."}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><Link href={`/account/${userProfile?.username}`}>
                  Account
                </Link></DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}