"use client";

import { use, useState } from "react";
import { z } from "zod"
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
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { createClient } from "@/utils/supabase/client";
import { Label } from "../ui/label";

// const formSchema = z.object({
//   email: z.string()
//   password: z.string(
// });

export default function FilterCard() {
    const [formData, setFormData] = useState({
        brand: '',
        condition: '',
        country: ''
    });

    const user = useUser();
    const supabase = createClient();

    const handleSave = async () => {
        if (!user) {
            toast.error("User not logged in");
            return;
        }

        // Build query parameters dynamically
        const queryParams = new URLSearchParams();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) queryParams.append(key, value);
        });

        const apiUrl = `/api/filters?${queryParams.toString()}`;
        console.log("API URL:", apiUrl);

        try {
            const res = await fetch(apiUrl);
            const data = await res.json();
            console.log(user.id)
            if (data.success) {
                const filter_data = data.results.filter
                console.log(filter_data)
                const { error: insertError } = await supabase.from("filters").insert({
                    user_id: user.id,
                    brand_id: filter_data.brand,
                    location: filter_data.country,
                    condition: filter_data.condition,
                });

                if (insertError) {
                    console.error("Profile insert failed:", insertError.message);
                }
                toast.success("New Filter created", {
                    description: `🔔 Filter for ${formData.brand} created`,
                });
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
                        <BreadcrumbLink href="/monitor/new_filter">Add Filter</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="m-1 p-4 w-[350px]">
                <CardHeader>
                    <CardTitle>Add Custom Filter</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Brand</Label>
                                <Input
                                    id="brand"
                                    placeholder="Brand to monitor"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="country">Country</Label>
                        <Select onValueChange={(value) => setFormData({ ...formData, country: value })}>
                            <SelectTrigger id="country">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="FI">FI</SelectItem>
                                <SelectItem value="NO">NO</SelectItem>
                                <SelectItem value="DK">DK</SelectItem>
                                <SelectItem value="unset">ALL</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="condition">Condition</Label>
                        <Select onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                            <SelectTrigger id="condition">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {/* conditions: new, lightly_used, used, well_used */}
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="used">Used</SelectItem>
                                <SelectItem value="lightly_used">Lightly Used</SelectItem>
                                <SelectItem value="well_used">Well Used</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSave}>Apply</Button>
                </CardFooter>
            </Card>
        </>

    );
}
