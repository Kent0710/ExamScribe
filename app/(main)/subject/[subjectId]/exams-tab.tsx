import React from "react";
import { Plus, Eye, Edit, Trash2, Play, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import CreateManualExamForm from "@/components/reusables/create-manual-exam-form";
import getExams from "@/actions/get-exams";
import ExamTableActions from "./exam-table-actions";

interface ExamsTabProps {
    subjectId: string;
}

export const ExamsTab: React.FC<ExamsTabProps> = async ({ subjectId }) => {
    const { exams, success, error } = await getExams(subjectId);

    if (!success) {
        return <> Something went wrong when getting exams. {error} </>;
    }

    const getTypeBadge = (type: string) => {
        return (
            <Badge variant={type === "Actual" ? "destructive" : "outline"}>
                {type}
            </Badge>
        );
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Exams ({exams.length})</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Manual Exam
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Manual Exam</DialogTitle>
                                <DialogDescription>
                                    This will allow you to craft exams and AI
                                    will add metadata for student analysis
                                    later.
                                </DialogDescription>
                            </DialogHeader>

                            <CreateManualExamForm subjectId={subjectId} />
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Exam Title</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Questions</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Attempts</TableHead>
                            <TableHead>Avg Score</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead className="w-[140px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {exams.map((exam) => (
                            <TableRow key={exam.id}>
                                <TableCell className="font-medium">
                                    {exam.title}
                                </TableCell>
                                <TableCell>{getTypeBadge(exam.type)}</TableCell>
                                <TableCell>{exam.questions}</TableCell>
                                <TableCell>{exam.duration} min</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            exam.status === "Open"
                                                ? "success"
                                                : "destructive"
                                        }
                                    >
                                        {exam.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{exam.attempts}</TableCell>
                                <TableCell>
                                    <span
                                        className={`font-medium ${
                                            exam.avgScore >= 80
                                                ? "text-green-600"
                                                : exam.avgScore >= 70
                                                ? "text-blue-600"
                                                : exam.avgScore >= 60
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {exam.avgScore}%
                                    </span>
                                </TableCell>
                                <TableCell>{exam.dueDate}</TableCell>
                                <TableCell>
                                    <ExamTableActions
                                    examTitle={exam.title}
                                        examId={exam.id}
                                        examStatus={exam.status}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
