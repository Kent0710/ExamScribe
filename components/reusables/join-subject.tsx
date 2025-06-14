"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { joinSubjectSchema } from "@/types/form-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import joinSubject from "@/actions/join-subject";
import { toast } from "sonner";
import { useState } from "react";

const JoinSubject = () => {
    const [error, setError] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof joinSubjectSchema>>({
        resolver: zodResolver(joinSubjectSchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof joinSubjectSchema>) => {
        const res = await joinSubject(values.code);
        if (!res.success) setError(res.error);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"secondary"}
                    className="bg-slate-200 hover:bg-slate-200/70"
                >
                    Join subject
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join an existing subject</DialogTitle>
                    <DialogDescription>
                        Ask subject admin/member for the subject code to join
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter subject code..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Joining subject...
                                </>
                            ) : (
                                <>Join subject</>
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
            {error && <DialogFooter>{error}</DialogFooter>}
        </Dialog>
    );
};

export default JoinSubject;
