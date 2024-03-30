import { Router } from "express";
import { FlatRoutes } from "../modules/flat/flat.route";
import { UserRoute } from "../modules/user/user.route";
import { UserProfileRoutes } from "../modules/user-profile/userProfile.route";
import { AuthRoutes } from "../modules/auth/auth.route";


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
]

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default  router;