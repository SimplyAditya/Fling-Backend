import { Router } from "express";
import registerUserController from "../controller/userRegisterationController.js";
import loginUserController from "../controller/userLoginController.js";
import checkExistingUserController from "../controller/checkExistingUserController.js";


const router=Router();
router.post("/register",registerUserController.registerUser);
router.post("/login",loginUserController.verifyUserController);
router.post("/checkUser",checkExistingUserController.checkExistingUser);
router.post("/checkImage",registerUserController.verifyImage);
router.post("/checkInsta",registerUserController.verifyInsta);
router.post("/checkSnap",registerUserController.verifySnap);


export default router;