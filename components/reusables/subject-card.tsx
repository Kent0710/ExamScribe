import { BarChart3, Users } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import getSubjects from "@/actions/get-subjects";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface SubjectCardProps {
    subjectId : string;
    subjectName: string;
    numberOfStudents: number;
    numberOfExamCreated: number;
    departmentName: string;
}
const SubjectCard: React.FC<SubjectCardProps> = ({
    subjectId,
    subjectName,
    numberOfStudents,
    numberOfExamCreated,
    departmentName,
}) => {
    return (
        <Card>
            <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium mb-2">
                        {subjectName}
                    </CardTitle>
                    <Badge> {departmentName} </Badge>
                </div>
                <section className="flex justify-between items-center text-sm text-muted-foreground ">
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {numberOfStudents} students
                    </div>
                    <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        {numberOfExamCreated} exams
                    </div>
                </section>
                <Link href={`/subject/${subjectId}`}>
                    <Button variant={"outline"} className="w-full">
                        {" "}
                        Open subject{" "}
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default SubjectCard;

export const Subjects = async () => {
    const { subjects } = await getSubjects();

    return (
        <section className="grid grid-cols-3 gap-4">
            {subjects.map((subject) => (
                <SubjectCard
                    subjectId={subject.subjectId.id}
                    key={subject.subjectId.subjectName}
                    subjectName={subject.subjectId.subjectName}
                    departmentName={subject.subjectId.departmentName}
                    numberOfExamCreated={10}
                    numberOfStudents={22}
                />
            ))}
        </section>
    );
};
