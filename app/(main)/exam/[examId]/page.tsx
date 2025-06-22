import getExam from "@/actions/get-exam";
import PageTitleHeader from "@/components/reusables/page-title-header";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import QuestionsTab from "./questions-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                    <QuestionsTab examId={awaitedParams.examId} />
                </TabsContent>
                <TabsContent value="responses" className="mx-[5rem]">
                    Change your password here.
                </TabsContent>
                <TabsContent value="preview" className="mx-[5rem]">
                    Change your password here.
                </TabsContent>
                <TabsContent value="settings" className="mx-[5rem]">
                    Change your password here.
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ExamPage;
