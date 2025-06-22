"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Trash, X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

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

interface QuestionCardEditProps {
    question: Question;
    sectionId: string;
    sections: Section[];
    setSections: Dispatch<SetStateAction<Section[]>>;
}

const QuestionCardEdit: React.FC<QuestionCardEditProps> = ({
    question,
    sectionId,
    sections,
    setSections,
}) => {
    const [questionType, setQuestionType] = useState(question.type);

    return (
        <Card className="px-[1.5rem] " id={`question-${question.id}`}>
            <CardTitle>
                <div className="flex justify-between items-center">
                    <Textarea
                        placeholder="Untitled Question"
                        className="resize-none max-w-[35rem] border-none"
                        value={question.title}
                        onChange={(e) => {
                            setSections((prevSections) =>
                                prevSections.map((section) =>
                                    section.id === sectionId
                                        ? {
                                              ...section,
                                              questions: section.questions.map(
                                                  (q) =>
                                                      q.id === question.id
                                                          ? {
                                                                ...q,
                                                                title: e.target
                                                                    .value,
                                                            }
                                                          : q
                                              ),
                                          }
                                        : section
                                )
                            );
                        }}
                    />
                    <Select
                        value={questionType}
                        onValueChange={(value) => {
                            setQuestionType(value);
                            setSections((prevSections) =>
                                prevSections.map((section) =>
                                    section.id === sectionId
                                        ? {
                                              ...section,
                                              questions: section.questions.map(
                                                  (q) =>
                                                      q.id === question.id
                                                          ? {
                                                                ...q,
                                                                type: value,
                                                                options:
                                                                    value ===
                                                                        "multiplechoice" ||
                                                                    value ===
                                                                        "checkboxes"
                                                                        ? q
                                                                              .options
                                                                              .length
                                                                            ? q.options.map(
                                                                                  (
                                                                                      opt
                                                                                  ) => ({
                                                                                      ...opt,
                                                                                      isCorrectAnswer:
                                                                                          false,
                                                                                  })
                                                                              )
                                                                            : [
                                                                                  {
                                                                                      id: "1",
                                                                                      label: "Option 1",
                                                                                      value: "option1",
                                                                                      isCorrectAnswer:
                                                                                          false,
                                                                                  },
                                                                              ]
                                                                        : [],
                                                            }
                                                          : q
                                              ),
                                          }
                                        : section
                                )
                            );
                        }}
                    >
                        <SelectTrigger className="w-[10rem]">
                            <SelectValue placeholder="Question Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="paragraph">Paragraph</SelectItem>
                            <SelectItem value="multiplechoice">
                                Multiple Choice
                            </SelectItem>
                            <SelectItem value="checkboxes">
                                Checkboxes
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardTitle>
            <CardContent className="px-0">
                {questionType === "checkboxes" && (
                    <Checkboxes
                        options={question.options}
                        setSections={setSections}
                        sectionId={sectionId}
                        questionId={question.id}
                    />
                )}
                {questionType === "paragraph" && (
                    <Paragraph
                        setSections={setSections}
                        sectionId={sectionId}
                        questionId={question.id}
                        paragraph={question.paragraph}
                    />
                )}
                {questionType === "multiplechoice" && (
                    <MultipleChoice
                        options={question.options}
                        setSections={setSections}
                        sectionId={sectionId}
                        questionId={question.id}
                    />
                )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 px-0">
                <Button
                    onClick={() => {
                        let newQuestionId = uuidv4();
                        setSections((prevSections) =>
                            prevSections.map((section) => {
                                if (section.id === sectionId) {
                                    newQuestionId = newQuestionId;
                                    return {
                                        ...section,
                                        questions: [
                                            ...section.questions,
                                            {
                                                ...question,
                                                id: newQuestionId,
                                            },
                                        ],
                                    };
                                }
                                return section;
                            })
                        );

                        setTimeout(() => {
                            const newQuestionElement = document.querySelector(
                                `#question-${newQuestionId}`
                            );
                            if (newQuestionElement) {
                                newQuestionElement.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }
                        }, 100);
                    }}
                >
                    <Copy /> Duplicate
                </Button>
                <Button
                    onClick={() => {
                        const section = sections.find(
                            (s) => s.id === sectionId
                        );
                        if (section && section.questions.length <= 1) {
                            toast.error(
                                "Each section must have at least one question."
                            );
                            return;
                        }
                        setSections((prevSections) =>
                            prevSections.map((section) =>
                                section.id === sectionId
                                    ? {
                                          ...section,
                                          questions: section.questions.filter(
                                              (q) => q.id !== question.id
                                          ),
                                      }
                                    : section
                            )
                        );
                    }}
                >
                    <Trash /> Delete
                </Button>
            </CardFooter>
        </Card>
    );
};

export default QuestionCardEdit;

interface CheckboxesProps {
    options: {
        id: string;
        label: string;
        value: string;
        isCorrectAnswer: boolean;
    }[];
    setSections: Dispatch<SetStateAction<Section[]>>;
    sectionId: string;
    questionId: string;
}

const Checkboxes: React.FC<CheckboxesProps> = ({
    options,
    setSections,
    sectionId,
    questionId,
}) => {
    return (
        <div className="space-y-4">
            {options.map((option) => (
                <div
                    key={option.id}
                    className="flex justify-between items-center gap-12"
                >
                    <div className="flex items-center space-x-2 w-full">
                        <Checkbox />
                        <Input
                            placeholder={option.label}
                            value={option.label}
                            className="border-none"
                            onChange={(e) => {
                                setSections((prevSections) =>
                                    prevSections.map((section) =>
                                        section.id === sectionId
                                            ? {
                                                  ...section,
                                                  questions:
                                                      section.questions.map(
                                                          (q) =>
                                                              q.id ===
                                                              questionId
                                                                  ? {
                                                                        ...q,
                                                                        options:
                                                                            q.options.map(
                                                                                (
                                                                                    opt
                                                                                ) =>
                                                                                    opt.id ===
                                                                                    option.id
                                                                                        ? {
                                                                                              ...opt,
                                                                                              label: e
                                                                                                  .target
                                                                                                  .value,
                                                                                              value: e.target.value.toLowerCase(),
                                                                                          }
                                                                                        : opt
                                                                            ),
                                                                    }
                                                                  : q
                                                      ),
                                              }
                                            : section
                                    )
                                );
                            }}
                        />
                    </div>
                    <div className="space-x-2 flex flex-nowrap">
                        <Button
                            variant={
                                option.isCorrectAnswer ? "green" : "secondary"
                            }
                            onClick={() => {
                                setSections((prevSections) =>
                                    prevSections.map((section) =>
                                        section.id === sectionId
                                            ? {
                                                  ...section,
                                                  questions:
                                                      section.questions.map(
                                                          (q) =>
                                                              q.id ===
                                                              questionId
                                                                  ? {
                                                                        ...q,
                                                                        options:
                                                                            q.options.map(
                                                                                (
                                                                                    opt
                                                                                ) =>
                                                                                    opt.id ===
                                                                                    option.id
                                                                                        ? {
                                                                                              ...opt,
                                                                                              isCorrectAnswer:
                                                                                                  !opt.isCorrectAnswer,
                                                                                          }
                                                                                        : opt
                                                                            ),
                                                                    }
                                                                  : q
                                                      ),
                                              }
                                            : section
                                    )
                                );
                            }}
                        >
                            <Check />
                            {option.isCorrectAnswer
                                ? "Marked as correct"
                                : "Set as correct answer"}
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                                setSections((prevSections) =>
                                    prevSections.map((section) =>
                                        section.id === sectionId
                                            ? {
                                                  ...section,
                                                  questions:
                                                      section.questions.map(
                                                          (q) =>
                                                              q.id ===
                                                              questionId
                                                                  ? {
                                                                        ...q,
                                                                        options:
                                                                            q.options.filter(
                                                                                (
                                                                                    opt
                                                                                ) =>
                                                                                    opt.id !==
                                                                                    option.id
                                                                            ),
                                                                    }
                                                                  : q
                                                      ),
                                              }
                                            : section
                                    )
                                );
                            }}
                        >
                            <X />
                        </Button>
                    </div>
                </div>
            ))}
            <Button
                size="sm"
                variant="outline"
                onClick={() => {
                    const newOptionId = uuidv4();
                    const newOption = {
                        id: newOptionId,
                        label: `New option`,
                        value: `New option`,
                        isCorrectAnswer: false,
                    };
                    setSections((prevSections) =>
                        prevSections.map((section) =>
                            section.id === sectionId
                                ? {
                                      ...section,
                                      questions: section.questions.map((q) =>
                                          q.id === questionId
                                              ? {
                                                    ...q,
                                                    options: [
                                                        ...q.options,
                                                        newOption,
                                                    ],
                                                }
                                              : q
                                      ),
                                  }
                                : section
                        )
                    );
                }}
            >
                Add option
            </Button>
        </div>
    );
};

