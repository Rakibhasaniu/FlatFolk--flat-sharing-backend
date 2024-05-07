import { Request, RequestHandler, Response } from "express";
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

const getAllFlat = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, flatFilterAbleFields);
    console.log(filters)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    // console.log(options)
    const result = await FlatServices.getAllFlatFromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Flat retrieval successfully',
      meta: result.meta,
      data: result.data,
    // data:result
    });
  });

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