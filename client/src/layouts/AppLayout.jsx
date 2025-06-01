// Import required modules
import React from "react";
import { Outlet } from "react-router-dom";

// Import UI components
import { SidebarProvider } from "@/components/ui/sidebar";

// Import custom components
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Layout for the main Application
// it contains the sidebar, navbar & footer along with other aplication pages
const AppLayout = () => {
    return (
        <SidebarProvider>
            <div className="flex h-screen max-h-screen max-w-screen">
                <AppSidebar />
                <div className="flex flex-col flex-1 h-screen w-screen max-h-screen max-w-screen overflow-y-auto">
                    <Navbar />
                    <main className="flex-1">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </SidebarProvider>
    );
};

// Exporting the AppLayout
export default AppLayout;