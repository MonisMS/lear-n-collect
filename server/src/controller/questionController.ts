
import type  { Request, Response } from "express";
import { question } from "../models/schemas.js";
import { db } from "../config/db.js";
import { and, eq, is, sql } from "drizzle-orm";


export const getQuestions = async(req:Request,res:Response) =>{


 try {
       const questions = await db.select().from(question)

    res.json({
        success:true,   
        data:questions,
        count:questions.length
    })
} catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch questions',
      error: (error as Error).message
    });
  }
};

export const addSampleQuestion = async (req: Request, res: Response) => {
  try {
    const newQuestion = await db.insert(question).values({
      question_text: "What does HTML stand for?",
      option_a: "Hyper Text Markup Language",
      option_b: "Home Tool Markup Language", 
      option_c: "Hyperlinks and Text Markup Language",
      option_d: "Hyper Tool Markup Language",
      correct_answer: "a",
      field: "programming",
      topic: "html",
      level: "beginner"
    });
    
    res.json({ 
      success: true, 
      message: "Sample question added!",
      data: newQuestion 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};

export const getRandomQuestions = async (req: Request, res: Response) => {
    try {
        const { field, topic, level } = req.query;
        
        // Build WHERE conditions
        const whereConditions = [];
        
        if (field) {
            whereConditions.push(eq(question.field, field as string));
        }
        if (topic) {
            whereConditions.push(eq(question.topic, topic as string));
        }
        if (level) {
            whereConditions.push(eq(question.level, level as string));
        }
        
        // Execute query - build it all in one chain
        const questions = whereConditions.length > 0 
            ? await db.select()
                .from(question)
                .where(and(...whereConditions))
                .orderBy(sql`RANDOM()`)
                .limit(1)
            : await db.select()
                .from(question)
                .orderBy(sql`RANDOM()`)
                .limit(1);
        
        if (questions.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No questions found with the specified criteria'
            });
        }
        
        res.json({
            success: true,
            data: questions[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch random question',
            error: (error as Error).message
        });
    }
}


export const correctAnswer = async (req: Request, res: Response) => {
    try {
        const { selectedOption, questionId } = req.body;

        if(!selectedOption || !questionId){
            return res.status(400).json({
                success:false,
                message:"selectedOption and questionId are required"
            })
        }

        const questions = await db.select()
        .from(question)
        .where(eq(question.id, questionId));

        if(questions.length === 0){
            return res.status(404).json({
                success:false,
                message:"Question not found"
            })
        }
        const questionItem = questions[0]!;

        const isCorrect = questionItem.correct_answer === selectedOption.toLowerCase();

        res.json({
            success:true,
            isCorrect,
            correctAnswer: questionItem.correct_answer,
            selectedOption: `The correct answer is option ${selectedOption.toLowerCase()}: ${
                questionItem.correct_answer === 'a' ? questionItem.option_a :
                questionItem.correct_answer === 'b' ? questionItem.option_b :
                questionItem.correct_answer === 'c' ? questionItem.option_c :
                questionItem.option_d
            }`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to check answer',
            error: (error as Error).message
        });
    }
};