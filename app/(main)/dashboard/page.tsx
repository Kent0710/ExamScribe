import PageTitleHeader from "@/components/reusables/page-title-header";
import DashboardSummaryCard from "./dashboard-summary-card";
import CreateNewSubject from "@/components/reusables/create-new-subject-dialog";
import { Subjects } from "@/components/reusables/subject-card";

import { BookOpen } from "lucide-react";
import JoinSubject from "@/components/reusables/join-subject";

const DashboardPage = () => {
    return (
        <div className="space-y-4 ">
            <PageTitleHeader
                title="Dashboard"
                description="Manage your sections and track student progress."
            ></PageTitleHeader>

            {/* Summary Section  */}
            <section className="grid grid-cols-3 gap-4">
                <DashboardSummaryCard
                    title="Total Sections"
                    mainText="3"
                    description="Active teaching sections"
                />
                <DashboardSummaryCard
                    title="Total Sections"
                    mainText="3"
                    description="Active teaching sections"
                />
                <DashboardSummaryCard
                    title="Total Sections"
                    mainText="3"
                    description="Active teaching sections"
                />
            </section>

            <section className="flex justify-between items-center pt-2 border-t">
                <div className="flex items-center text-purple-500 space-x-2 ">
                    <BookOpen className="h-4 w-4" />
                    <h2 className="font-bold "> Your Subjects </h2>
                </div>
                <div className="space-x-2">
                    <CreateNewSubject />
                    <JoinSubject />
                </div>
            </section>
            <Subjects />
        </div>
    );
};

export default DashboardPage;
