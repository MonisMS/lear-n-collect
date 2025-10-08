import { Router } from "express";
import { startProgress, updateProgress } from "../controller/pogressController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";


const progressRoute = Router();

progressRoute.post("/start", authenticateToken, startProgress);
progressRoute.post("/update", authenticateToken, updateProgress);

export default progressRoute;