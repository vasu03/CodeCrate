// Import required modules
import React from "react";

// Import UI components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Import custom components
import { Separator } from "@/components/Separator";

// Import icons
import { LoaderIcon, UserIcon } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

// A User Profile Dropdown component
export const UserButton = ({ email, fullName, profilePic, loading }) => {
    // render a laoder if user details are being loaded
    if (loading && !profilePic) {
        return (
            <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border-neutral-300">
                <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
            </div>
        );
    };

    // What to display if user don't have any Profile pic
    const AvatartFallbackValue = fullName ? fullName.charAt(0).toUpperCase() : "U";

    // JSX to render the component
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={"outline-none relative"}>
                <Avatar className="bg-gray-300 size-10 flex items-center justify-center">
                    <AvatarImage src={profilePic} alt={"DP"} />
                    <AvatarFallback className="bg-gray-300 font-normal text-lg">{AvatartFallbackValue}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={"w-[240px] md:w-[320px] p-2 md:p-4 bg-neutral-50 shadow-md"} sideOffset={5} >
                <div className="flex items-center justify-start gap-4 px-4 py-2">
                    <Avatar className="bg-gray-300 border border-neutral-400 size-12 flex items-center justify-center">
                        <AvatarImage src={profilePic} alt={"DP"} />
                        <AvatarFallback className="bg-gray-300 font-normal text-lg">{AvatartFallbackValue}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start gap-1">
                        <p className="text-sm font-medium text-neutral-800">{fullName || "User"}</p>
                        <p className="text-xs font-normal text-neutral-600">{email || "user@mail.com"}</p>
                    </div>
                </div>
                <Separator />
                <DropdownMenuItem className={"flex items-center text-sm gap-2 px-4 py-2 text-neutral-700 hover:!text-blue-500 hover:!stroke-blue-500 hover:!bg-blue-100/50 cursor-pointer"}>
                    <UserIcon className="hover:text-blue-500" />
                    <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem className={"flex items-center p-0 hover:!text-red-500"}>
                    <LogoutButton iconSize={4} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};