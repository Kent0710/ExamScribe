"use server";

import { createClient } from "@/lib/db/supabase/server";

export default async function getSectionsQuestionsOptions(
    examId: string,
    includeCorrectAnswer?: boolean
) {
    try {
        const supabase = await createClient();

        // Fetch sections
        const { data: sectionsData, error: sectionsError } = await supabase
            .from("Section")
            .select("id, title, order, examId")
            .eq("examId", examId)
            .order("order", { ascending: true });

        if (sectionsError || !sectionsData) {
            console.error("Error fetching sections:", sectionsError?.message);
            return {
                success: false,
                error: "No sections found for this exam. Please refresh.",
                initialSections: [],
            };
        }

        // Initialize final data structure
        const formattedData = [];

        // Process each section sequentially to maintain order
        for (const section of sectionsData) {
            // Fetch questions for current section
            const { data: questionsData, error: questionsError } =
                await supabase
                    .from("Question")
                    .select("id, title, type, sectionId")
                    .eq("sectionId", section.id)
                    .order("id", { ascending: true });

            if (questionsError || !questionsData) {
                console.error(
                    "Error fetching questions:",
                    questionsError?.message
                );
                return {
                    success: false,
                    error: "No questions found for this section. Please refresh.",
                    initialSections: [],
                };
            }

            // Format questions and fetch their options
            const formattedQuestions = [];
            for (const question of questionsData) {
                // Fetch options for current question
                const { data: optionsData, error: optionsError } =
                    await supabase
                        .from("Option")
                        .select("id, label, value, isCorrectAnswer, questionId")
                        .eq("questionId", question.id)
                        .order("id", { ascending: true });

                if (optionsError) {
                    console.error(
                        "Error fetching options:",
                        optionsError?.message
                    );
                    return {
                        success: false,
                        error: "No options found for this question. Please refresh.",
                        initialSections: [],
                    };
                }

                formattedQuestions.push({
                    id: question.id,
                    type: question.type || "",
                    title: question.title,
                    options: optionsData || [],
                });
            }

            // Add formatted section to final data
            formattedData.push({
                id: section.id,
                title: section.title,
                order: section.order,
                questions: formattedQuestions,
            });
        }

        return {
            success: true,
            error: null,
            initialSections: formattedData,
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again.",
            initialSections: [],
        };
    }
}
