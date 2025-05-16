"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { Label } from "../ui/label";
import { useUser } from "@/context/UserContext";
import { Filter } from "@/types/filter"; // Import the Product type
import { mapFilter } from "@/utils/filterMapping";
import { map } from "zod";
import { Badge } from "../ui/badge";


export default function FilterDisplay() {
    const [filters, setFilters] = useState<Filter[]>([]);
    const supabase = createClient();
    const user = useUser();

    useEffect(() => {
        const fetchFilters = async () => {
            if (user?.id) {
                console.log(user?.id)
                const { data, error } = await supabase
                    .from("filters")
                    .select("*")
                    .eq("user_id", user.id);
                console.log("Fetched filters:", data);
                if (error) {
                    console.error("Error fetching filters:", error);
                    return;
                }
                if (data) {
                    const mapped = data.map(mapFilter)
                    setFilters(mapped)
                }
            } else {
                setFilters([]); // Clear filters if no user
                console.log("User not yet loaded, not fetching filters.");
            }
        };

        fetchFilters();
    }, [supabase, user?.id]);

    if (!user) {
        return <div>Loading user Filters...</div>; // Or a spinner
    }

    return (
        <div>
            {filters.length > 0 ? (
                filters.map((filter) => (
                    <Card key={filter.filter_id} className="m-4 w-[450px]">
                        {/* <CardHeader>
                            <CardTitle>Filter ID: {filter.id.substring(0, 8)}</CardTitle>
                        </CardHeader> */}
                        <CardContent className="flex">
                            {filter.brand_id && (
                                <div className="">
                                    <Label className="text-right w-24">Brand:</Label>
                                    <Badge>{filter.brand_id || "N/A"}</Badge>
                                </div>
                            )}
                            {filter.condition && (
                                <div className="flex flex-col">
                                    <Label className="text-right w-24">Condition:</Label>
                                    <Badge>{filter.condition || "N/A"}</Badge>
                                </div>
                            )}
                            {filter.location && (
                                <div className="">
                                    <Label className="text-right w-24">Location:</Label>
                                    <Badge>{filter.location || "N/A"}</Badge>
                                </div>
                            )}
                            {/* {Object.keys(filter || {})
                                .filter(key => !['brand', 'condition', 'location'].includes(key))
                                .map(key => (
                                    <div key={key} className="flex items-center space-x-2">
                                        <Label className="text-right w-24">{key}:</Label>
                                        <span>{filter[key as keyof typeof filter] || "N/A"}</span>
                                    </div>
                                ))} */}
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Card className="m-4 w-[400px]">
                    <CardContent className="p-4 text-center">
                        No filters saved yet.
                    </CardContent>
                </Card>
            )}
        </div>
    );
}