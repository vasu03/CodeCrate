// Import required modules
import React from "react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import UI components
import { toast } from "sonner";

// Import icons
import { LogOutIcon } from "lucide-react";

// Import global state reducers from Redux-store
import { logoutStart, logoutSuccess, logoutFailure } from "@/redux/user/userSlice";

// A button component for Logout functionality
export const LogoutButton = ({ className = "", iconSize = 4 }) => {
    // an instance for dispatching reducers
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function to handle the Logout process
    const handleLogout = async () => {
        dispatch(logoutStart());

        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();

            if (data.success === false) {
                toast.error("Logout failed", {
                    description: data.message
                })
                return dispatch(logoutFailure(data.message));
            }

            if (res.ok) {
                dispatch(logoutSuccess());
                navigate("/");
                toast.success("Logout successful")
            }
        } catch (err) {
            dispatch(logoutFailure(err.message));
            toast.error("Logout failed",  {
                description: "Please try again later"
            });
        }
    }

    // JSX to render the component
    return (
        <button onClick={handleLogout} type="button" className={cn(
            "w-[100%] h-[100%] px-4 py-2 rounded-md flex items-center justify-start gap-2 text-sm text-neutral-700 hover:!text-red-500 hover:!bg-red-100/50 cursor-pointer",
            className
        )}>
            <LogOutIcon className={cn("hover:!text-red-500", iconSize)} />
            <span className="">Logout</span>
        </button>
    );
};