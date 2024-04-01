import { Router } from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";



const router = Router();

router.post('/booking-applications',auth(),BookingController.createFlat)
router.get('/booking-requests',auth(),BookingController.createFlat)
router.put('/booking-requests/:bookingId',auth(),BookingController.updateBooking)

export const BookingRoutes = router;