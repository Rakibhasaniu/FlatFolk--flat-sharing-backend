import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { ZodError, ZodIssue, z } from "zod";
import handleZodError from "../errors/hnadleZodError";
import { TErrorDetails } from "../interface";
import path from "path";

const globalErrorHandler:ErrorRequestHandler = (err, req, res, next) => {
    
    let statusCode = err.status ||  500;
    let message = err.message || 'Something went wrong';
    
    let errorDetails = {
        issues:[ {
            field:'',
            message:'something went wrong'
        }]
    }
    
    
    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err)
        // console.log(simplifiedError)
        statusCode=simplifiedError?.statusCode,
        message=simplifiedError?.message
        errorDetails=simplifiedError?.errorDetails
        
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorDetails
    })
};

export default globalErrorHandler;
