import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { decodedToken } from "../utils/decodeToken";

const auth = () => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
            }

            const verifiedUser = decodedToken.verifyToken(token, 'asjchgsccvbfh');
            console.log(verifiedUser)

            req.user = verifiedUser;

            next();
        } catch (err) {
            next(err);
        }
    };
};

export default auth;
