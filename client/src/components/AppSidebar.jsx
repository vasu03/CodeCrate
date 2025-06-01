// Import required modules
import React from "react";
import { useSelector } from "react-redux";

// Import UI components
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader
} from "@/components/ui/sidebar";

// Import custom components
import { Logo } from "./Logo";

// Import Lucide Icons
import { Home, Heart, LayoutDashboard, Code } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

// A list of Menu items
const MenuItems = [
    {
        title: "Home",
        url: "/",
        icon: Home
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Snippets",
        url: "/snippets",
        icon: Code
    },
    {
        title: "Favourites",
        url: "/favourites",
        icon: Heart
    },

];

// A global Sidebar component for the App
export const AppSidebar = () => {
    // grab the currently authenticated user from global states
    const { user, loading } = useSelector((state) => state.user);

    // JSX to render the component
    return (
        <Sidebar collapsible="icon" className={"py-2"} >
            <SidebarHeader className={""}>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className={"group-data-[collapsible=icon]:p-[6px]!"}>
                            <a href={"/"}>
                                <Logo />
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className={"py-2"}>
                <SidebarGroup>
                    <SidebarMenu>
                        {MenuItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild className={"text-neutral-700 hover:!text-blue-500 hover:!bg-blue-100/50"}>
                                    <a href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {user && (
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <LogoutButton iconSize={5} />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            )}
        </Sidebar>
    );
};
