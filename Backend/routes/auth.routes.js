import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { register, login, getMe, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getMe);
router.post("/logout", verifyToken, logout);

export default router;
