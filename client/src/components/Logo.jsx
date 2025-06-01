// Import required modules
import { CodeXml } from "lucide-react";
import React from "react";

// Create a Logo for the App
export const Logo = () => {

    // JSX to render the logo
    return (
        <div className="w-fit flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="!size-7" >
                <defs>
                    <linearGradient id="iconGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                </defs>
                <CodeXml stroke="url(#iconGradient)" strokeWidth="3" />
            </svg>
            <span className="text-[28px] font-bold bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 bg-clip-text text-transparent">
                CodeCrate
            </span>
        </div>
    );
};