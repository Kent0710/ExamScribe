"use server";

import { SettingsTabFormSchema } from "@/types/form-schema";
import { z } from "zod";
import getAccount from "./get-account";
import { revalidatePath } from "next/cache";
import { ExamSettingsType } from "@/types/objects-types";

export default async function editExamSettings(
    examId: string,
    data: z.infer<typeof SettingsTabFormSchema>,
    // the original exam settings
    // will be used to check what needs to be changed
    examSettings: ExamSettingsType
) {
    const { account, supabase } = await getAccount();

    if (account.role !== "EDUCATOR") {
        return {
            success: false,
            error: "You are not authorized for this action.",
        };
    }

    const changes: Partial<ExamSettingsType> = {};
    for (const key in data) {
        if (
            data[key as keyof ExamSettingsType] !==
            examSettings[key as keyof ExamSettingsType]
        ) {
            changes[key as keyof ExamSettingsType] =
                data[key as keyof ExamSettingsType];
        }
    }

    if (Object.keys(changes).length === 0) {
        return {
            success: true,
            error: null,
        };
    }

    const { error: updateExamError } = await supabase
        .from("Exam")
        .update(changes)
        .eq("id", examId);

    if (updateExamError) {
        console.error(
            "Can not update exam settings: ",
            updateExamError.message
        );
        return {
            success: false,
            error: "Can not update exam. Try again.",
        };
    }

    revalidatePath("/exam/edit/[examId]");
    return {
        success: true,
        error: null,
    };
}
