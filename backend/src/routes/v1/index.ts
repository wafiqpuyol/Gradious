import express, { Router } from "express";
import authRoutes from "./auth"

const router: Router = express.Router();

router.use("/users/auth", authRoutes)

export default router;