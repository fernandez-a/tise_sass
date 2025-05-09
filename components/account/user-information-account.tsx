"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client"; // Import the Supabase client

interface Props {
  name: string;
  surname: string;
  email: string;
  phone: string | null;
  createdAt: string;
}

export default function UserInformationCard({
  name,
  surname,
  email,
  phone,
  createdAt,
}: Props) {
  const supabase = createClient();
  const [displayData, setDisplayData] = useState({
    name,
    surname,
    email,
    phone,
  });
  const [formData, setFormData] = useState({ name, surname, email, phone });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const getUser = async () => {
//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser();
//       if (user) setUserId(user.id);
//       else console.error("No user found:", error);
//     };

//     getUser();
//   }, []);
//   const handleSave = async () => {
//     if (!userId) {
//       setError("User not authenticated");
//       return;
//     }
  
//     try {
//       setLoading(true);
//       setError(null);
  
//       const { error } = await supabase
//         .from("user_profile")
//         .update({
//           name: formData.name,
//           surname: formData.surname,
//           email: formData.email,
//           phone: formData.phone ?? null,
//         })
//         .eq("user_id", userId)
//         .single();
  
//       if (error) throw error;
  
//       setDisplayData(formData);
//       setOpen(false);
//       console.log("Saved:", formData);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };
  

  return (
    <div className="bg-primary-foreground p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">User Information</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setFormData(displayData)}>
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="surname" className="text-right">
                  Surname
                </Label>
                <Input
                  id="surname"
                  className="col-span-3"
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  className="col-span-3"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  className="col-span-3"
                  value={formData.phone ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>
            {/* <DialogFooter>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter> */}
            {error && <p className="text-red-500">{error}</p>}
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4 mt-4">
        <div className="flex flex-col gap-2 mb-8">
          <p className="text-sm text-muted-foreground">Profile completion</p>
          <Progress value={66} />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold">Name:</span>
          <span>{displayData.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Surname:</span>
          <span>{displayData.surname}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Email:</span>
          <span>{displayData.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Phone:</span>
          <span>{displayData.phone ?? "Not set"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Role:</span>
          <Badge>User</Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        Joined on {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
