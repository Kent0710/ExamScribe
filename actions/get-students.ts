"use server";

import { createClient } from "@/lib/db/supabase/server";

export default async function getStudents(subjectId: string) {
    const supabase = await createClient();

    const { data: accountSubject, error } = await supabase
        .from("AccountSubject")
        .select(`
            accountId(username, strength, weakness, averageScore)    
        `)
        .eq("subjectId", subjectId)

    if (error || !accountSubject) {
        return {
            success : false,
            error : error.message,
            students : []
        }
    };

    return {
        success : true,
        error : null,
        students : accountSubject
    }
}
