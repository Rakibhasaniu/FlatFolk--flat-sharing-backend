import { Router } from "express";
import { FlatController } from "./flat.controller";
import auth from "../../middlewares/auth";

const router = Router();


router.get('/',FlatController.getAllFlat)

router.post('/',auth(),FlatController.createFlat)
router.patch('/:flatId',auth(),FlatController.updateFlat)
export const FlatRoutes = router;