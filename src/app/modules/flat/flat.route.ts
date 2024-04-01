import { Router } from "express";
import { FlatController } from "./flat.controller";

const router = Router();


router.get('/',FlatController.getAllFlat)

router.post('/',FlatController.createFlat)
router.patch('/:id',FlatController.updateFlat)
export const FlatRoutes = router;