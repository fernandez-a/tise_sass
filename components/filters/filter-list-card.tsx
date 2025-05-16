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
import { Badge } from "../ui/badge";
import useSocket from "@/hooks/useSocket";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";


export default function FilterDisplay() {
    const [filters, setFilters] = useState<Filter[]>([]);
    const supabase = createClient();
    const user = useUser();
    const socket = useSocket("http://localhost:5000");
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

    useEffect(() => {
        if (!socket) return;

        // const handleNewProduct = (rawNewProduct: any) => {
        //     console.log("WebSocket event 'new_product' received!");
        //     const newProduct = mapFilter(rawNewProduct);
        //     setFilters((prevProducts) => {
        //         if (prevProducts) {
        //             return [newProduct, ...prevProducts];
        //         } else {
        //             return [newProduct];
        //         }
        //     });
        //     console.log('New product received via WebSocket:', newProduct);
        // };
        socket.on('new_filter', (data) => {
            console.log(data)
        })

    }, [socket]);

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
                                <div className="">
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
                            <div className="">
                                <Label className="text-right w-24">Refresh</Label>
                                <Button
                                    variant="ghost"
                                >
                                    <RefreshCcw className="text-green-500" size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <div>Loading user Filters...</div>
            )}
        </div>
    );
}