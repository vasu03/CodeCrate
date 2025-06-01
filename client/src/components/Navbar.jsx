// Import required modules
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import UI components
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Import icons
import { MenuIcon } from "lucide-react";

// Import custom components
import { UserButton } from "@/components/UserButton";

// Create a Navbar component for the App
export const Navbar = () => {
    const navigate = useNavigate();
    // grab the currently authenticated user from global states
    const { user, loading } = useSelector((state) => state.user);

    // JSX to render the component
    return (
        <nav className="flex items-center justify-between py-2 px-4 border-b border-neutral-300">
            {/* Left Nav container */}
            <div className="">
                <SidebarTrigger>
                    <MenuIcon />
                </SidebarTrigger>
            </div>

            {/* Right Nav container */}
            <div className="flex items-center justify-evenly gap-x-3">
                {!user ?
                    (
                        <Button onClick={() => navigate("/sign-in")} variant={"primary"} size={"sm"} className="px-6">Sign In</Button>
                    ) : (
                        <>
                            <UserButton email={user.email} fullName={user.fullName} profilePic={user.profilePic} loading={loading} />
                        </>
                    )
                }
            </div>
        </nav>
    );
};
