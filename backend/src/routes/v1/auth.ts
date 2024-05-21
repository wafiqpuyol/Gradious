import express, { Router } from "express";
import { userMiddleware } from "../../middlewares"
import { userController } from "../../controllers"


const router: Router = express.Router();

router.post("/signup", userMiddleware.validateSignupData, userController.createUser)
router.post("/signin", userMiddleware.validateSignInData, userController.authenticateUser)
router.post("/signout", userController.signOutUser)

export default router;