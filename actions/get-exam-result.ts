"use server";

import getAccount from "./get-account";

export default async function getExamResult(examId: string) {
    const { account, supabase } = await getAccount();

    const { data : examResult, error : examResultError } = await supabase.from('AccountExam').select().match({
        accountId : account.id,
        examId : examId
    }).maybeSingle()

    if (examResultError) {
        console.error('Failed to possibly get exam result: ', examResultError?.message);
        return {
            success : false,
            error : 'Something went wrong when taking this exam. Contact exam moderators.',
            examResult : null,
        }
    };

    return {
        success : true,
        error : null,
        examResult : examResult
    }
}
