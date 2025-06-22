"use server";

import { createClient } from "@/lib/db/supabase/server";
import { revalidatePath } from "next/cache";

export default async function saveChangesExam(examId: string, sections: any[]) {
    // FORMAT FOR DB INSERTING
    const sectionsForDB = formatSectionsForDB(sections);

    const supabase = await createClient();

    // Insert sections and process their questions and options
    for (const sectionForDB of sectionsForDB) {
        // Add examId to the section
        sectionForDB.section.examId = examId;

        // Insert section
        const { data: sectionData, error: sectionError } = await supabase
            .from("Section")
            .insert(sectionForDB.section)
            .select()
            .single();

        if (!sectionData || sectionError) {
            console.error(
                "Cannot process section data: ",
                sectionError.message
            );
            return {
                success: false,
                error: "Something went wrong on sections. Please try again.",
            };
        }

        // Insert questions for this section
        const questionsForDB = sectionForDB.questions.map((q) => ({
            ...q,
            sectionId: sectionData.id,
        }));

        if (questionsForDB.length > 0) {
            const { data: questionsData, error: questionsError } =
                await supabase.from("Question").insert(questionsForDB).select();

            if (!questionsData || questionsError) {
                console.error(
                    "Cannot process questions data: ",
                    questionsError.message
                );
                // TODO: Consider deleting the created section
                return {
                    success: false,
                    error: "Something went wrong on questions. Please try again.",
                };
            }

            // Insert options for each question
            for (const [index, question] of questionsData.entries()) {
                const optionsForDB = sectionForDB.options[index].map((o) => ({
                    ...o,
                    questionId: question.id,
                }));

                if (optionsForDB.length > 0) {
                    const { data: optionsData, error: optionsError } =
                        await supabase
                            .from("Option")
                            .insert(optionsForDB)
                            .select();

                    if (!optionsData || optionsError) {
                        console.error(
                            "Cannot process options data: ",
                            optionsError.message
                        );
                        // TODO: Consider deleting the created section and questions
                        return {
                            success: false,
                            error: "Something went wrong on options. Please try again.",
                        };
                    }
                }
            }
        }
    }

    revalidatePath("/exam/[examId]");
    return {
        success: true,
        error: null,
    };
}

// HELPER FUNCTION TO FORMAT THE RAW JSON DATA TO DATABASE OBJECTS
const formatSectionsForDB = (sections: any[]) => {
    return sections.map((section) => ({
        section: {
            title: section.title,
            order : section.order
        },
        questions: section.questions.map((question) => ({
            paragraph: question.paragraph,
            title: question.title,
            type: question.type,
        })),
        options: section.questions.map((question) =>
            question.options.map((option) => ({
                isCorrectAnswer: option.isCorrectAnswer,
                label: option.label,
                value: option.value,
            }))
        ),
    }));
};
