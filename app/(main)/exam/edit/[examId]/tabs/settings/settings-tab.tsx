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

const SettingsTabFormSchema = z.object({
    allowImmediateResultViewing: z.boolean(),
});

interface SettingsTabProps {
    examId: string;
}
const SettingsTab: React.FC<SettingsTabProps> = ({ examId }) => {
    const form = useForm<z.infer<typeof SettingsTabFormSchema>>({
        resolver: zodResolver(SettingsTabFormSchema),
        defaultValues: {
            allowImmediateResultViewing: false,
        },
    });

    const onSubmit = async (data: z.infer<typeof SettingsTabFormSchema>) => {
        
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-[10rem] space-y-4">
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
                                <Card>
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
                </div>
                <Button type="submit"> Save changes </Button>
            </form>
        </Form>
    );
};

export default SettingsTab;
