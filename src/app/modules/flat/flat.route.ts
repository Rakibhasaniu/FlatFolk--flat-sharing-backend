import { Router } from "express";
import { FlatController } from "./flat.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { FlatValidation } from "./flat.validation";

const router = Router();


router.get('/',auth(),FlatController.getAllFlat)

router.post('/',auth(),validateRequest(FlatValidation.flatValidationSchema),FlatController.createFlat)
router.patch('/:flatId',auth(),validateRequest(FlatValidation.updateFlatValidationSchema),FlatController.updateFlat)
export const FlatRoutes = router;