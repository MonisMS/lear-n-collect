import { Router } from "express";
import { addSampleQuestion, correctAnswer, getQuestions, getRandomQuestions } from "../controller/questionController.js";


const questionRoute = Router();

questionRoute.get("/",getQuestions)
questionRoute.post("/sample",addSampleQuestion)
questionRoute.get("/random", getRandomQuestions);
questionRoute.post("/check", correctAnswer);
export default questionRoute;