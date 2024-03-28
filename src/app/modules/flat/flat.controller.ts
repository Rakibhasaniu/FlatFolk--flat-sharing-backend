import { RequestHandler } from "express";
import { FlatServices } from "./flat.service";


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

export const FlatController = {
    createFlat
}