"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useState } from "react";

interface Question {
    id: string;
    type: string; // PARAGRAPH, CHECKBOXES, MULTIPLECHOICE
    title: string;
    options: {
        id: string;
        label: string;
        value: string;
        isCorrectAnswer: boolean;
    }[];
}

interface Section {
    id: string;
    title: string;
    questions: Question[];
    answer?: string;
}

interface QuestionCardAnswerProps {
    question: Question;
    setSections: Dispatch<SetStateAction<Section[]>>;
    sectionId: string;
}
const QuestionCardAnswer: React.FC<QuestionCardAnswerProps> = ({
    question,
    setSections,
    sectionId,
}) => {
    return (
        <Card className="px-[1.5rem]" id={question.id}>
            <CardTitle> {question.title} </CardTitle>
            <CardContent>
                {question.type === "paragraph" && (
                    <Paragraph
                        questionId={question.id}
                        setSections={setSections}
                        sectionId={sectionId}
                    />
                )}
                {question.type === "multiplechoice" && (
                    <MultipleChoice
                        options={question.options}
                        setSections={setSections}
                        sectionId={sectionId}
                    />
                )}
                {question.type === "checkboxes" && (
                    <Checkboxes
                        options={question.options}
                        setSections={setSections}
                        sectionId={sectionId}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default QuestionCardAnswer;

interface ParagraphProps {
    questionId: string;
    setSections: Dispatch<SetStateAction<Section[]>>;
    sectionId: string;
}
const Paragraph: React.FC<ParagraphProps> = ({
    questionId,
    setSections,
    sectionId,
}) => {
    return (
        <Textarea
            placeholder="Type your answer here..."
            className="md:text-sm max-h-[10rem] border-none"
            onChange={(e) => {
                setSections((prevSections) =>
                    prevSections.map((section) =>
                        section.id === sectionId
                            ? {
                                  ...section,
                                  questions: section.questions.map((q) =>
                                      q.id === questionId
                                          ? { ...q, answer: e.target.value }
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
}
const MultipleChoice: React.FC<MultipleChoiceProps> = ({
    options,
    setSections,
    sectionId,
}) => {
    const [selectedOptionId, setSelectedOptionId] = useState("");

    return (
        <div className="space-y-4">
            <RadioGroup
                value={selectedOptionId}
                onValueChange={(value) => {
                    setSelectedOptionId(value);
                    setSections((prevSections) =>
                        prevSections.map((section) =>
                            section.id === sectionId
                                ? {
                                      ...section,
                                      questions: section.questions.map((q) =>
                                          // Use the question id from the question, not from the option
                                          q.id === options[0]?.questionId
                                              ? { ...q, answer: value }
                                              : q
                                      ),
                                  }
                                : section
                        )
                    );
                }}
            >
                {options.map((option) => (
                    <div
                        key={option.id}
                        className="flex items-center space-x-2 w-full"
                    >
                        <RadioGroupItem value={option.id} id={option.id} />
                        <p> {option.label} </p>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

interface CheckboxesProps {
    options: {
        id: string;
        label: string;
        value: string;
        isCorrectAnswer: boolean;
    }[];
    setSections: Dispatch<SetStateAction<Section[]>>;
    sectionId: string;
}
const Checkboxes: React.FC<CheckboxesProps> = ({
    options,
    setSections,
    sectionId,
}) => {
    return (
        <div className="space-y-4">
            {options.map((option) => (
                <div
                    key={option.id}
                    className="flex items-center space-x-2 w-full"
                >
                    <Checkbox
                        onCheckedChange={(checked) => {
                            setSections((prevSections) =>
                                prevSections.map((section) =>
                                    section.id === sectionId
                                        ? {
                                              ...section,
                                              questions: section.questions.map(
                                                  (q) =>
                                                      q.id ===
                                                      options[0]?.questionId
                                                          ? {
                                                                ...q,
                                                                answer: q.answer === undefined ? [option.id] : [...q.answer, option.id],
                                                            }
                                                          : q
                                              ),
                                          }
                                        : section
                                )
                            );
                        }}
                    />
                    <p> {option.label} </p>
                </div>
            ))}
        </div>
    );
};
