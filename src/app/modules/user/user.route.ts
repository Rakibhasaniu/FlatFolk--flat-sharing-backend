import { Router } from "express";
import { UserController } from "./user.controller";
// import auth from "../../middlewares/auth";


const router = Router();

router.post('/register',UserController.createUser)

export const UserRoute = router;