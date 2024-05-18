import z from "zod";

export const signUpSchema = z.object({
    firstName: z.string().describe("First Name").min(3, { message: "First Name must be atleast 3 characters" }),
    lastName: z.string().describe("Last Name").min(2, { message: "Last Name must be atleast 2 characters" }),
    email: z.string({ required_error: "Email is required" }).describe("Email").email({ message: "Email is required" }),
    password: z
        .string({ required_error: "Password is required" })
        .describe("Password")
        .min(6, { message: "Password must be atleast 6 characters" })
        .max(14, { message: "Password must be within 14 characters" }),
    confirmPassword: z.string().describe("Confirm Password"),
})
    .superRefine((val, ctx) => {
        if (val.password !== val.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["confirmPassword"],
                message: "Passwords didn't not match, fuck",
            });
        }
    })

export const loginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export type loginPayload = z.infer<typeof loginSchema>
export type signUpPayload = Zod.infer<typeof signUpSchema>;
