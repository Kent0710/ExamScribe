"use server";

import { createClient } from "@/lib/db/supabase/server";
import { redirect } from "next/navigation";

export default async function getAccount() {
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

    if (!account || accountError) {
        redirect('/configure')
    };

    return {
        account : account,
        supabase : supabase   
    }
}
