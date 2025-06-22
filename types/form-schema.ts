import { z } from "zod";

export const loginFormSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Username must have a minimum of 2 characters" })
        .max(30, {
            message: "Username must only have a maximum of 30 characters ",
        }),
    password: z
        .string()
        .min(6, { message: "Password must have a minimum of 6 characters" })
        .max(30, {
            message: "Password must only have a maximum of 30 characters",
        }),
});

export const joinSubjectSchema = z.object({
    code: z
        .string()
        .min(6, { message: "Code is 6 long characters" })
        .max(6, { message: "Code is only 6 long characters" }),
});

export const createManualExamFormSchema = z.object({
    examTitle: z
        .string()
        .min(3, { message: "Title should have a minimum of 3 characters" })
        .max(30, { message: "Title should have a maximum of 30 characters" }),
    type: z.string().min(4, {message : 'Please select exam type'}),
    examDuration: z.string().min(2, {message : 'Duration should have at least 2 characters'}),
    dueDate: z.string().date(),
    dueTime : z.string().time(),
    examDescription : z.string().optional(),
});
