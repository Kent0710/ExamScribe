// FOR TAKING AN ACTUAL EXAMINATION

import getSectionsQuestionsOptions from "@/actions/get-sections-questions-options";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TakeQuestionsClient from "./take-questions-client";
import PageTitleHeader from "@/components/reusables/page-title-header";
import getExamResult from "@/actions/get-exam-result";

const TakePage = async ({
    params,
    searchParams,
}: {
    params: Promise<{ examId: string }>;
    searchParams: Promise<{ examTitle: string }>;
}) => {
    const awaitedSearchParams = await searchParams;
    const awaitedParams = await params;

    const { success, error, examResult } = await getExamResult(
        awaitedParams.examId
    );
    if (success && examResult && error === null) {
        return (
            <div className="h-[90dvh] w-full flex items-center justify-center space-y-4 flex-col">
                <div>
                    <small> You scored </small>
                    <p className="text-5xl font-bold text-center">
                        {" "}
                        {examResult.score}{" "}
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-2xl">
                        {" "}
                        {awaitedSearchParams.examTitle}{" "}
                    </p>
                    <p className="text-neutral-500">
                        {" "}
                        You already took this exam.{" "}
                    </p>
                </div>
                <Button> View detailed result </Button>
            </div>
        );
    }

    const { initialSections } = await getSectionsQuestionsOptions(
        awaitedParams.examId
    );

    if (initialSections.length === 0) {
        return (
            <div className="flex h-[90dvh] items-center justify-center flex-col space-y-4">
                <p> Looks like there is no questions yet for this exam. </p>
                <Link href={"/dashboard"}>
                    <Button>Go back to dashboard</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <PageTitleHeader
                title={awaitedSearchParams.examTitle}
            ></PageTitleHeader>

            {/* RESPONSIBLE FOR HANDLING STATE OF SECTIONS WITH ANSWERS 
            ALSO USE FOR RENDERING THE ACTUAL COMPONENTS FOR ANSWERING  */}
            <TakeQuestionsClient
                initialSections={initialSections}
                examId={awaitedParams.examId}
            />
        </div>
    );
};

export default TakePage;
