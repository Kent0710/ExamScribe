import getStudents from "@/actions/get-students";
import DataTable from "@/components/reusables/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { studentColumns, StudentTableType } from "@/types/table-types";

interface StudentsTabProps {
    subjectId : string;
}
const StudentsTab : React.FC<StudentsTabProps> = async ({
    subjectId
}) => {
    const students = (await getStudents(subjectId)).students;
    const formattedStudents : StudentTableType[] = [];

    students.map((student) => {
        const obj = {
            username : student.accountId.username,
            strength : student.accountId.strength,
            weakness : student.accountId.weakness,
            averageScore : student.accountId.averageScore,
            subjectId : subjectId,
        };

        formattedStudents.push(obj);
    })

    return (
        <Card className="py-2 pb-6">
            <CardContent>
                <DataTable columns={studentColumns} data={formattedStudents} />
            </CardContent>
        </Card>
    )
};

export default StudentsTab;
