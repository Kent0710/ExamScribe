"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createManualExamFormSchema } from "@/types/form-schema";
import { Loader2 } from "lucide-react";
import createExam from "@/actions/create-exam";
import { toast } from "sonner";

interface CreateManualExamFormProps {
    subjectId : string;
}
const CreateManualExamForm : React.FC<CreateManualExamFormProps> = ({
    subjectId
}) => {
    const form = useForm<z.infer<typeof createManualExamFormSchema>>({
        resolver: zodResolver(createManualExamFormSchema),
        defaultValues: {
            type: "",
            dueDate: "",
            examDuration: "",
            examTitle: "",
            examDescription: "",
            dueTime: "",
        },
    });

    const onSubmit = async (
        values: z.infer<typeof createManualExamFormSchema>
    ) => {
        const res = await createExam(subjectId, values);
        if (!res.success) {
            toast.error(res.error)
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Exam Details Section */}

                <FormField
                    control={form.control}
                    name="examTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Exam Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., Algebra I Final Exam"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Schedule and Duration Section */}

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Due Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dueTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Due Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Exam Type</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select exam type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Mock">
                                                Mock
                                            </SelectItem>
                                            <SelectItem value="Actual">
                                                Actual
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="examDuration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duration (minutes)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="string"
                                        placeholder="e.g., 60"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                {/* Description Section */}

                <FormField
                    control={form.control}
                    name="examDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="General description..."
                                    className="h-24 resize-none"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Creating exam...
                        </>
                    ) : (
                        <> Create exam </>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default CreateManualExamForm;
