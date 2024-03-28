import prisma from "../../utils/prisma"


const addFlatIntoDB = async(payload:any) => {
    const result = await prisma.flat.create({
        data: payload,
    });
    return result;
}

export const FlatServices = {
    addFlatIntoDB
}