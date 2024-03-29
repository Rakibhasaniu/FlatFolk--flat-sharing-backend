import { RequestHandler } from "express";
import { FlatServices } from "./flat.service";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import { flatFilterAbleFields } from "./flat.constant";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createFlat:RequestHandler = async(req,res) => {
    try {
        const result = await FlatServices.addFlatIntoDB(req.body);

    res.status(200).json({
        success : true ,
        message: 'Flat Created Successfully',
        data:result
    })
    } catch (err:any) {
        res.status(500).json({
            success : false ,
            message: err?.message,
            error:err
        })
    }
}

const getAllFlat:RequestHandler = catchAsync(async(req,res) => {
    const filters = pick(req.query,flatFilterAbleFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await FlatServices.getAllFlatFromDB(filters,options);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Get All Flats Successfully!',
        meta:result.meta,
        data:result.data
    })
})

const updateFlat:RequestHandler = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const result = await FlatServices.updateFlatFromDB(id,req.body)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Flat data updated Successfully",
        data:result,
    })
})

export const FlatController = {
    createFlat,
    getAllFlat,
    updateFlat
}