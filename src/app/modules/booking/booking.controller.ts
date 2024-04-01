import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";


const createFlat = catchAsync(async(req,res) => {
    const {flatId} = req.body;
    // console.log('flatId',flatId)
    const userId = req.user.id;
    // console.log('UserId',userId)

    const result = await BookingServices.createFlatBookingIntoDB(flatId,userId);
    console.log(result)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'Booking requests submitted successfully',
        data:result
    })
})

export const  BookingController = {
    createFlat,
}