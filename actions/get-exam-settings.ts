"use server";

import { redirect } from "next/navigation";
import getAccount from "./get-account";
import { revalidatePath } from "next/cache";

export default async function getExamSettings(examId: string) {
    const { account, supabase } = await getAccount();

    if (!account) {
        redirect("/login");
    } else if (account.role !== "EDUCATOR") {
        return {
            success: false,
            error: "You are not authorized for this action.",
            examSettings : null,
        };
    }

    const { data : examSettings, error } = await supabase
        .from("Exam")
        .select("allowImmediateResultViewing, allowMultipleResponses")
        .eq("id", examId)
        .single();

    if (error) {
        console.error('Can not get exam settings: ERR LINE 25 on get-exam-settings.ts | Supabase error: ' + error.message);
        return {
            success : false,
            error : 'Something went wrong. Please refresh the page.',
            examSettings : null,
        }
    };

    return {
        success : true,
        error : null,
        examSettings : examSettings,
    }
}
