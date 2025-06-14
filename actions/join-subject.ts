"use server";

import { createClient } from "@/lib/db/supabase/server";
import { redirect } from "next/navigation";

export default async function joinSubject(subjectCode: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    const { data: account } = await supabase
        .from("Account")
        .select()
        .eq("auth_user_id", user.id)
        .single();

    if (!account) {
        redirect("/configure");
    }

    const { data: subject, error: accountError } = await supabase
        .from("Subject")
        .select()
        .eq("code", subjectCode)
        .single();

    if (!subject || accountError) {
        console.error(
            "Failed getting subject for joining",
            accountError?.message
        );
        return {
            success: false,
            error: accountError?.message,
            subjectId: null,
        };
    }

    const { error: joinError } = await supabase.from("AccountSubject").insert({
        accountId: account.id,
        subjectId: subject.id,
    });

    if (joinError) {
        console.error(
            "Failed on inserting new account and subject for join",
            joinError?.message
        );
        return {
            success: false,
            error: joinError?.message,
            subjectId: null,
        };
    }

    redirect(`/subject/${subject.id}`);
}
