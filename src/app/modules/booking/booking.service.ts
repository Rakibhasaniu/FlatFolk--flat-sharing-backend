import { RequestHandler } from "express"
import prisma from "../../utils/prisma"



const createFlatBookingIntoDB = async(id:any,userId:any) => {
    // console.log("servse",id)
    // console.log("servse",userId)
    const flat = await prisma.flat.findUniqueOrThrow({
        where:{
            id,
        }
       })
    //    console.log(flat)

    if (!flat) {
        throw new Error('Flat with the provided ID does not exist');
    }
    
    const booking = await prisma.booking.create({
        data: {
            flat: { connect: { id: id } },
            user: { connect: { id: userId } },
            status: "PENDING"
          }
    })
    const responseData = {
        id: booking.id,
        userId: booking.userId,
        flatId: booking.flatId,
        status: booking.status,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      };

      return responseData;
}

const getALlBookingFromDB = async(userId:string) => {
    const = 
}

export const BookingServices = {
    createFlatBookingIntoDB,
}