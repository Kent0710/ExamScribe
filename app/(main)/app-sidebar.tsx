"use client";

import {
    BookOpen,
    Users,
    BarChart3,
    Settings,
    Home,
    Brain,
    BookA,
    Mail,
    Pen,
    BookText,
    Dumbbell,
    NotebookText,
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
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const bottomItems = [
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
];

const AppSidebar = () => {
    const pathname = usePathname();

    const menuItems = useMemo(
        () => [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: BookOpen,
                active: pathname.includes("dashboard"),
            },
            {
                title: "Subjects",
                url: "/subject",
                icon: BookA,
                active: pathname.includes("subject"),
            },
            {
                title: "Exams",
                url: "#",
                icon: Pen,
                active: pathname.includes("exam"),
            },
            {
                title: "Materials",
                url: "#",
                icon: BookText,
            },
            {
                title: "Students",
                url: "#",
                icon: Users,
            },
            {
                title: "Practice",
                url: "#",
                icon: Dumbbell,
            },
            {
                title: "Notes",
                url: "#",
                icon: NotebookText,
            },
            {
                title: "Analytics",
                url: "#",
                icon: BarChart3,
            },
            {
                title: "Inbox",
                url: "#",
                icon: Mail,
            },
            {
                title: "AI Tools",
                url: "#",
                icon: Brain,
            },
        ],
        [pathname]
    );

    return (
        <Sidebar className="border-none">
            <SidebarHeader className="border-b px-6 py-4 ">
                <Link href={"/"} prefetch={false}>
                    <div className="flex items-center space-x-2 flex-wrap">
                        <Brain className="h-6 w-6 text-white" />
                        <div className="font-bold text-lg">ExamScribe</div>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`font-semibold   hover:bg-white/10 hover:text-white active:bg-white/10 active:text-white ${
                                            item.active &&
                                            "bg-white text-blue-500 hover:bg-white hover:text-blue-500"
                                        }`}
                                    >
                                        <Link href={item.url} prefetch={false}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
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
};

export default AppSidebar;
