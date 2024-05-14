import z from "zod";

export const signUpSchema = z.object({
    firstName: z.string().describe("First Name"),
    lastName: z.string().describe("Last Name"),
    email: z.string().describe("Email").email({ message: "Email is required" }),
    password: z
        .string()
        .describe("Password")
        .min(6, { message: "Password must be atleast 6 characters" })
        .max(14, { message: "Password must be within 14 characters" }),
    confirmPassword: z.string().describe("Confirm Password"),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password didn't match",
        path: ["Confirm Password"],
    });

export type signUpPayload = Zod.infer<typeof signUpSchema>;
