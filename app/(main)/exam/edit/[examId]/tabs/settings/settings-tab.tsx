"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { useIsCreatedSectionsHasParagraph } from "@/stores/edit-exam-settings-tab-stores";
import { SettingsTabFormSchema } from "@/types/form-schema";
import editExamSettings from "@/actions/edit-exam-settings";
import { useState } from "react";
import {  ExamSettingsType } from "@/types/objects-types";

interface SettingsTabProps {
    examId: string;
    isSettingsFetchedSuccessfully: boolean;
    examSettings: ExamSettingsType
}
const SettingsTab: React.FC<SettingsTabProps> = ({
    examId,
    isSettingsFetchedSuccessfully,
    examSettings,
}) => {
    const [isSaving, setIsSaving] = useState(false);

    const { isCreatedSectionsHasParagraph } =
        useIsCreatedSectionsHasParagraph();

    const form = useForm<z.infer<typeof SettingsTabFormSchema>>({
        resolver: zodResolver(SettingsTabFormSchema),
        defaultValues: {
            allowImmediateResultViewing:
                examSettings.allowImmediateResultViewing,
            allowMultipleResponses: examSettings.allowMultipleResponses,
        },
    });

    const onSubmit = async (data: z.infer<typeof SettingsTabFormSchema>) => {
        setIsSaving(true);

        if (isCreatedSectionsHasParagraph && data.allowImmediateResultViewing) {
            toast.error("Can not allow immediate result viewing.");
            const immediateResultViewingElement = document.querySelector(
                "#allowImmediateResultViewing"
            ) as HTMLElement;
            immediateResultViewingElement.style.border = "1px solid red";
            immediateResultViewingElement.style.color = "red";
            return;
        }

        toast.loading("Saving...");
        const res = await editExamSettings(examId, data, examSettings);
        toast.dismiss();
        if (!res.success) {
            toast.error(res.error);
            return;
        }

        toast.success("Settings saved.");
        setIsSaving(false);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-[10rem] space-y-4"
            >
                {!isSettingsFetchedSuccessfully && (
                    <div>
                        There is an error configuring the settings of this exam.
                        Please refresh the page.
                    </div>
                )}
                <pre> {JSON.stringify(examSettings)} </pre>
                <p className="text-2xl font-semibold">
                    {" "}
                    Exam Submitted Actions{" "}
                </p>
                <div className="space-y-4">
                    {/* ADD FIELDS HERE  */}
                    <FormField
                        control={form.control}
                        name="allowImmediateResultViewing"
                        render={({ field }) => (
                            <FormItem>
                                <Card id="allowImmediateResultViewing">
                                    <CardContent className="flex items-center justify-between">
                                        <div>
                                            <FormLabel>
                                                {" "}
                                                Allow immediate result viewing{" "}
                                            </FormLabel>
                                            <FormDescription>
                                                {" "}
                                                Allow takers to view the result
                                                of checkboxes and
                                                multiplechoices only
                                                examinations.{" "}
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </CardContent>
                                </Card>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="allowMultipleResponses"
                        render={({ field }) => (
                            <FormItem>
                                <Card id="allowMultipleResponses">
                                    <CardContent className="flex items-center justify-between">
                                        <div>
                                            <FormLabel>
                                                {" "}
                                                Allow multiple responses
                                            </FormLabel>
                                            <FormDescription>
                                                Allow exam to be answered multiple times by an account.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </CardContent>
                                </Card>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={isSaving}>
                    {" "}
                    Save changes{" "}
                </Button>
            </form>
        </Form>
    );
};

export default SettingsTab;
