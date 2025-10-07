import { Router } from "express";
import { startProgress, testAuth, updateProgress } from "../controller/pogressController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";


const progressRoute = Router();
progressRoute.get("/test-auth", authenticateToken, testAuth); // Add this test route

progressRoute.post("/start", authenticateToken, startProgress);
progressRoute.post("/update", authenticateToken, updateProgress);

export default progressRoute;