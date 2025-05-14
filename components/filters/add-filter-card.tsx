"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { createClient } from "@/utils/supabase/client";

export default function FilterCard() {
    const [formData, setFormData] = useState<string>("");
    const user = useUser(); // User data from context
    const supabase = createClient(); // Create Supabase client

    const handleSave = async () => {
        if (!user) {
            // Early exit if user is not available
            toast.error("User not logged in");
            return;
        }

        console.log("Saved:", formData);
        console.log(`/api/filters?brand=${encodeURIComponent(formData)}`);

        try {
            // Call API to save the filter data
            const res = await fetch(`/api/filters?brand=${encodeURIComponent(formData)}`);
            const data = await res.json();
            console.log(data);

            if (data.success) {
                // Insert into Supabase if the API call was successful
                const { error } = await supabase.from("filters").insert([
                    {
                        user_id: user.id,
                        brand_id: formData,
                    },
                ]);

                if (error) {
                    toast.error(`Error creating filter: ${error.message}`);
                } else {
                    toast.success("New Filter created", {
                        description: `🔔 ${formData} filter created`,
                    });
                }
            } else {
                toast.error("Failed to create filter.");
            }
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    };

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/monitor">Monitor</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/monitor/filters">Add Filter</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="m-1 p-4 w-[350px]">
                <CardHeader>
                    <CardTitle>Add Custom Filter</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="brand"
                                    placeholder="Brand to monitor"
                                    value={formData}
                                    onChange={(e) => setFormData(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSave}>Apply</Button>
                </CardFooter>
            </Card>
        </>

    );
}
