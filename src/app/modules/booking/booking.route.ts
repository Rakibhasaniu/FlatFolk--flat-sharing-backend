import { Router } from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";



const router = Router();

router.post('/booking-applications',auth(),BookingController.createFlat)

export const BookingRoutes = router;