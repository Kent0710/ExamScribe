"use server";

import { createClient } from "@/lib/db/supabase/server";
import { redirect } from "next/navigation";

export default async function getSubjects() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: account, error: accountError } = await supabase
        .from("Account")
        .select()
        .eq("auth_user_id", user.id)
        .single();

    // TODO: HANDLE CONFIGURE PAGE
    if (accountError || !account) {
        redirect("/configure");
    }

    const { data: subjects, error: subjectsError } = await supabase
        .from("AccountSubject")
        .select(`
            subjectId(*)    
        `)
        .eq("accountId", account.id);

    if (subjectsError || !subjects) {
        console.error("Error getting subjects", subjectsError.message);
        return {
            error: subjectsError.message,
            success: false,
            subjects: [],
        };
    }

    return {
        error: null,
        success: true,
        subjects: subjects,
    };
}
