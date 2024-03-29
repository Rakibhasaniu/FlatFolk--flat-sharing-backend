import { Flat } from "@prisma/client";
import prisma from "../../utils/prisma"


const addFlatIntoDB = async(payload:any) => {
    const result = await prisma.flat.create({
        data: payload,
    });
    return result;
}

const getAllFlatFromDB = async() => {
    const result = await prisma.flat.findMany();

    const total = await prisma.flat.count();

    return {
        meta:{
            total,
        },
        data:result
    }

}
const updateFlatFromDB = async(id:string,payload:Partial<Flat>) => {
    
   await prisma.flat.findUniqueOrThrow({
    where:{
        id,
    }
   })
   const result = await prisma.flat.update({
       where:{
           id,
       },
       data:payload,
   })
   return result;

}

export const FlatServices = {
    addFlatIntoDB,
    getAllFlatFromDB,
    updateFlatFromDB
}