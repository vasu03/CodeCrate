// Import required modules
import React from "react";
import { Outlet } from "react-router-dom";

// Import custom components
import { Logo } from "@/components/Logo";

// Layout for the app Authentication pages
// it do not contain a sidebar, navbar & footer
const AuthLayout = () => {
    return (
        <div className="max-h-screen max-w-4xl h-[90vh] mx-auto md:p-2">
            <nav className="w-full flex items-center justify-start p-2 md:p-0">
                <Logo />
            </nav>
            <main className="flex items-center justify-center h-[100%] p-0 md:p-2 mx-auto max-w-4xl">
                <Outlet />
            </main>
        </div>
    );
};

// Exporting the AuthLayout
export default AuthLayout;