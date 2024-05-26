import { Router } from "express";
import loginUserController from "../controller/userLoginController.js";


const router=Router();
router.post("/login",loginUserController.verifyUserController);

export default router;