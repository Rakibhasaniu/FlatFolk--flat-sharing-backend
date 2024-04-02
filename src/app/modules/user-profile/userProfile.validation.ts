import { z } from "zod";

const updateUserProfileValidationSchema = z.object({
    body:z.object({
    bio: z.string().optional(),
    profession: z.string().optional(),
    address: z.string().optional(),
    })
});

export const UserProfileValidation = {
    updateUserProfileValidationSchema
}