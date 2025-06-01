// Import required modules
import React from "react";
import { cn } from "@/lib/utils";

// A Separator component to separate the contents around it
export const Separator = (className) => {
    // JSX to render the component
    return (
        <div className={cn("w-[90%] mx-auto my-1 border-b border-border", className)}></div>
    );
};
