import { Router } from "express";
import registerUserController from "../controller/userRegisterationController.js";
import loginUserController from "../controller/userLoginController.js";
import checkExistingUserController from "../controller/checkExistingUserController.js";
import swipeController from "../controller/swipeController.js";
import FriendController from"../controller/FriendController.js";
import deleteUserController from "../controller/deleteUserController.js";
import gemController from "../controller/gemController.js";
import getUserInfoController from "../controller/getUserInfoController.js";
import updateUserInfoController from "../controller/updateUserInfoController.js";


const router=Router();
router.post("/register",registerUserController.registerUser);
router.post("/login",loginUserController.verifyUserController);
router.post("/checkUser",checkExistingUserController.checkExistingUser);
router.post("/checkImage",registerUserController.verifyImage);
router.post("/checkInsta",registerUserController.verifyInsta);
router.post("/checkSnap",registerUserController.verifySnap);
router.post("/leftSwipe",swipeController.LeftSwipeController);
router.post("/rightSwipe",swipeController.RightSwipeController);
router.post("/addFriend",FriendController.addFriendController);
router.post("/rejectFriend",FriendController.rejectFriendController);
router.post("/deleteUser",deleteUserController.deleteUserFunction);
router.get("/getGemCount",gemController.gemCountController);
router.post("/remove10gems",gemController.remove10gemsController);
router.post("/addGems",gemController.purchaseGemsController);
router.post("/addViaClaimButton",gemController.addViaClaimButton);
router.get("/getProfile",getUserInfoController.getUserInfoController);
router.get("/getProfile/name",getUserInfoController.getNameController);
router.get("/getProfile/country",getUserInfoController.getCountryController);
router.get("/getProfile/gender",getUserInfoController.getGenderController);
router.get("/getProfile/insta",getUserInfoController.getInstaController);
router.get("/getProfile/snap",getUserInfoController.getSnapController);
router.get("/getProfile/preferredCountry",getUserInfoController.getPreferredCountryController);
router.get("/getProfile/preferredGender",getUserInfoController.getPreferredGenderController);
router.post("/updateUserInfo",updateUserInfoController.updateInfoController);

export default router;