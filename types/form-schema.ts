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
