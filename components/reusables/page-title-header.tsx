import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

interface PageTitleHeaderProps {
    children?: React.ReactNode;
    title: string;
    description?: string;
}

const PageTitleHeader: React.FC<PageTitleHeaderProps> = ({
    children,
    title,
    description,
}) => {
    return (
        <div className="w-full flex justify-between items-center">
            <section className="flex space-x-3 items-center text-purple-500">
                <SidebarTrigger className="hover:text-purple-500" />
                <div>
                    <h1 className="text-xl font-bold"> {title} </h1>
                    <p> {description} </p>
                </div>
            </section>

            {children}
        </div>
    );
};

export default PageTitleHeader;
