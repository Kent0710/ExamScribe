// Use for opening and closing an exam from the exam tab actions

"use server";

import { createClient } from "@/lib/db/supabase/server";
import { revalidatePath } from "next/cache";

export async function editExamStatus(examId: string, newExamStatus: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("Exam")
        .select()
        .eq("id", examId)
        .single();

    if (error && !data) {
        console.error("Exam does not exist!", error.message);
        return {
            success: false,
            error: "Exam does not exist! Refresh the page.",
        };
    }

    if (newExamStatus === "Open") {
        if (data.status === "Open") {
            return {
                success: false,
                error: "Exam already opened.",
            };
        }

        const { error: openError } = await supabase
            .from("Exam")
            .update({
                status: newExamStatus,
            })
            .eq("id", examId);

        if (openError) {
            console.error("Failed to open exam: ", openError.message);
            return {
                success: false,
                error: "Failed to open exam. Try again",
            };
        }
    } else if (newExamStatus === "Close") {
        if (data.status === "Close") {
            return {
                success: false,
                error: "Exam already closed.",
            };
        }

        const { error: closeError } = await supabase
            .from("Exam")
            .update({
                status: newExamStatus,
            })
            .eq("id", examId);

        if (closeError) {
            console.error("Failed to close exam", closeError.message);
            return {
                success: false,
                error: "Failed to close exam. Try again",
            };
        }
    };

    revalidatePath('/subject/[subjectId]')

    return {
        success: true,
        error: null,
    };
}
