import { Flat, Prisma } from "@prisma/client";
import prisma from "../../utils/prisma"
import { paginationHelper } from "../../utils/paginateHelper";
import { flatSearchAbleFields } from "./flat.constant";


const addFlatIntoDB = async(payload:any) => {
    const result = await prisma.flat.create({
        data: payload,
    });
    return result;
}
const getAllFlatFromDB = async (params:any,options:any) => {
    // const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const andCondions: Prisma.FlatWhereInput[] = [];

    if (params.searchTerm) {
        andCondions.push({
            OR: flatSearchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    };


    //console.dir(andCondions, { depth: 'inifinity' })
    const whereConditons: Prisma.FlatWhereInput = { AND: andCondions }

    const result = await prisma.flat.findMany({
        where: whereConditons,
        // skip,
        // take: limit,
        // orderBy: options.sortBy && options.sortOrder ? {
            // [options.sortBy]: options.sortOrder
        // } : {
            // createdAt: 'desc'
        // }
    });

    // const total = await prisma.flat.count({
    //     where: whereConditons
    // });

    // return {
    //     meta: {
    //         page,
    //         limit,
    //         total
    //     },
    //     data: result
    // };
   
    return result;
};


// const getAllFlatFromDB = async(params:any,options:any) => {

//     const { page, limit, skip } = paginationHelper.calculatePagination(options);
//     const { searchTerm, ...filterData } = params;

//     const andCondions: Prisma.FlatWhereInput[] = [];

//     //console.log(filterData);
//     if (params.searchTerm) {
//         andCondions.push({
//             OR: flatSearchAbleFields.map(field => ({
//                 [field]: {
//                     contains: params.searchTerm,
//                     mode: 'insensitive'
//                 }
//             }))
//         })
//     };

//     if (Object.keys(filterData).length > 0) {
//         andCondions.push({
//             AND: Object.keys(filterData).map(key => ({
//                 [key]: {
//                     equals: (filterData as any)[key]
//                 }
//             }))
//         })
//     };

//     // andCondions.push({
//     //     isDeleted: false
//     // })

//     //console.dir(andCondions, { depth: 'inifinity' })
//     const whereConditons: Prisma.FlatWhereInput = { AND: andCondions }

//     const result = await prisma.flat.findMany(
//         {
//             where: whereConditons,
//             skip,
//             take: limit,
//             orderBy: options.sortBy && options.sortOrder ? {
//                 [options.sortBy]: options.sortOrder
//             } : {
//                 createdAt: 'desc'
//             }
//         }
//     );

//     const total = await prisma.flat.count();

//     return {
//         meta:{
//             total,
//         },
//         data:result
//     }

// }
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