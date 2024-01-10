import * as z from "zod";

export const profileSchema = z.object({
  profile_photo: z.string().url(),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters." })
    .max(20, { message: "Password must be less than 20 characters." }),
});

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." })
      .max(20, { message: "Username must be less than 20 characters." }),

    email: z.string().email({ message: "Enter a valid email." }),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters." })
      .max(20, { message: "Password must be less than 20 characters." }),
    confirmPassword: z.string().min(3).max(20),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must be same.",
        path: ["confirmPassword"],
      });
    }
  });