interface ParagraphProps {
    setSections: Dispatch<SetStateAction<Section[]>>;
    sectionId: string;
    questionId: string;
    paragraph: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
    setSections,
    sectionId,
    questionId,
    paragraph,
}) => {
    return (
        <Textarea
            value={paragraph}
            className="md:text-sm max-h-[10rem] border-none"
            placeholder="Type your answer here..."
            onChange={(e) => {
                setSections((prevSections) =>
                    prevSections.map((section) =>
                        section.id === sectionId
                            ? {
                                  ...section,
                                  questions: section.questions.map((q) =>
                                      q.id === questionId
                                          ? { ...q, paragraph: e.target.value }
                                          : q
                                  ),
                              }
                            : section
                    )
                );
            }}
        />
    );
};

interface MultipleChoiceProps {
    options: {
        id: string;
        label: string;
        value: string;
        isCorrectAnswer: boolean;
    }[];
    setSections: Dispatch<SetStateAction<Section[]>>;
    sectionId: string;
    questionId: string;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
    options,
    setSections,
    sectionId,
    questionId,
}) => {
    return (
        <div className="space-y-4">
            <RadioGroup>
                {options.map((option) => (
                    <div
                        key={option.id}
                        className="flex justify-between items-center gap-12"
                    >
                        <div className="flex items-center space-x-2 w-full">
                            <RadioGroupItem
                                value={option.value}
                                id={option.id}
                            />
                            <Input
                                placeholder={option.label}
                                value={option.label}
                                className="border-none"
                                onChange={(e) => {
                                    setSections((prevSections) =>
                                        prevSections.map((section) =>
                                            section.id === sectionId
                                                ? {
                                                      ...section,
                                                      questions:
                                                          section.questions.map(
                                                              (q) =>
                                                                  q.id ===
                                                                  questionId
                                                                      ? {
                                                                            ...q,
                                                                            options:
                                                                                q.options.map(
                                                                                    (
                                                                                        opt
                                                                                    ) =>
                                                                                        opt.id ===
                                                                                        option.id
                                                                                            ? {
                                                                                                  ...opt,
                                                                                                  label: e
                                                                                                      .target
                                                                                                      .value,
                                                                                                  value: e.target.value.toLowerCase(),
                                                                                              }
                                                                                            : opt
                                                                                ),
                                                                        }
                                                                      : q
                                                          ),
                                                  }
                                                : section
                                        )
                                    );
                                }}
                            />
                        </div>
                        <div className="flex space-x-2 flex-nowrap">
                            <Button
                                variant={
                                    option.isCorrectAnswer
                                        ? "green"
                                        : "secondary"
                                }
                                onClick={() => {
                                    setSections((prevSections) =>
                                        prevSections.map((section) =>
                                            section.id === sectionId
                                                ? {
                                                      ...section,
                                                      questions:
                                                          section.questions.map(
                                                              (q) =>
                                                                  q.id ===
                                                                  questionId
                                                                      ? {
                                                                            ...q,
                                                                            options:
                                                                                q.options.map(
                                                                                    (
                                                                                        opt
                                                                                    ) =>
                                                                                        opt.id ===
                                                                                        option.id
                                                                                            ? {
                                                                                                  ...opt,
                                                                                                  isCorrectAnswer:
                                                                                                      !opt.isCorrectAnswer,
                                                                                              }
                                                                                            : {
                                                                                                  ...opt,
                                                                                                  isCorrectAnswer:
                                                                                                      false,
                                                                                              }
                                                                                ),
                                                                        }
                                                                      : q
                                                          ),
                                                  }
                                                : section
                                        )
                                    );
                                }}
                            >
                                <Check />
                                {option.isCorrectAnswer
                                    ? "Marked as correct"
                                    : "Set as correct answer"}
                            </Button>
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => {
                                    setSections((prevSections) =>
                                        prevSections.map((section) =>
                                            section.id === sectionId
                                                ? {
                                                      ...section,
                                                      questions:
                                                          section.questions.map(
                                                              (q) =>
                                                                  q.id ===
                                                                  questionId
                                                                      ? {
                                                                            ...q,
                                                                            options:
                                                                                q.options.filter(
                                                                                    (
                                                                                        opt
                                                                                    ) =>
                                                                                        opt.id !==
                                                                                        option.id
                                                                                ),
                                                                        }
                                                                      : q
                                                          ),
                                                  }
                                                : section
                                        )
                                    );
                                }}
                            >
                                <X />
                            </Button>
                        </div>
                    </div>
                ))}
            </RadioGroup>
            <Button
                size="sm"
                variant="outline"
                onClick={() => {
                    const newOptionId = uuidv4();
                    const newOption = {
                        id: newOptionId,
                        label: `New option`,
                        value: `New option`,
                        isCorrectAnswer: false,
                    };
                    setSections((prevSections) =>
                        prevSections.map((section) =>
                            section.id === sectionId
                                ? {
                                      ...section,
                                      questions: section.questions.map((q) =>
                                          q.id === questionId
                                              ? {
                                                    ...q,
                                                    options: [
                                                        ...q.options,
                                                        newOption,
                                                    ],
                                                }
                                              : q
                                      ),
                                  }
                                : section
                        )
                    );
                }}
            >
                Add option
            </Button>
        </div>
    );
};
