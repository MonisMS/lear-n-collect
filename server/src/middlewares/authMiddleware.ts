import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request type to include user info
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
      };
    }
  }
}


export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401).json({
            success: false,
            message: 'No token provided',
        });
    }   
jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret', (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid or expired token'
        });
      }       

      // If token is valid, attach user information to request
      req.user = {
        userId: decoded.userId,
        email: decoded.email
      };
      next();
    });
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    res.sendStatus(500);
  }
}