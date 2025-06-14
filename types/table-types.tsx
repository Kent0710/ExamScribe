"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import removeStudent from "@/actions/remove-student";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export interface StudentTableType {
    username: string;
    strength: string;
    weakness: string;
    averageScore: number;
}

export const studentColumns: ColumnDef<StudentTableType>[] = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "strength",
        header: "Strength",
    },
    {
        accessorKey: "weakness",
        header: "Weakness",
    },
    {
        accessorKey: "averageScore",
        header: "Avg Score",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={()=>{
                            redirect(`/profile/${row.original.username}`)
                        }}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem>Generate Report</DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={async () => {
                                toast.loading(
                                    "Removing " +
                                        row.original.username +
                                        " from subject..."
                                );

                                const res = await removeStudent(
                                    row.original.subjectId,
                                    row.original.username
                                );

                                toast.dismiss();
                                if (!res.success) {
                                    toast.error(res.error);
                                }

                                if (res.self) {
                                    toast.success(res.error);
                                    redirect('/dashboard')
                                }

                                toast.success(
                                    "Successfully removed " +
                                        res.username +
                                        " from subject"
                                );
                            }}
                        >
                            Remove
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
