"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

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
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Monitor", url: "/monitor", icon: Funnel },
  { title: "Listings", url: "/listings", icon: Tags },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const router = useRouter();
  const supabase = createClient();
  const pathname = usePathname();

  const [userProfile, setUserProfile] = useState<{
    username: string;
    name: string;
    surname: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Failed to get user", userError);
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
  }, [supabase]);

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
              <Link href="/">
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

            if (isMonitor && pathname.startsWith('/monitor')) {
              return (
                <Collapsible key={item.title}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>

                  <CollapsibleContent className="pl-10">
                    <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <li>
                        <Link
                          href="/monitor/filters"
                          className="flex items-center gap-1 hover:text-foreground transition"
                        >
                          Add a filter
                        </Link>
                      </li>
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            // default item rendering
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
                <DropdownMenuItem><Link href={"/account"}>
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
