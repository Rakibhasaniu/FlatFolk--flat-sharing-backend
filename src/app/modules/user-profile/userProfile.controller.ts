import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserProfileServices } from "./userProfile.service";


const getUserProfile = catchAsync(async(req,res) => {
    const result = await UserProfileServices.getUserProfileFromDB();

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Get All UserProfile Successfully!',
        data:result
    })
})
const updateUserprofile = catchAsync(async(req,res) => {
    const {id} = req.params;
    const result = await UserProfileServices.updateUserProfileFromDB(id,req.body);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'UserProfile data updated Successfully!',
        data:result
    })
})

export const UserProfileController = {
    getUserProfile,
    updateUserprofile
}