

import React from 'react';
import { Plus, Eye, Edit, Trash2, Play, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ExamsTabProps {
  sectionId: string;
}

export const ExamsTab: React.FC<ExamsTabProps> = ({ sectionId }) => {
  // Mock exams data
  const exams = [
    {
      id: '1',
      title: 'Midterm Exam - Algebra',
      type: 'Actual',
      questions: 25,
      duration: 90,
      status: 'Published',
      attempts: 28,
      avgScore: 78,
      createdDate: '2024-01-20',
      dueDate: '2024-01-25'
    },
    {
      id: '2',
      title: 'Practice Quiz - Linear Equations',
      type: 'Mock',
      questions: 15,
      duration: 45,
      status: 'Active',
      attempts: 25,
      avgScore: 82,
      createdDate: '2024-01-18',
      dueDate: '2024-01-22'
    },
    {
      id: '3',
      title: 'Final Assessment - Quadratics',
      type: 'Actual',
      questions: 30,
      duration: 120,
      status: 'Draft',
      attempts: 0,
      avgScore: 0,
      createdDate: '2024-01-22',
      dueDate: '2024-01-30'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: "default" | "secondary" } = {
      'Published': 'default',
      'Active': 'default',
      'Draft': 'secondary',
      'Closed': 'secondary'
    };
    const variant = statusMap[status] || 'secondary';
    return (
      <Badge variant={variant}>
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    return (
      <Badge variant={type === 'Actual' ? 'destructive' : 'outline'}>
        {type}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Exams ({exams.length})</CardTitle>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Manual Exam
          </Button>
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
                <TableCell className="font-medium">{exam.title}</TableCell>
                <TableCell>{getTypeBadge(exam.type)}</TableCell>
                <TableCell>{exam.questions}</TableCell>
                <TableCell>{exam.duration} min</TableCell>
                <TableCell>{getStatusBadge(exam.status)}</TableCell>
                <TableCell>{exam.attempts}</TableCell>
                <TableCell>
                  <span className={`font-medium ${
                    exam.avgScore >= 80 ? 'text-green-600' :
                    exam.avgScore >= 70 ? 'text-blue-600' :
                    exam.avgScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {exam.avgScore > 0 ? `${exam.avgScore}%` : '-'}
                  </span>
                </TableCell>
                <TableCell>{exam.dueDate}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" title="Preview">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Edit">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Start Exam">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Analytics">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};