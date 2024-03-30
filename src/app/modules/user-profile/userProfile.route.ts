import { Router } from "express";
import { UserProfileController } from "./userProfile.controller";
import auth from "../../middlewares/auth";


const router = Router();

router.get('/profile',auth(),UserProfileController.getUserProfile)
router.put('/profile/:id',UserProfileController.updateUserprofile)

export const UserProfileRoutes = router;