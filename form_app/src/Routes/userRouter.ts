import express from "express";
import { getAllUser, loginUser, oAuth, refreshToken, registerUser } from "../Controllers/userController";
const router=express.Router();

router.post("/LoginForm",loginUser)
router.post("/refresh",refreshToken)
router.post("/loginOAuth",oAuth)
router.post("/register",registerUser)
router.get('/getAll',getAllUser)


export default router;