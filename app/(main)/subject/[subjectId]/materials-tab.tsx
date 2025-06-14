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
import { createClient } from "@/lib/db/supabase/client";
import { revalidatePath } from "next/cache";
import deleteFile from "@/actions/delete-file";
import { toast } from "sonner";

interface MaterialsTabProps {
    subjectId: string;
    materials: any[];
}
export const MaterialsTab: React.FC<MaterialsTabProps> = ({
    subjectId,
    materials: materialsData,
}) => {
    const [materials, setMaterials] = useState(materialsData);

    const [uploadError, setUploadError] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileUpload = useCallback((file: File) => {
        if (file) {
            setSelectedFile(file);
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
    };

    const handleConfirmUpload = async () => {
        if (!selectedFile) return;
        const supabase = createClient();

        try {
            const fileName = `${selectedFile.name}`;
            const filePath = `${fileName}`;

            // Upload file to storage
            const { error: uploadError } = await supabase.storage
                .from("materials")
                .upload(filePath, selectedFile, {
                    cacheControl: "3600",
                    upsert: false,
                    contentType: selectedFile.type,
                });

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL for the uploaded file
            const { data: publicUrlData } = supabase.storage
                .from("materials")
                .getPublicUrl(filePath);

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

            // Insert into Material table
            const { data, error: insertError } = await supabase
                .from("Material")
                .insert({
                    filename: selectedFile.name,
                    type: fileType,
                    link: publicUrlData.publicUrl,
                    subjectId: subjectId,
                })
                .select()
                .single();

            if (insertError) {
                await supabase.storage.from("materials").remove([filePath]);
                throw insertError;
            }

            setMaterials((prev) => [
                ...prev,
                {
                    id: data.id,
                    filename: data.filename,
                    type: data.type,
                    link: data.link,
                    uploadDate: data.created_at
                        ? new Date(data.created_at).toLocaleDateString()
                        : new Date().toLocaleDateString(),
                },
            ]);

            setSelectedFile(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setUploadError(error.message);
            } else {
                setUploadError("Failed to upload file");
            }
        }
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
                    <CardTitle>Learning Materials</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>File Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Upload Date</TableHead>
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
                                            <FileText className="w-4 h-4" />
                                            <span className="font-medium truncate max-w-md">
                                                {material.filename}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{material.type}</TableCell>
                                    <TableCell>{material.uploadDate}</TableCell>
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
                                                onClick={async () => {
                                                    toast.loading(
                                                        "Deleting file..."
                                                    );

                                                    const res =
                                                        await deleteFile(
                                                            material.id
                                                        );

                                                    toast.dismiss();
                                                    if (!res.success) {
                                                        toast.error(res.error);
                                                        return;
                                                    }

                                                    toast.success(
                                                        "Successfully deleted file"
                                                    );
                                                    setMaterials((prev) =>
                                                        prev.filter(
                                                            (m) =>
                                                                m.id !==
                                                                material.id
                                                        )
                                                    );
                                                }}
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
