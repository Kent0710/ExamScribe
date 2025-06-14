"use client";

import {
    BookOpen,
    Users,
    BarChart3,
    Settings,
    Home,
    Brain,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "All Sections",
        url: "/dashboard",
        icon: BookOpen,
    },
    {
        title: "Students",
        url: "#",
        icon: Users,
    },
    {
        title: "Analytics",
        url: "#",
        icon: BarChart3,
    },
    {
        title: "AI Tools",
        url: "#",
        icon: Brain,
    },
];

const bottomItems = [
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="border-none">
            <SidebarHeader className="border-b px-6 py-4 ">
                <Link href={"/"}>
                    <div className="flex items-center space-x-2 flex-wrap">
                        <Brain className="h-6 w-6 text-white" />
                        <div className="font-bold text-lg">ExamScribe</div>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white">Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="font-semibold">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t">
                <SidebarMenu>
                    {bottomItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url} className="font-semibold">
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
