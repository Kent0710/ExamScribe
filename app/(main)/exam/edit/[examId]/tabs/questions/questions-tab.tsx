"use client";

import { useEffect, useState } from "react";
import QuestionCardEdit from "./question-card-edit";
import { Button } from "@/components/ui/button";
import { Save, Terminal, Trash } from "lucide-react";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import saveChangesExam from "@/actions/save-changes.exam";

import { v4 as uuidv4 } from "uuid";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useIsCreatedSectionsHasParagraph } from "@/stores/edit-exam-settings-tab-stores";

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
    paragraph: string;
}

interface Section {
    id: string;
    title: string;
    questions: Question[];
}

interface QuestionsTabProps {
    examId: string;
    initialSections: Section[];
    sectionCount: number;
}

const QuestionsTab: React.FC<QuestionsTabProps> = ({
    examId,
    initialSections,
    sectionCount: initialSectionCount,
}) => {
    // USE FOR TRACKING THE NUMBER OF SECTIONS
    const [sectionCount, setSectionCount] = useState(initialSectionCount);
    // USE FOR TRACKING CHANGES FOR THE SECTIONS
    const [sections, setSections] = useState<Section[]>(initialSections);

    const [paragraphTypeQuestionsCount,setParagraphTypeQuestionsCount] = useState(0);
    useEffect(()=> {
        sections.map((section) => {
            section.questions.map((question) => {
                if (question.type === 'paragraph') setParagraphTypeQuestionsCount((prevCount) => prevCount + 1);
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addNewSection = () => {
        // CREATE UUIDS WHILE VALIDATING THAT THEY ARE UNIQUE
        // TODO: ADD VALIDATION HERE ON THE USE STATE TO ENSURE THAT THEY UUIDS ARE UNIQUE
        const newSectionId = uuidv4();
        const newSectionQuestionId = uuidv4();

        // ADD NEW FIELDS HERE FOR THE SECTION
        setSections((prevSections) => [
            ...prevSections,
            {
                id: newSectionId,
                title: `Section ${sectionCount}`,
                order: sectionCount,
                questions: [
                    {
                        id: newSectionQuestionId,
                        type: "",
                        title: "",
                        options: [],
                        paragraph: "",
                    },
                ],
            },
        ]);
        setSectionCount((prevCount) => prevCount + 1);
        // Smooth scroll to the newly created section
        setTimeout(() => {
            const newSectionElement = document.querySelector(
                `#section-${newSectionId}`
            );
            if (newSectionElement) {
                newSectionElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }, 100); // Delay to ensure the section is rendered
    };

    const addNewQuestion = (sectionId: string) => {
        // TODO: ADD VALIDATION HERE ON THE USE STATE TO ENSURE THAT THEIR UUIDS ARE UNIQUE
        const newQuestionId = uuidv4();

        setSections((prevSections) =>
            prevSections.map((section) =>
                section.id === sectionId
                    ? {
                          ...section,
                          questions: [
                              ...section.questions,
                              {
                                  id: newQuestionId,
                                  type: "",
                                  title: "",
                                  options: [],
                                  paragraph: "",
                              },
                          ],
                      }
                    : section
            )
        );
    };

    const [isSavingChanges, setIsSavingChanges] = useState(false);
    const saveChanges = async () => {
        setIsSavingChanges(true);

        // VALIDATE SECTIONS AND QUESTIONS
        // SECTION MUST HAVE A TITLE
        // QUESTION MUST HAVE A TITLE, TYPE, AND PARAGRAPH/OPTIONS (THERE SHOULD BE ATLEAST ONE!)
        // FOR CHECKBOXES, THERE SHOULD BE ATLEAST ONE CORRECT ANSWER AND SO IN MULTIPLE CHOICE
        const isValid = sections.every((section) => {
            if (!section.title.trim()) {
                toast.error(`Section ${section.id} must have a title`);
                return false;
            }
            return section.questions.every((question) => {
                if (!question.title.trim()) {
                    toast.error(
                        `Question ${question.id} in Section ${section.id} must have a title`
                    );
                    return false;
                }
                if (!question.type.trim()) {
                    toast.error(
                        `Question ${question.id} in Section ${section.id} must have a type`
                    );
                    return false;
                }
                if (
                    question.type === "checkboxes" &&
                    question.options.filter((o) => o.isCorrectAnswer).length ===
                        0
                ) {
                    toast.error(
                        `Question ${question.id} in Section ${section.id} must have at least one correct answer`
                    );
                    return false;
                }
                if (
                    question.type === "checkboxes" &&
                    question.options.length < 1
                ) {
                    toast.error(
                        `Question ${question.id} in Section ${section.id} must have at least one option`
                    );
                    return false;
                }
                if (
                    question.type === "multiplechoice" &&
                    question.options.length < 1
                ) {
                    toast.error(
                        `Question ${question.id} in Section ${section.id} must have at least one option`
                    );
                    return false;
                }
                if (
                    question.type === "multiplechoice" &&
                    question.options.filter((o) => o.isCorrectAnswer).length ===
                        0
                ) {
                    toast.error(
                        `Question ${question.id} in Section ${section.id} must have at least one correct answer`
                    );
                    return false;
                }
                if (
                    question.type === "multiplechoice" &&
                    question.options.filter((o) => o.isCorrectAnswer).length !==
                        1
                ) {
                    toast.error(
                        `Question ${question.id} in Section ${section.id} must have exactly one correct answer`
                    );
                    return false;
                }
                return true;
            });
        });

        if (!isValid) {
            setIsSavingChanges(false);
            return;
        }

        const res = await saveChangesExam(examId, sections, initialSections);

        if (!res.success) {
            toast.error(res.error, { duration: 1500 });
        } else {
            toast.success("Changed saved successfully", { duration: 1500 });
        }

        setIsSavingChanges(false);
    };

    return (
        <div>
            <Button
                className="fixed bottom-4"
                onClick={saveChanges}
                disabled={isSavingChanges}
            >
                <Save /> Save changes
            </Button>

            {initialSections.length === 0 && (
                <Alert className="mb-6">
                    <Terminal />
                    <AlertTitle>No sections for this exam yet.</AlertTitle>
                    <AlertDescription>
                        Add new section below to start creating questions for
                        this exam.
                    </AlertDescription>
                </Alert>
            )}

            {sections.map((section) => (
                <div
                    id={`section-${section.id}`}
                    key={section.id}
                    className="mb-8"
                >
                    <div>
                        <div className="flex justify-between items-center gap-12 ">
                            <Input
                                placeholder={section.title}
                                className="border-none md:text-lg px-0 mx-0 shadow-none"
                            />
                            <div className="space-x-2 flex flex-nowrap">
                                <Button
                                    variant={"secondary"}
                                    onClick={() => {
                                        // focus on the input and change section name
                                        const input = document.querySelector(
                                            `input[placeholder="${section.title}"]`
                                        ) as HTMLInputElement;
                                        if (input) {
                                            input.focus();
                                        }
                                    }}
                                >
                                    Rename section
                                </Button>
                                <Button
                                    variant={"secondary"}
                                    onClick={() => {
                                        // for deleting a section
                                        setSections((prevSections) =>
                                            prevSections.filter(
                                                (s) => s.id !== section.id
                                            )
                                        );
                                        toast.success(
                                            "Section deleted successfully",
                                            { duration: 1000 }
                                        );
                                    }}
                                >
                                    <Trash /> Delete section{" "}
                                </Button>
                            </div>{" "}
                        </div>
                        <small>
                            {" "}
                            <span className="font-semibold">
                                {" "}
                                Number of questions:{" "}
                            </span>{" "}
                            {section.questions.length}{" "}
                        </small>
                    </div>
                    <section className="grid gap-4 my-6">
                        {section.questions.map((question) => (
                            <QuestionCardEdit
                                key={question.id}
                                question={question}
                                sectionId={section.id}
                                sections={sections}
                                setSections={setSections}
                                paragraphTypeQuestionsCount={paragraphTypeQuestionsCount}
                            />
                        ))}
                    </section>
                    <Button
                        variant={"secondary"}
                        onClick={() => addNewQuestion(section.id)}
                        className="ml-auto block"
                    >
                        Add new question
                    </Button>
                </div>
            ))}
            <Button
                variant={"secondary"}
                onClick={addNewSection}
                className="flex place-self-center"
            >
                Add new section
            </Button>
        </div>
    );
};

export default QuestionsTab;
