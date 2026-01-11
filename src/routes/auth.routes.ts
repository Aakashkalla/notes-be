import express  from "express"
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRouter = express.Router();

authRouter.post("/register",registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me",authMiddleware,getCurrentUser)
authRouter.post("/logout", logoutUser);