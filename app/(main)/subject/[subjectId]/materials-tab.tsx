"use client";

import React, { useState, useCallback } from "react";
import { Upload, FileText, Download, Trash2, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/db/supabase/client";

interface Material {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    downloads: number;
    status: string;
    path: string;
}

export const MaterialsTab = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [materials, setMaterials] = useState<Material[]>([
        {
            id: "1",
            name: "Chapter 1 - Algebra Basics.pdf",
            type: "PDF",
            size: "2.4 MB",
            uploadDate: "2024-01-15",
            downloads: 28,
            status: "Active",
            path: "public/Chapter 1 - Algebra Basics.pdf",
        },
        {
            id: "2",
            name: "Practice Problems Set 1.docx",
            type: "Word Document",
            size: "856 KB",
            uploadDate: "2024-01-12",
            downloads: 25,
            status: "Active",
            path: "public/Practice Problems Set 1.docx",
        },
        {
            id: "3",
            name: "Video - Quadratic Equations.mp4",
            type: "Video",
            size: "45.2 MB",
            uploadDate: "2024-01-10",
            downloads: 30,
            status: "Active",
            path: "public/Video - Quadratic Equations.mp4",
        },
        {
            id: "4",
            name: "Quiz 1 - Linear Equations.pdf",
            type: "PDF",
            size: "1.2 MB",
            uploadDate: "2024-01-08",
            downloads: 28,
            status: "Archived",
            path: "public/Quiz 1 - Linear Equations.pdf",
        },
    ]);

    const handleFileUpload = useCallback((file: File) => {
        if (file) {
            setSelectedFile(file);
            setIsUploading(false);
            setUploadProgress(0);
            setUploadError(null);
        }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file = e.dataTransfer.files?.[0];
            if (
                file &&
                [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "video/mp4",
                    "video/quicktime",
                    "image/jpeg",
                    "image/png",
                ].includes(file.type)
            ) {
                handleFileUpload(file);
            }
        },
        [handleFileUpload]
    );

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setUploadProgress(0);
        setIsUploading(false);
        setUploadError(null);
    };

    const handleConfirmUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadError(null);
        const supabase = createClient();

        try {
            const fileName = `${selectedFile.name}`;
            const filePath = `${fileName}`;

            const { error } = await supabase.storage
                .from("materials")
                .upload(filePath, selectedFile, {
                    cacheControl: "3600",
                    upsert: false,
                    contentType: selectedFile.type,
                    onUploadProgress: (progressEvent) => {
                        if (
                            progressEvent.totalBytes &&
                            progressEvent.bytesSent
                        ) {
                            const progress = Math.round(
                                (progressEvent.bytesSent /
                                    progressEvent.totalBytes) *
                                    100
                            );
                            setUploadProgress(progress);
                        }
                    },
                });

            if (error) {
                throw error;
            }

            // Calculate file size in a human-readable format
            const fileSize =
                (selectedFile.size / 1024 / 1024).toFixed(1) + " MB";

            // Determine file type
            const fileTypeMap: { [key: string]: string } = {
                "application/pdf": "PDF",
                "application/msword": "Word Document",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    "Word Document",
                "video/mp4": "Video",
                "video/quicktime": "Video",
                "image/jpeg": "Image",
                "image/png": "Image",
            };
            const fileType = fileTypeMap[selectedFile.type] || "Unknown";

            // Add to materials list
            setMaterials((prev) => [
                ...prev,
                {
                    id: '421u421u4821',
                    name: selectedFile.name,
                    type: fileType,
                    size: fileSize,
                    uploadDate: new Date().toISOString().split("T")[0],
                    downloads: 0,
                    status: "Active",
                    path: filePath,
                },
            ]);

            // Reset states
            setSelectedFile(null);
            setUploadProgress(0);
            setIsUploading(false);
        } catch (error: any) {
            setUploadError(error.message || "Failed to upload file");
            setIsUploading(false);
        }
    };

    const getFileIcon = (type: string) => {
        return <FileText className="w-4 h-4" />;
    };

    const getStatusBadge = (status: string) => {
        return (
            <Badge variant={status === "Active" ? "default" : "secondary"}>
                {status}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            {/* Upload Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Upload Learning Materials</CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${
                  dragActive
                      ? "border-gray-400 bg-gray-50"
                      : "border-gray-300 hover:border-gray-400"
              }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Drop file here or click to upload
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Supports PDF, Word documents, videos, and images
                            (one file at a time)
                        </p>
                        <input
                            type="file"
                            multiple={false}
                            accept=".pdf,.doc,.docx,.mp4,.mov,.jpg,.jpeg,.png"
                            onChange={handleInputChange}
                            id="file-upload"
                            className="hidden"
                        />
                        <label htmlFor="file-upload">
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                            >
                                Choose File
                            </Button>
                        </label>
                    </div>

                    {selectedFile && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <FileText className="w-5 h-5 text-gray-500" />
                                <span className="text-sm font-medium text-gray-900 truncate max-w-md">
                                    {selectedFile.name}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleConfirmUpload}
                                    disabled={isUploading}
                                >
                                    Confirm Upload
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRemoveFile}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {isUploading && (
                        <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>
                                    Uploading {selectedFile?.name || "file"}...
                                </span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <Progress value={uploadProgress} className="h-2" />
                        </div>
                    )}

                    {uploadError && (
                        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                            {uploadError}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Materials List */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Learning Materials ({materials.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>File Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Upload Date</TableHead>
                                <TableHead>Downloads</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[120px]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materials.map((material) => (
                                <TableRow key={material.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            {getFileIcon(material.type)}
                                            <span className="font-medium truncate max-w-md">
                                                {material.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{material.type}</TableCell>
                                    <TableCell>{material.size}</TableCell>
                                    <TableCell>{material.uploadDate}</TableCell>
                                    <TableCell>{material.downloads}</TableCell>
                                    <TableCell>
                                        {getStatusBadge(material.status)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-1">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700"
                                            >
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
        </div>
    );
};
