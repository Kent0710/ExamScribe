import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./app-sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <SidebarProvider className="purple-gradient" >
            <AppSidebar />
            <main className="p-4 w-screen h-full ">
                {children}
            </main>
        </SidebarProvider>
    );
};

export default MainLayout;
