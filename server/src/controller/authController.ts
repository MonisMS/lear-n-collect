import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { user } from "../models/schemas.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req: Request, res: Response) => {
 try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await db.select()
        .from(user)
        .where(eq(user.email, email))

        if(existingUser.length > 0){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.insert(user).values({
            username,
            email,
            password_hash: hashedPassword
        }).returning();

        if (!newUser || newUser.length === 0) {
        return res.status(500).json({
            success: false,
            message: "Failed to create user"
        });
    }

    if (!newUser || newUser.length === 0 || !newUser[0]) {
        return res.status(500).json({
            success: false,
            message: "Failed to create user"
        });
    }

     const createdUser = newUser[0];

        const token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            process.env.JWT_SECRET || "defaultsecret",
            { expiresIn: "1h" }
        )
        res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: {
          id: createdUser.id,
          username: createdUser.username,
          email: createdUser.email
        },
        token
      }
    });
 } catch (error) {
     res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: (error as Error).message
    });
  }
 
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const users = await db.select()
      .from(user)
      .where(eq(user.email, email));

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const userData = users[0]!; // We know it exists from length check

    // Check password
    const isPasswordValid = await bcrypt.compare(password, userData.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: userData.id, email: userData.email },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: userData.id,
          username: userData.username,
          email: userData.email
        },
        token
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: (error as Error).message
    });
  }
};


