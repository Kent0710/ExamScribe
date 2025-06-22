"use client";

import deleteExam from "@/actions/delete-exam";
import { editExamStatus, openExam } from "@/actions/edit-exam-status";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Play, BarChart3, Trash2, Pause } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ExamTableActionsProps {
    examId: string;
    examStatus: string;
}

const ExamTableActions: React.FC<ExamTableActionsProps> = ({
    examId,
    examStatus,
}) => {
    const router = useRouter();
    const [isActionClicked, setIsActionClicked] = useState(false);

    const handleActionClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        const button = (e.target as HTMLElement).closest<HTMLButtonElement>(
            "button"
        );
        if (!button) return;

        const action = button.dataset.action;

        if (!action) return;

        if (action !== "edit" && isActionClicked) return; // Prevent duplicate actions for non-edit buttons
        setIsActionClicked(true);

        switch (action) {
            case "preview":
                toast.info("Preview action clicked."); // Implement logic as needed
                break;

            case "edit":
                router.push(`/exam/${examId}`);
                break;

            case "open":
                toast.loading("Opening this exam...");
                // Edit exam status params are examID, newExamStatus, and action
                const openRes = await editExamStatus(examId, "Open");
                toast.dismiss();
                if (!openRes.success) {
                    toast.error(openRes.error);
                    return;
                }
                toast.success("Exam opened successfully!");
                break;

            case "close":
                toast.loading("Closing this exam...");
                // Edit exam status params are examID, newExamStatus, and action
                const closeRes = await editExamStatus(examId, "Close");
                toast.dismiss();
                if (!closeRes.success) {
                    toast.error(closeRes.error);
                    return;
                }
                toast.success("Exam closed successfully!");
                break;

            case "analytics":
                toast.info("View analytics clicked."); // Placeholder
                break;

            case "delete":
                toast.loading("Deleting exam...");
                const res = await deleteExam(examId);
                toast.dismiss();

                if (!res.success) {
                    toast.error("Error deleting exam: " + res.error);
                } else {
                    toast.success("Exam deleted successfully!");
                }
                break;
        }

        if (action !== "edit") setIsActionClicked(false);
    };

    return (
        <div className="flex space-x-1" onClick={handleActionClick}>
            <Button
                variant="ghost"
                size="sm"
                title="Preview"
                data-action="preview"
            >
                <Eye className="w-4 h-4" />
            </Button>

            <Button
                variant="ghost"
                size="sm"
                title="Edit"
                data-action="edit"
                disabled={isActionClicked}
            >
                <Edit className="w-4 h-4" />
            </Button>

            <Button
                variant="ghost"
                size="sm"
                title="Start Exam"
                data-action={examStatus === "Open" ? "close" : "open"}
            >
                {examStatus === "Open" ? (
                    <Pause className="w-4 h-4" />
                ) : (
                    <Play className="w-4 h-4" />
                )}
            </Button>

            <Button
                variant="ghost"
                size="sm"
                title="Analytics"
                data-action="analytics"
            >
                <BarChart3 className="w-4 h-4" />
            </Button>

            <Button
                variant="ghost"
                size="sm"
                title="Delete"
                data-action="delete"
                disabled={isActionClicked}
                className="text-red-600 hover:text-red-700"
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default ExamTableActions;
