"use server";

import { createClient } from "@/lib/db/supabase/server";
import { redirect } from "next/navigation";

export default async function createSubject(values) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    console.log("uss", user.id);
    const { data: account } = await supabase
        .from("Account")
        .select()
        .eq("auth_user_id", user.id)
        .single();

    console.log(account);

    const { data, error } = await supabase
        .from("Subject")
        .insert({
            departmentName: values.departmentName,
            subjectName: values.subjectName,
        })
        .select()
        .single();

    if (error) {
        console.error("Error inserting subject data", error);
        return {
            success: false,
            error: error?.message,
            subjectId: null,
        };
    }

    const { error: joinError } = await supabase.from("AccountSubject").insert({
        subjectId: data.id,
        accountId: account.id,
    });

    if (joinError) {
        await supabase.from("Subject").delete().eq("id", data.id);
        console.error(
            "Error creating a join for account and subject",
            joinError.message
        );
        return {
            success: false,
            error: joinError.message,
            subjectId: null,
        };
    }

    return {
        success: true,
        error: null,
        subjectId: data.id,
    };
}
