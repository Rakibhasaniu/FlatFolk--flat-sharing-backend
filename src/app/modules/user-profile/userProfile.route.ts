import { Router } from "express";
import { UserProfileController } from "./userProfile.controller";


const router = Router();

router.get('/profile',UserProfileController.getUserProfile)
router.put('/profile/:id',UserProfileController.updateUserprofile)

export const UserProfileRoutes = router;