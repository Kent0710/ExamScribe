"use server";

import { createClient } from "@/lib/db/supabase/server";
import { revalidatePath } from "next/cache";

interface Option {
    id?: string;
    label: string | null;
    value: string | null;
    isCorrectAnswer: boolean | null;
    questionId?: string;
}

interface Question {
    id?: string;
    title: string;
    paragraph: string | null;
    type: string;
    sectionId?: string;
    options: Option[]; // Options are not stored in the Question table but included in the data structure
}

interface Section {
    id?: string;
    title: string;
    order: number;
    examId?: string;
    questions: Question[];
}

export default async function saveChangesExam(
    examId: string,
    sections: Section[],
    fetchedSections: Section[]
) {
    try {
        const supabase = await createClient();

        // Format sections for DB operations
        const sectionsForDB = formatSectionsForDB(sections);

        // Identify new, updated, and deleted sections
        const newSections = sectionsForDB.filter(
            (s) =>
                !s.section.id ||
                !fetchedSections.some((fs) => fs.id === s.section.id)
        );
        const updatedSections = sectionsForDB.filter((s) =>
            fetchedSections.some(
                (fs) =>
                    fs.id === s.section.id &&
                    (fs.title !== s.section.title ||
                        fs.order !== s.section.order)
            )
        );
        const deletedSectionIds = fetchedSections
            .filter((fs) => !sections.some((s) => s.id === fs.id))
            .map((fs) => fs.id);

        // Delete removed sections
        if (deletedSectionIds.length > 0) {
            const { error: deleteError } = await supabase
                .from("Section")
                .delete()
                .in("id", deletedSectionIds);

            if (deleteError) {
                console.error("Error deleting sections:", deleteError.message);
                return {
                    success: false,
                    error: "Failed to delete removed sections. Please try again.",
                };
            }
        }

        // Process sections
        for (const sectionForDB of sectionsForDB) {
            sectionForDB.section.examId = examId;
            let sectionId: string;

            const isNewSection = newSections.includes(sectionForDB);
            const existingSection = fetchedSections.find(
                (fs) => fs.id === sectionForDB.section.id
            );

            if (isNewSection) {
                // Insert new section
                const { data: newSection, error: sectionError } = await supabase
                    .from("Section")
                    .insert(sectionForDB.section)
                    .select()
                    .single();

                if (sectionError || !newSection) {
                    console.error(
                        "Error inserting section:",
                        sectionError?.message
                    );
                    return {
                        success: false,
                        error: "Failed to create section. Please try again.",
                    };
                }
                sectionId = newSection.id;
            } else {
                // Update existing section if needed
                sectionId = sectionForDB.section.id!;
                if (updatedSections.includes(sectionForDB)) {
                    const { error: sectionError } = await supabase
                        .from("Section")
                        .update({
                            title: sectionForDB.section.title,
                            order: sectionForDB.section.order,
                        })
                        .eq("id", sectionId);

                    if (sectionError) {
                        console.error(
                            "Error updating section:",
                            sectionError.message
                        );
                        return {
                            success: false,
                            error: "Failed to update section. Please try again.",
                        };
                    }
                }
            }

            // Identify new, updated, and deleted questions
            const existingQuestions = existingSection?.questions || [];
            const newQuestions = sectionForDB.questions.filter(
                (q) => !q.id || !existingQuestions.some((eq) => eq.id === q.id)
            );
            const updatedQuestions = sectionForDB.questions.filter((q) =>
                existingQuestions.some(
                    (eq) =>
                        eq.id === q.id &&
                        (eq.title !== q.title ||
                            eq.paragraph !== q.paragraph ||
                            eq.type !== q.type)
                )
            );
            const deletedQuestionIds = existingQuestions
                .filter(
                    (eq) => !sectionForDB.questions.some((q) => q.id === eq.id)
                )
                .map((eq) => eq.id);

            // Delete removed questions
            if (deletedQuestionIds.length > 0) {
                const { error: deleteError } = await supabase
                    .from("Question")
                    .delete()
                    .in("id", deletedQuestionIds);

                if (deleteError) {
                    console.error(
                        "Error deleting questions:",
                        deleteError.message
                    );
                    return {
                        success: false,
                        error: "Failed to delete removed questions. Please try again.",
                    };
                }
            }

            // Process questions
            for (const question of sectionForDB.questions) {
                let questionId: string;

                const isNewQuestion = newQuestions.includes(question);
                const existingQuestion = existingQuestions.find(
                    (eq) => eq.id === question.id
                );

                // Prepare question data for DB (exclude options)
                const questionData = {
                    id: question.id,
                    title: question.title,
                    paragraph: question.paragraph,
                    type: question.type,
                    sectionId: sectionId,
                };

                if (isNewQuestion) {
                    // Insert new question
                    const { data: newQuestion, error: questionError } =
                        await supabase
                            .from("Question")
                            .insert(questionData)
                            .select()
                            .single();

                    if (questionError || !newQuestion) {
                        console.error(
                            "Error inserting question:",
                            questionError?.message
                        );
                        return {
                            success: false,
                            error: "Failed to create question. Please try again.",
                        };
                    }
                    questionId = newQuestion.id;
                } else {
                    // Update existing question if needed
                    questionId = question.id!;
                    if (updatedQuestions.includes(question)) {
                        const { error: questionError } = await supabase
                            .from("Question")
                            .update({
                                title: question.title,
                                paragraph: question.paragraph,
                                type: question.type,
                            })
                            .eq("id", questionId);

                        if (questionError) {
                            console.error(
                                "Error updating question:",
                                questionError.message
                            );
                            return {
                                success: false,
                                error: "Failed to update question. Please try again.",
                            };
                        }
                    }
                }

                // Identify new, updated, and deleted options
                const existingOptions = existingQuestion?.options || [];
                const newOptions = question.options.filter(
                    (o) =>
                        !o.id || !existingOptions.some((eo) => eo.id === o.id)
                );
                const updatedOptions = question.options.filter((o) =>
                    existingOptions.some(
                        (eo) =>
                            eo.id === o.id &&
                            (eo.label !== o.label ||
                                eo.value !== o.value ||
                                eo.isCorrectAnswer !== o.isCorrectAnswer)
                    )
                );
                const deletedOptionIds = existingOptions
                    .filter(
                        (eo) => !question.options.some((o) => o.id === eo.id)
                    )
                    .map((eo) => eo.id);

                // Delete removed options
                if (deletedOptionIds.length > 0) {
                    const { error: deleteError } = await supabase
                        .from("Option")
                        .delete()
                        .in("id", deletedOptionIds);

                    if (deleteError) {
                        console.error(
                            "Error deleting options:",
                            deleteError.message
                        );
                        return {
                            success: false,
                            error: "Failed to delete removed options. Please try again.",
                        };
                    }
                }

                // Process options
                for (const option of question.options) {
                    const optionData = {
                        label: option.label,
                        value: option.value,
                        isCorrectAnswer: option.isCorrectAnswer,
                        questionId: questionId,
                    };

                    const isNewOption = newOptions.includes(option);
                    const existingOption = existingOptions.find(
                        (eo) => eo.id === option.id
                    );

                    if (isNewOption) {
                        // Insert new option
                        const { error: optionError } = await supabase
                            .from("Option")
                            .insert(optionData);

                        if (optionError) {
                            console.error(
                                "Error inserting option:",
                                optionError.message
                            );
                            return {
                                success: false,
                                error: "Failed to create option. Please try again.",
                            };
                        }
                    } else if (updatedOptions.includes(option)) {
                        // Update existing option
                        const { error: optionError } = await supabase
                            .from("Option")
                            .update({
                                label: option.label,
                                value: option.value,
                                isCorrectAnswer: option.isCorrectAnswer,
                            })
                            .eq("id", option.id);

                        if (optionError) {
                            console.error(
                                "Error updating option:",
                                optionError.message
                            );
                            return {
                                success: false,
                                error: "Failed to update option. Please try again.",
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
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again.",
        };
    }
}

// Helper function to format sections for DB operations
const formatSectionsForDB = (sections: Section[]) => {
    return sections.map((section) => ({
        section: {
            id: section.id,
            title: section.title,
            order: section.order,
            examId: section.examId,
        },
        questions: section.questions.map((question) => ({
            id: question.id,
            title: question.title,
            paragraph: question.paragraph,
            type: question.type,
            sectionId: question.sectionId,
            options: question.options.map((option) => ({
                id: option.id,
                label: option.label,
                value: option.value,
                isCorrectAnswer: option.isCorrectAnswer,
                questionId: option.questionId,
            })),
        })),
    }));
};
