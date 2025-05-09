"use client";

import { useState } from "react";
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

interface Props {
  name: string;
  username: string;
}

export default function TiseAccountCard({ name, username }: Props) {
  const [displayData, setDisplayData] = useState({ name, username }); // what we show
  const [formData, setFormData] = useState({ name, username });       // temp editing data
  const [open, setOpen] = useState(false);                            // dialog state

  const handleSave = () => {
    setDisplayData(formData); // only update display after save
    setOpen(false); // close dialog
    console.log("Saved:", formData);
  };

  return (
    <div className="bg-primary-foreground p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-4">Tise Account</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setFormData(displayData)} 
            >
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
                <Label htmlFor="name" className="text-right">Name</Label>
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
                <Label htmlFor="username" className="text-right">Username</Label>
                <Input
                  id="username"
                  className="col-span-3"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-4 space-y-1">
        <p><strong>Name:</strong> {displayData.name}</p>
        <p><strong>Username:</strong> {displayData.username}</p>
      </div>
    </div>
  );
}
