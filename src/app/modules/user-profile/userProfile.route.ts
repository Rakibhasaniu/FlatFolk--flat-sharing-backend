import { Router } from "express";
import { UserProfileController } from "./userProfile.controller";
import auth from "../../middlewares/auth";


const router = Router();
// src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from "../../utils/prisma";

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
router.put('/profile',auth(),UserProfileController.updateUserprofile)

// router.put('/profile', verifyToken, async (req: Request, res: Response) => {
//     try {
//       const userId = req.user.id; // Extract user ID from decoded token
//       const { bio }: { bio: string } = req.body;
  
//       // Update user profile
//       const updatedProfile = await prisma.userProfile.update({
//         where: {
//           userId: userId
//         },
//         data: {
//           bio: bio
//         }
//       });
  
//       res.status(200).json({
//         success: true,
//         statusCode: 200,
//         message: 'User profile updated successfully',
//         data: updatedProfile
//       });
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//       res.status(500).json({
//         success: false,
//         statusCode: 500,
//         message: 'Failed to update user profile'
//       });
//     }
//   });
  

export const UserProfileRoutes = router;