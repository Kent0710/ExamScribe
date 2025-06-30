"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase } from "lucide-react";
import configure from "@/actions/configure";
import { toast } from "sonner";

const ConfigurePage = () => {
    const configureHandler = async (role: string) => {
        const res = await configure(role);

        if (!res.success || res.error) {
            toast.error("Something went wrong when setting your role.", {
                duration: 1500,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            <div className="flex items-center justify-center my-[5rem]">
                <div className="text-white flex flex-col items-center w-full">
                    <p className="font-bold text-xl">
                        {" "}
                        Successfully logged in!{" "}
                    </p>
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
            </div>
        </div>
    );
};

export default ConfigurePage;
