"use client";

import { useState } from "react";

import QuestionCardEdit from "../questions/question-card-edit";

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

interface PreviewTabProps {
    examId: string;
    initialSections: Section[];
}
const PreviewTab: React.FC<PreviewTabProps> = ({ examId, initialSections }) => {
    const [sections, setSections] = useState<Section[]>(initialSections);

    return (
        <div>
            {sections.map((section) => (
                <div
                    id={`section-${section.id}`}
                    key={section.id}
                    className="mb-8"
                >
                    <section className="grid gap-4 my-6">
                        {section.questions.map((question) => (
                            <QuestionCardEdit
                                key={question.id}
                                question={question}
                                sectionId={section.id}
                                sections={sections}
                                setSections={setSections}
                            />
                        ))}
                    </section>
                </div>
            ))}
        </div>
    );
};

export default PreviewTab;
