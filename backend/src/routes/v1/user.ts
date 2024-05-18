import express, { Router } from "express";
import { userMiddleware } from "../../middlewares"
import { userController } from "../../controllers"


const router: Router = express.Router();

router.post("/signup", userMiddleware.validateSignupData, userController.createUser)

export default router;