// COMPONENT FOR MANAGING STATE
"use client";

import React, { useState } from "react";
import QuestionCardAnswer from "./question-card-answer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import submitExam from "@/actions/submit-exam";

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

interface TakeQuestionsClientProps {
    initialSections: Section[];
    examId : string;
}

const TakeQuestionsClient: React.FC<TakeQuestionsClientProps> = ({
    initialSections,
    examId
}) => {
    const [sections, setSections] = useState<Section[]>(initialSections);
    const [submissionData, setSubmissionData] = useState({
        isExamSubmittedSuccessfully : false,
        correctAnswers : 0,
    })

    const submitExamHandler = async () => {
        let isExamIncomplete = false;
        sections.map((section)=>{
            section.questions.map((question)=>{
                if (!question.answer) {
                    toast('You do not have an answer on question: ' + question.title);
                    const noAnswerQuestions = document.querySelector(`[id="${question.id}"]`) as HTMLElement
                    if (noAnswerQuestions) {
                        noAnswerQuestions.style.cssText = 'border-color: red; color: red;'
                    }
                    isExamIncomplete = true;
                } 
                // TODO: VALIDATE HERE IF THE ANSWERS PROPERTY HAS STRING VALUE AND SAFE
            })
        });

        if (isExamIncomplete) return;

        toast.loading("Submitting...")
        const res = await submitExam(examId, sections);
        toast.dismiss();
        if (!res.success) {
            toast.error(res.error)
        } else {
            toast.success('Correct answers: ' + res.correctAnswers)
            setSubmissionData({
                isExamSubmittedSuccessfully : true,
                correctAnswers : res.correctAnswers
            })
        }
    };

    if (submissionData.isExamSubmittedSuccessfully) {
        return (
            <div>
                <p> Correct answers: {submissionData.correctAnswers} </p>
            </div>
        )
    }

    return (
        <div className="px-[10rem]">
            {sections.map((section) => (
                <div key={section.id}>
                    <p className="text-xl font-semibold"> {section.title} </p>
                    <section key={section.id} className="grid gap-4 my-6 ">
                        {section.questions.map((question) => (
                            <QuestionCardAnswer
                                key={question.id}
                                question={question}
                                setSections={setSections}
                                sectionId={section.id}
                            />
                        ))}
                    </section>
                </div>
            ))}
            <div>
                <Button
                    onClick={submitExamHandler}
                >
                    Submit exam
                </Button>
            </div>
            <pre className="w-[30rem] whitespace-pre-wrap break-words bg-gray-100 p-4 rounded text-sm">
                {JSON.stringify(sections, null, 2)}
            </pre>
        </div>
    );
};

export default TakeQuestionsClient;
