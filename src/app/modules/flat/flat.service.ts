import { Flat, Prisma } from "@prisma/client";
import prisma from "../../utils/prisma"
import { paginationHelper } from "../../utils/paginateHelper";
import { flatFilterAbleFields, flatSearchAbleFields } from "./flat.constant";


const addFlatIntoDB = async(payload:any) => {
    const result = await prisma.flat.create({
        data: payload,
    });
    return result;
}

const getAllFlatFromDB = async(params:any) => {
    const { searchTerm, page = 1, limit = 10, sortBy, sortOrder = 'desc', availability } = params;

        // Prepare filter options based on query parameters
        const filterOptions: any = {};
        if (searchTerm) {
            filterOptions.OR = [
                { location: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } },
                { utilitiesDescription: { contains: searchTerm, mode: 'insensitive' } }
            ];
        }
        if (availability) {
            filterOptions.availability = availability === 'true' ? true : false;
        }
        
        // Prepare sorting options
        const orderBy: any = {};
        if (sortBy) {
            orderBy[sortBy as string] = sortOrder === 'desc' ? 'desc' : 'asc';
        }

        // Retrieve flats with pagination and filters
        const flats = await prisma.flat.findMany({
            where: filterOptions,
            orderBy,
            take: Number(limit),
            skip: (Number(page) - 1) * Number(limit)
        });

        // Count total number of flats
        const total = await prisma.flat.count({ where: filterOptions });
        return {
                  meta:{
                      page,
                      limit,
                      total
                  },
            
                  data:flats
              };
}

// const getAllFlatFromDB = async(params:any,option:any) => {
  
// //   const {limit,page,skip} =paginationHelper.calculatePagination(option);
//   const {searchTerm,...filterData} = params;
//   const {limit,page} = option;
//   console.log(limit,page)
//   const condition:Prisma.FlatWhereInput[] = [];
//   if(searchTerm){
//       condition.push({
//           OR:flatSearchAbleFields.map((field)=> ({
//               [field]: {
//                   contains: searchTerm,
//                   mode: "insensitive"
//               }
//           }))
//       })
//   }
//   if (Object.keys(filterData).length > 0) {
//     condition.push({
//         AND: Object.keys(filterData).map((key) => ({
//             [key]: {
//                 equals: typeof filterData[key] === 'string' ? JSON.parse(filterData[key]) : filterData[key],
//             }
//         }))
//     })
// }


//   const arrayToObj:Prisma.FlatWhereInput ={AND:condition}
//   const result = await prisma.flat.findMany({
//       where:arrayToObj,
//       skip: (page-1)*limit,
//       take: limit,
      
      
    //   orderBy:option.sortBy &&  option.sortOrder ? {
    //       [option.sortBy]:option.sortOrder
    //   } : {
    //       createdAt:'desc'
    //   }
//   });
//   const total=await prisma.flat.count({
//       where:arrayToObj
//   })
//   return {
//       meta:{
//           page,
//           limit,
//           total
//       },

//       data:result
//   };
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