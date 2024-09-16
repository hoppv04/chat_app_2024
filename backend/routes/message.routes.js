import express from "express";
import { sendMessage } from "../controllers/message.controllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/send/:userId", protectRoute, sendMessage);

export default router;
