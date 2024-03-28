import { Router } from "express";
import { FlatController } from "./flat.controller";

const router = Router();

router.post('/create-flat',FlatController.createFlat)

export const FlatRoutes = router;