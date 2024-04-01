import { Router } from "express"
import { AuthController } from "./auth.controller";

const router = Router();

router.post('/login',AuthController.login)
router.post('/refresh-token',AuthController.refreshToken)
router.post('/register',AuthController.register)

export const AuthRoutes = router;