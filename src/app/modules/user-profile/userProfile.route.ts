import { Router } from "express";
import { UserProfileController } from "./userProfile.controller";
import auth from "../../middlewares/auth";


const router = Router();
// src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from "../../utils/prisma";
import validateRequest from "../../middlewares/validateRequest";
import { UserProfileValidation } from "./userProfile.validation";

// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   console.log(token)

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       statusCode: 401,
//       message: 'Unauthorized: Missing token'
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     res.status(403).json({
//       success: false,
//       statusCode: 403,
//       message: 'Forbidden: Invalid token'
//     });
//   }
// };


router.get('/profile',auth(),UserProfileController.getUserProfile)
router.put('/profile',auth(),validateRequest(UserProfileValidation.updateUserProfileValidationSchema),UserProfileController.updateUserprofile)

  

export const UserProfileRoutes = router;