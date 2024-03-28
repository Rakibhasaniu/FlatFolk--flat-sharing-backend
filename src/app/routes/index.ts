import { Router } from "express";
import { FlatRoutes } from "../modules/flat/flat.route";


const router = Router();

const moduleRoutes = [
    {
        path:'/flat',
        route: FlatRoutes
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default  router;