import PageTitleHeader from "@/components/reusables/page-title-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain } from "lucide-react";
import Link from "next/link";
import DashboardSummaryCard from "../../dashboard/dashboard-summary-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentsTab from "./students-tab";
import { MaterialsTab } from "./materials-tab";
import { ExamsTab } from "./exams-tab";
import { MetricsTab } from "./metrics-tab";
import getSubject from "@/actions/get-subject";
import { Suspense } from "react";

const SubjectPage = async ({
    params,
}: {
    params: Promise<{ subjectId: string }>;
}) => {
    const awaitedParams = await params;
    const subject = (await getSubject(awaitedParams.subjectId)).subject;

    return (
        <div className="space-y-4">
            <Link href={"/dashboard"}>
                <Button variant={"secondary"} className="mb-4">
                    <ArrowLeft />
                    Back to Dashboard
                </Button>
            </Link>

            <PageTitleHeader
                title={subject.subjectName}
                description="Manage subject class"
            >
                <Button>
                    <Brain />
                    Generate Exam
                </Button>
            </PageTitleHeader>

            <section className="grid grid-cols-4 gap-4">
                <DashboardSummaryCard
                    title="Code"
                    mainText={subject.code}
                    description="Use to invite other students"
                />
                <DashboardSummaryCard
                    title="Students"
                    mainText={subject.studentCount}
                    description="Students currently enrolled"
                />
                <DashboardSummaryCard
                    title="Exams"
                    mainText={subject.examCount}
                    description="Total exams created "
                />
                <DashboardSummaryCard
                    title="Materials"
                    mainText={subject.materialCount}
                    description="Learning materials uploaded"
                />
            </section>
            <Tabs defaultValue="students">
                <TabsList className="w-full border">
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="exams">Exams</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                </TabsList>
                <TabsContent value="students">
                    <Suspense fallback={<>Loading</>}>
                        <StudentsTab subjectId={awaitedParams.subjectId} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="materials">
                    <MaterialsTab />
                </TabsContent>
                <TabsContent value="exams">
                    <ExamsTab />
                </TabsContent>
                <TabsContent value="metrics">
                    <MetricsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SubjectPage;
