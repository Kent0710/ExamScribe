"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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

import { loginFormSchema } from "@/types/form-schema";
import signUp from "@/actions/sign-up";
import { useState } from "react";
import { Briefcase, GraduationCap, Loader2 } from "lucide-react";
import configure from "@/actions/configure";

const LoginForm = () => {
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState<string | undefined>(undefined);

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
        const res = await signUp(values);

        if (res.success) {
            setSuccess(res.success);
        } else {
            setMessage(res.error?.toString());
        }
    };

    if (success) {
        const configureHandler = async (role: string) => {
            const res = await configure(role);

            if (!res.success || res.error) {
                setSuccess(false);
                setMessage(
                    "Something went wrong when setting up your role. " +
                        res.error
                );
            }
        };

        return (
            <div className="text-white flex flex-col items-center w-full">
                <p className="font-bold text-xl"> Successfully logged in! </p>
                <p className="text-muted-foreground">
                    {" "}
                    Configure your account{" "}
                </p>

                <section className="w-[50%] flex flex-col items-center border-t pt-2 mt-2 ">
                    <p className="font-semibold text-lg mb-2">
                        {" "}
                        What&apos;s your role?{" "}
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card className="glass text-white flex flex-col items-center p-18">
                            <GraduationCap size={100} />
                            <p className="text-4xl font-bold"> Student </p>
                            <Button
                                onClick={async () => {
                                    await configureHandler("STUDENT");
                                }}
                            >
                                {" "}
                                I am a Student{" "}
                            </Button>
                        </Card>
                        <Card className="glass text-white flex flex-col items-center p-18">
                            <Briefcase size={100} />
                            <p className="text-4xl font-bold"> Educator </p>
                            <Button
                                onClick={async () => {
                                    await configureHandler("EDUCATOR");
                                }}
                            >
                                {" "}
                                I am an Educator{" "}
                            </Button>
                        </Card>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <Card className="glass rounded-3xl text-white shadow-lg shadow-purple-500/40 w-[30%]">
            <CardHeader>
                <div className="flex flex-col items-center">
                    <CardTitle> Sign up </CardTitle>
                    <CardDescription>
                        {" "}
                        Start by creating your account.{" "}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter username..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Must have at least 2 characters
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter password..."
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Must have at least 6 characters
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-4">
                            <Button
                                type="submit"
                                variant={"glow"}
                                className="w-full rounded-lg"
                            >
                                {form.formState.isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="animate-spin" />
                                        <p> Creating account... </p>
                                    </div>
                                ) : (
                                    <p>Create a new account</p>
                                )}
                            </Button>
                            <Button
                                type="button"
                                className="w-full bg-purple-50/10 hover:bg-purple-50/10 hover:scale-105 hover:opacity-70"
                            >
                                Sign in to an existing account
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            {message && (
                <CardFooter>
                    <small> {message} </small>
                </CardFooter>
            )}
        </Card>
    );
};

export default LoginForm;
