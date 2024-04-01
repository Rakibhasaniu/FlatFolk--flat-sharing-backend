import { Router } from "express";
import { FlatRoutes } from "../modules/flat/flat.route";
import { UserRoute } from "../modules/user/user.route";
import { UserProfileRoutes } from "../modules/user-profile/userProfile.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookingRoutes } from "../modules/booking/booking.route";


const router = Router();

const moduleRoutes = [
    {
        path:'/flat',
        route: FlatRoutes
    },
    {
        path:'/user',
        route: UserRoute
    },
    {
        path:'/',
        route: UserProfileRoutes
    },
    {
        path:'/',
        route: AuthRoutes
    },
    {
        path:'/',
        route: BookingRoutes
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default  router;