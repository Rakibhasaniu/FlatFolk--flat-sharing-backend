import { RequestHandler } from "express";
import { FlatServices } from "./flat.service";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import { flatFilterAbleFields } from "./flat.constant";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";




const createFlat = catchAsync(async(req,res) => {
    
    const result = await FlatServices.addFlatIntoDB(req.body);

    sendResponse(res,{
        statusCode: httpStatus.CREATED,
        success:true,
        message:"Flat added successfully",
        // meta:result?.meta,
        data:result
    })

})

// const getAllFlat = catchAsync(async(req,res) => {
//     const filters = pick(req.query,flatFilterAbleFields);
//     const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

//     const result = await FlatServices.getAllFlatFromDB(filters,options);

//     sendResponse(res,{
//         statusCode:httpStatus.OK,
//         success:true,
//         message: 'Flats retrieved successfully',
//         meta:result?.meta,
//         data:result.data
//     })
// })
const getAllFlat = catchAsync(async (req, res) => {
    // console.log(req.query)
    const filters = pick(req.query, flatFilterAbleFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    // console.log(options)
    const result = await FlatServices.getAllFlatFromDB(filters,options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Flats retrieved successfully",
        // meta: result.meta,
        // data: result.data
        data:result
    })
})
const updateFlat = catchAsync(async(req,res)=>{
    const {flatId} = req.params;
    const result = await FlatServices.updateFlatFromDB(flatId,req.body)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Flat information updated successfully",
        data:result,
    })
})

export const FlatController = {
    createFlat,
    getAllFlat,
    updateFlat
}