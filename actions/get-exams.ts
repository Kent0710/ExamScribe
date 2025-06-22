"use server";

import { createClient } from "@/lib/db/supabase/server";

export default async function getExams(subjectId: string) {
    const supabase = await createClient();

    const { data: exams, error } = await supabase
        .from("Exam")
        .select()
        .eq("subjectId", subjectId);

    if (!exams || error) {
        console.error("No data found for this exam error", error.message);
        return {
            success: false,
            error: error.message,
            exams: [],
        };
    }

    const formattedExams = [];
    exams.map((exam) => {
        const obj = {
            id: exam.id,
            title: exam.title,
            type: exam.type,
            questions: exam.questionCount,
            duration: exam.examDuration,
            status: exam.status,
            attempts: exam.attempts, // TODO: FIX THIS LATER,
            avgScore: exam.averageScore,
            createdDate: "2024-01-20",
            dueDate: new Date(exam.dueDate).toLocaleString()
        };
        formattedExams.push(obj)
    });

    return {
        success: true,
        error: null,
        exams: formattedExams,
    };
}
