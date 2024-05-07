import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserProfileServices } from "./userProfile.service";
import { decodedToken } from "../../utils/decodeToken";


const getUserProfile = catchAsync(async(req ,res) => {
    const user = req.user;
    console.log(user)
    const result = await UserProfileServices.getUserProfileFromDB(user);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'User profile retrieved successfully',
        data:result
    })
})
const updateUserprofile = catchAsync(async(req,res) => {
    // const token = req.headers.authorization;
    // console.log('middleware token',token)

    // const data = decodedToken.verifyToken(token,'asjchgsccvbfh')
    // console.log('DATA',data)
    // console.log('middleware user',req.user)
    // console.log('Middleware',req)
    // console.log(req.token)
    // const id = req.user.id;
    // console.log(id)
    const result = await UserProfileServices.updateUserProfileFromDB(req);

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