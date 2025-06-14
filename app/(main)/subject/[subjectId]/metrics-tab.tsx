'use client'

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    LineChart,
    Line,
} from "recharts";

interface MetricsTabProps {

}

export const MetricsTab: React.FC<MetricsTabProps> = () => {
    // Mock data for charts
    const topicPerformanceData = [
        { topic: "Linear Equations", score: 85, total: 100 },
        { topic: "Quadratics", score: 72, total: 100 },
        { topic: "Polynomials", score: 68, total: 100 },
        { topic: "Factoring", score: 79, total: 100 },
        { topic: "Graphing", score: 82, total: 100 },
    ];

    const bloomsLevelData = [
        { level: "Remember", score: 88 },
        { level: "Understand", score: 82 },
        { level: "Apply", score: 75 },
        { level: "Analyze", score: 68 },
        { level: "Evaluate", score: 65 },
        { level: "Create", score: 58 },
    ];

    const mockVsActualData = [
        { student: "John", mock: 75, actual: 78 },
        { student: "Emma", mock: 85, actual: 88 },
        { student: "Mike", mock: 68, actual: 72 },
        { student: "Sarah", mock: 82, actual: 85 },
        { student: "James", mock: 71, actual: 69 },
    ];

    const studentProgress = [
        {
            name: "Emma Johnson",
            avgScore: 92,
            improvement: 8,
            weakTopic: "Quadratics",
        },
        {
            name: "Sarah Davis",
            avgScore: 88,
            improvement: 5,
            weakTopic: "Polynomials",
        },
        {
            name: "John Smith",
            avgScore: 85,
            improvement: 3,
            weakTopic: "Graphing",
        },
        {
            name: "James Wilson",
            avgScore: 82,
            improvement: -2,
            weakTopic: "Factoring",
        },
        {
            name: "Michael Brown",
            avgScore: 78,
            improvement: 4,
            weakTopic: "Linear Equations",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Class Average
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            82%
                        </div>
                        <p className="text-xs text-green-600">
                            ↗ +3% from last exam
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pass Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            89%
                        </div>
                        <p className="text-xs text-gray-500">
                            25 out of 28 students
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Top Performer
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">Emma Johnson</div>
                        <p className="text-xs text-green-600">92% average</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Weakest Topic
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">Polynomials</div>
                        <p className="text-xs text-red-600">68% average</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Topic Performance Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Topic Performance Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topicPerformanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="topic"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="score" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Bloom's Taxonomy Radar */}
                <Card>
                    <CardHeader>
                        <CardTitle>Bloom's Taxonomy Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={bloomsLevelData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="level" />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                                <Radar
                                    name="Score"
                                    dataKey="score"
                                    stroke="#3b82f6"
                                    fill="#3b82f6"
                                    fillOpacity={0.3}
                                />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Mock vs Actual Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mock vs Actual Exam Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={mockVsActualData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="student" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="mock"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    name="Mock Exam"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="actual"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    name="Actual Exam"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Individual Student Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Individual Student Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {studentProgress.map((student, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex-1">
                                        <div className="font-medium">
                                            {student.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Weak area: {student.weakTopic}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">
                                            {student.avgScore}%
                                        </div>
                                        <div
                                            className={`text-sm ${
                                                student.improvement >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {student.improvement >= 0
                                                ? "↗"
                                                : "↘"}{" "}
                                            {Math.abs(student.improvement)}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Weak Topics Analysis */}
            <Card>
                <CardHeader>
                    <CardTitle>Class-wide Weak Topics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topicPerformanceData
                            .sort((a, b) => a.score - b.score)
                            .slice(0, 3)
                            .map((topic, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium">
                                            {topic.topic}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {topic.score}%
                                        </span>
                                    </div>
                                    <Progress
                                        value={topic.score}
                                        className="h-2"
                                    />
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
