"use server";

import { createClient } from "@/lib/db/supabase/server";

export default async function getExam(examId : string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("Exam")
        .select()
        .eq("id", examId)
        .single();

    if (!data || error) {
        console.error('Exam not found error', error?.message);
        return {
            success : false,
            error : error?.message,
            exam : null,
        }
    };

    return {
        success : true,
        error : null,
        exam : data
    }
}
