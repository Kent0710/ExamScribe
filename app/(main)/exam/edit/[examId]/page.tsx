import getExam from "@/actions/get-exam";
import PageTitleHeader from "@/components/reusables/page-title-header";
import { Button } from "@/components/ui/button";
import { Loader2, Settings2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import QuestionsTabServer from "./tabs/questions/questions-tab-server";
import PreviewTab from "./tabs/preview/preview-tab";
import getSectionsQuestionsOptions from "@/actions/get-sections-questions-options";
import QuestionsTab from "./tabs/questions/questions-tab";
import SettingsTab from "./tabs/settings/settings-tab";

const ExamPage = async ({
    params,
}: {
    params: Promise<{ examId: string }>;
}) => {
    const awaitedParams = await params;
    const { exam, success, error } = await getExam(awaitedParams.examId);

    if (!success) {
        return <> Something went wrong when getting the exam: {error} </>;
    }

    const { initialSections } = await getSectionsQuestionsOptions(
        awaitedParams.examId
    );
    const sectionCount = initialSections[initialSections.length - 1]?.order
        ? initialSections[initialSections.length - 1].order + 1
        : 1;

    return (
        <div className="space-y-4">
            {/* <pre className="w-[25rem] whitespace-pre-wrap">
                {" "}
                {JSON.stringify(exam)}{" "}
            </pre> */}
            <PageTitleHeader title={exam.title}>
                <div className="space-x-2">
                    <Button>
                        {" "}
                        <Settings2 /> Settings
                    </Button>
                </div>
            </PageTitleHeader>

            <Tabs defaultValue="questions">
                <TabsList className="w-full mb-[2rem]">
                    <TabsTrigger value="questions">Questions</TabsTrigger>
                    <TabsTrigger value="responses">Responses</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="questions" className="mx-[5rem]">
                    <QuestionsTab
                        examId={awaitedParams.examId}
                        initialSections={initialSections || []}
                        sectionCount={sectionCount}
                    />
                </TabsContent>
                <TabsContent value="responses" className="mx-[5rem]">
                    Change your password here.
                </TabsContent>
                <TabsContent value="preview" className="mx-[5rem]">
                    <PreviewTab
                        examId={awaitedParams.examId}
                        initialSections={initialSections || []}
                    />
                </TabsContent>
                <TabsContent value="settings" className="mx-[5rem]">
                    <SettingsTab 
                        examId={awaitedParams.examId}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ExamPage;

interface SuspenseFallbackTabLoaderProps {
    text: string;
}
const SuspenseFallbackTabLoader: React.FC<SuspenseFallbackTabLoaderProps> = ({
    text,
}) => {
    return (
        <div className="flex items-center justify-center w-full h-[20rem]">
            <div className="flex items-center gap-2 font-semibold text-neutral-500">
                {" "}
                <Loader2 className="animate-spin" /> {text}{" "}
            </div>
        </div>
    );
};
