import prisma from "../../utils/prisma"


const getUserProfileFromDB = async() => {
    const result = await prisma.userProfile.findMany();
    return result;
}

const updateUserProfileFromDB = async(id:string,data:any) => {
    await prisma.userProfile.findUniqueOrThrow({
        where:{
            id,
        }
       })
       const result = await prisma.userProfile.update({
           where:{
               id,
           },
           data:data,
       })
       return result;
}

export const UserProfileServices = {
    getUserProfileFromDB,
    updateUserProfileFromDB
}