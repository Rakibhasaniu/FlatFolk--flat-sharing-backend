import { z } from "zod";

const flatValidationSchema = z.object({
    body:z.object({
    // id: z.string(),
    squareFeet: z.number(),
    totalBedrooms: z.number(),
    totalRooms: z.number(),
    utilitiesDescription: z.string(),
    location: z.string(),
    description: z.string(),
    rent: z.number(),
    availability: z.boolean(),
    advanceAmount: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    })
});
const updateFlatValidationSchema = z.object({
    body:z.object({
    // id: z.string(),
    squareFeet: z.number().optional(),
    totalBedrooms: z.number().optional(),
    totalRooms: z.number().optional(),
    utilitiesDescription: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    rent: z.number().optional(),
    availability: z.boolean().optional(),
    advanceAmount: z.number().optional(),
    })
});


export const FlatValidation = {
    flatValidationSchema,
    updateFlatValidationSchema

}