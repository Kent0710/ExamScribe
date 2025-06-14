"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "../ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import createSubject from "@/actions/create-subject";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { DialogClose } from "../ui/dialog";
import { Loader2 } from "lucide-react";

// track max cases of the switch
const MAX_CASES = 3;

interface FieldType {
    value: string;
    optionalValue: string;
}

const CreateNewSubjectForm = () => {
    const [disabled, setDisabled] = useState(false);
    // use to track the current page of the create new subject form
    const [formTracker, setFormTracker] = useState(1);

    const [department, setDepartment] = useState<FieldType>({
        value: "",
        optionalValue: "",
    });
    const [subject, setSubject] = useState<FieldType>({
        value: "",
        optionalValue: "",
    });

    switch (formTracker) {
        case 1:
            return (
                <div>
                    <Label htmlFor="department" className="mb-2">
                        {" "}
                        What department will the subject be in?{" "}
                    </Label>
                    <Select
                        value={department.value}
                        onValueChange={(value) =>
                            setDepartment({
                                value,
                                optionalValue: value === "other" ? "" : value,
                            })
                        }
                    >
                        <SelectTrigger name="department" className="w-full">
                            <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="shs">
                                Senior High School
                            </SelectItem>
                            <SelectItem value="college">College</SelectItem>
                            <SelectItem value="graduate">Graduate</SelectItem>
                            <SelectItem value="other">Other...</SelectItem>
                        </SelectContent>
                    </Select>
                    {department.value === "other" && (
                        <>
                            <Label> Please specify </Label>
                            <Input
                                placeholder="Specify department"
                                onChange={(e) =>
                                    setDepartment({
                                        value: department.value,
                                        optionalValue: e.target.value,
                                    })
                                }
                            />
                        </>
                    )}
                    <FormTrackerControls
                        formTracker={formTracker}
                        setFormTracker={setFormTracker}
                        currentField={department}
                    />
                </div>
            );
            break;
        case 2:
            return (
                <div>
                    <Label htmlFor="subject" className="mb-2">
                        Subject name (this will appear as the primary name of
                        this section)
                    </Label>
                    <Input
                        onChange={(e) =>
                            setSubject({
                                value: e.target.value,
                                optionalValue: e.target.value,
                            })
                        }
                        placeholder="Enter subject name..."
                    />
                    <FormTrackerControls
                        formTracker={formTracker}
                        setFormTracker={setFormTracker}
                        currentField={subject}
                    />
                </div>
            );
        case 3:
            return (
                <div>
                    <Label htmlFor="department" className="mb-2">
                        {" "}
                        Department{" "}
                    </Label>
                    <input
                        placeholder={
                            department.value === "other"
                                ? department.optionalValue
                                : department.value
                        }
                        name="department"
                        disabled
                    />
                    <Label htmlFor="subjectName" className="my-2">
                        {" "}
                        Subject Name{" "}
                    </Label>
                    <input
                        placeholder={subject.value}
                        disabled
                        name="subjectName"
                    />
                    <div className="w-full flex justify-between items-center mt-2 space-x-2">
                        <Button
                            onClick={() => {
                                setFormTracker((prevVal) => prevVal - 1);
                            }}
                        >
                            {" "}
                            Go back{" "}
                        </Button>
                        <small className="text-muted-foreground">
                            {" "}
                            {formTracker} / {MAX_CASES}{" "}
                        </small>
                        <Button
                            disabled={disabled}
                            onClick={async () => {
                                setDisabled(true);
                                toast.loading("Creating subject...");

                                const values = {
                                    departmentName:
                                        department.value === "other"
                                            ? department.optionalValue
                                            : department.value,
                                    subjectName: subject.value,
                                };

                                const res = await createSubject(values);
                                if (
                                    !res.success ||
                                    res.error ||
                                    !res.subjectId
                                ) {
                                    setDisabled(false);
                                    toast.error(
                                        "Error creating subject. Try again."
                                    );
                                    setDepartment({
                                        value: "",
                                        optionalValue: "",
                                    });
                                    setSubject({
                                        value: "",
                                        optionalValue: "",
                                    });
                                    setFormTracker(0);
                                } else {
                                    setDisabled(false);
                                    toast.dismiss()
                                    toast.success(
                                        "Successfully created subject. Opening subject..."
                                    );
                                    redirect(`/subject/${res.subjectId}`);
                                }
                            }}
                        >
                            {" "}
                            {disabled ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Creating subject...
                                </>
                            ) : (
                                <>Create subject</>
                            )}
                        </Button>
                    </div>
                </div>
            );
    }
};

export default CreateNewSubjectForm;

interface FormTrackerControlsProps {
    formTracker: number;
    setFormTracker: Dispatch<SetStateAction<number>>;
    currentField: FieldType;
}
const FormTrackerControls: React.FC<FormTrackerControlsProps> = ({
    formTracker,
    setFormTracker,
    currentField,
}) => {
    return (
        <div className="w-full flex justify-between items-center mt-2">
            <Button
                onClick={() => {
                    setFormTracker((prevVal) => prevVal - 1);
                }}
            >
                {" "}
                Go back{" "}
            </Button>
            <small className="text-muted-foreground">
                {" "}
                {formTracker} / {MAX_CASES}{" "}
            </small>
            <Button
                disabled={
                    currentField.value && currentField.optionalValue
                        ? false
                        : true
                }
                onClick={() => {
                    setFormTracker((prevVal) => prevVal + 1);
                }}
            >
                {" "}
                Go next{" "}
            </Button>
        </div>
    );
};
