"use server";

import { createClient } from "@/lib/db/supabase/server";

export default async function getSubject(subjectId: string) {
    const supabase = await createClient();

    const { data: subject, error } = await supabase
        .from("Subject")
        .select()
        .eq("id", subjectId)
        .single();

    if (!subject || error) {
        console.error("Failed to get subject from server", error?.message);
        return {
            success: false,
            error: error?.message,
            subject: {},
        };
    }

    return {
        success: true,
        error: null,
        subject: subject,
    };
}
