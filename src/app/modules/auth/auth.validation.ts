import { z } from 'zod';

const loginZodSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

const refreshTokenZodSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});



const registerSchema = z.object({
    body:z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    bio: z.string(),
    profession: z.string(),
    address: z.string(),
    })
});





export const AuthValidation = {
    loginZodSchema,
    refreshTokenZodSchema,
    registerSchema
};