import { Router } from "express";
import { startProgress, updateProgress } from "../controller/pogressController.js";


const progressRoute = Router();

progressRoute.post("/start", startProgress);
progressRoute.post("/update", updateProgress);

export default progressRoute;