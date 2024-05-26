import { Router } from "express";
import registerUserController from "../controller/userRegisterationController.js";

const router=Router();
router.post("/register",registerUserController.registerUser);

export default router;