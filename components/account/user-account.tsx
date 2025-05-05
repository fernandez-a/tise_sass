"use client";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface UserAccountProps {
  profile: {
    username: string;
    name: string;
    surname: string;
  };
  user: {
    email: string;
    phone: string | null;
    created_at: string;
  };
}

export default function UserAccount({ profile, user }: UserAccountProps) {
  return (
    <div className="">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/account">My account</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{profile.username}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4 flex flex-col xl:flex-row gap-8">
        <div className="w-full xl:w-1/3 space-y-6">
          <div className="bg-primary-foreground p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">User Information</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Edit User</Button>
                </SheetTrigger>
              </Sheet>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex flex-col gap-2 mb-8">
                <p className="text-sm text-muted-foreground">
                  Profile completion
                </p>
                <Progress value={66} />
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">Name:</span>
                <span>{profile.name} {profile.surname}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Phone:</span>
                <span>{user.phone ?? "Not set"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Role:</span>
                <Badge>User</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Joined on {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
