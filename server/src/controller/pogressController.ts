import type  { Request,Response } from "express";
import { db } from "../config/db.js";
import { user, userProgress } from "../models/schemas.js";
import { and, eq } from "drizzle-orm";



export const startProgress = async (req:Request,res:Response)=>{
   try {



     const { field, topic, level } = req.body;
     const userId = req.user?.userId;
     
    if(!field || !topic || !level ){
        return res.status(400).json({message:"Field, topic, level and sessionId are required"});
    }

   if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

   

    const existingProgress = await db.select()
    .from(userProgress)
    .where(and(
        eq(userProgress.user_id, userId),
        eq(userProgress.field,field),
        eq(userProgress.topic,topic),
        eq(userProgress.level,level)
    ))



    if(existingProgress.length > 0){
  return res.json({
                success: true,
                message: 'Progress session found',
                data: existingProgress[0]
            });
    
   }



   const newProgress = await db.insert(userProgress).values({
    user_id: userId,
    field,
    topic,
    level,
    questions_answered:0,
    correct_answers:0,
    total_questions:0,
   }).returning();




   res.status(201).json({
    success: true,
    message: 'New quiz session started',
    data: newProgress[0]
   })
 } catch (error) {
    res.status(500).json({
            success: false,
            message: 'Failed to start quiz session',
            error: (error as Error).message
        });
    }
   }

   
export const updateProgress = async (req:Request,res:Response)=>{
try {
    const { field, topic, level, isCorrect } = req.body;
const userId = req.user?.userId;
    if( !field || !topic || !level || typeof isCorrect !== 'boolean'){
        return res.status(400).json({message:"userId, field, topic, level and isCorrect are required"});
    }
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const progressRecord = await db.select()
    .from(userProgress)
    .where(and(
        eq(userProgress.user_id, userId),
        eq(userProgress.field,field),
        eq(userProgress.topic,topic),
        eq(userProgress.level,level)

    ))
    if(progressRecord.length === 0){
        return res.status(404).json({message:"Progress record not found. Please start a new session."});
    }
    const currentProgress = progressRecord[0]!;


    const updateProgress = await db.update(userProgress)
    .set({
        questions_answered: currentProgress.questions_answered + 1,
        correct_answers:isCorrect ?
        currentProgress.correct_answers + 1 :
        currentProgress.correct_answers,
        last_practiced: new Date()
        
    })
    .where(eq(userProgress.id,currentProgress.id))
    .returning();

     res.json({
            success: true,
            message: 'Progress updated',
            data: updateProgress[0]
        });
} catch (error) {
    res.status(500).json({
        success: false,
        message: 'Failed to update progress',
        error: (error as Error).message
    });
}
}
