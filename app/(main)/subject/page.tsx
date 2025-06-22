import { Subjects } from "@/components/reusables/subject-card";
import PageTitleHeader from "@/components/reusables/page-title-header";
import CreateNewSubject from "@/components/reusables/create-new-subject-dialog";
import JoinSubject from "@/components/reusables/join-subject";

const SubjectsPage = async () => {
    return (
        <div className="space-y-4 ">
            <PageTitleHeader
                title="Subjects"
                description="Manage your subjects in one dedicated place."
            >
                <div className="space-x-2">
                    <CreateNewSubject />
                    <JoinSubject />
                </div>
            </PageTitleHeader>
            <Subjects />
        </div>
    );
};

export default SubjectsPage;
