"use server";

import { createClient } from "@/lib/db/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function removeStudent(
    subjectId: string,
    username: string
) {
    const supabase = await createClient();

    const { data: account } = await supabase
        .from("Account")
        .select()
        .eq("username", username)
        .single();
    if (!account) redirect("/configure");

    const { error } = await supabase.from("AccountSubject").delete().match({
        subjectId: subjectId,
        accountId: account.id,
    });

    if (error) {
        return {
            error: error.message,
            success: false,
            username: null,
            self : null,
        };
    }

    const cookieStore = await cookies();
    const cookieUsername = cookieStore.get("username")?.value;
    if (cookieUsername === username) {
        return {
            error: "You removed yourself from the subject.",
            success: true,
            username: username,
            self : true
        };
    }

    return {
        error: null,
        success: true,
        username: username,
        self : false,
    };
}
