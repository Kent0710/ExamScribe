"use server";

import { createClient } from "@/lib/db/supabase/server";
import { revalidatePath } from "next/cache";

export default async function deleteExam(examId: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("Exam").delete().eq("id", examId);

    if (error) {
        console.error("Failed to delete exam error.", error?.message);
        return {
            success: false,
            error: error?.message,
        };
    }

    revalidatePath("/subject/[subjectId]");

    return {
        success: true,
        error: null,
    };
}
