"use server";

import { createClient } from "@/lib/db/supabase/server";
import getSectionsQuestionsOptions from "./get-sections-questions-options";
import { redirect } from "next/navigation";

interface Question {
    id: string;
    type: string;
    title: string;
    options: {
        id: string;
        label: string;
        value: string;
        isCorrectAnswer: boolean;
    }[];
    answer?: string;
}

interface Section {
    id: string;
    title: string;
    questions: Question[];
    answer?: string;
}

export default async function submitExam(examId: string, sections: Section[]) {
    const { initialSections } = await getSectionsQuestionsOptions(examId);
    if (initialSections.length === 0) {
        console.error(
            "There is no initialSection object to compare the answers"
        );
        return {
            success: false,
            error: "Something went wrong. Please try again.",
            correctAnswers: 0,
        };
    }

    let correctAnswers = 0;

    const optionsCorrectAnswerMap = new Map();
    initialSections.map((section) => {
        section.questions.map((question) => {
            question.options.map((option) => {
                optionsCorrectAnswerMap.set(option.id, option.isCorrectAnswer);
            });
        });
    });
    console.log(optionsCorrectAnswerMap);

    // is the user answer the same with the server answer and is it the correct answer?
    sections.map((section) => {
        section.questions.map((question) => {
            if (question.type === "multiplechoice") {
                const isCorrectAnswer = optionsCorrectAnswerMap.get(
                    question.answer
                );
                console.log(isCorrectAnswer);
                if (isCorrectAnswer) {
                    correctAnswers++;
                }
            } else if (
                question.type === "checkboxes" &&
                Array.isArray(question.answer)
            ) {
                question.answer.map((ans) => {
                    const isCorrectAnswer = optionsCorrectAnswerMap.get(ans);
                    if (isCorrectAnswer) correctAnswers++;
                });
            }
        });
    });

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

    const { error: accountExamInsertError } = await supabase.from('AccountExam').insert({
        accountId : account.id,
        examId : examId,
        score : correctAnswers,
        
    })

    if (accountExamInsertError) {
        console.error('Failed to insert account exam: ' + accountExamInsertError.message);
        return {
            success : false,
            error : 'Something went wrong. Please try again.',
            correctAnswers : 0,
        }
    }

    return {
        success: true,
        error: null,
        correctAnswers: correctAnswers,
    };
}
