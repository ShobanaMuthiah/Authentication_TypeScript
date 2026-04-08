import express from "express";
import {  chatMessages, userChatList } from "../Controllers/chatController";

const router=express.Router()

// router.get("/chatlist",chatLists)
router.get("/userchat",userChatList)
router.post("/getChat",chatMessages)

export default router;