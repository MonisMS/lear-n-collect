import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './config/db.js';
import questionRoute from './routes/questionRoute.js';
import progressRoute from './routes/progressRoute.js';
import authRoute from './routes/authRoute.js';
import { authenticateToken } from './middlewares/authMiddleware.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString() 
  });
});

app.get('/api/test-db', async (req, res) => {
  try {
    // Simple query to test connection
    const result = await db.execute('SELECT NOW() as current_time');
    res.json({ 
      message: 'Database connected successfully!', 
      data: result 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Database connection failed', 
      error: (error as Error).message 
    });
  }
});

app.use('/api/v1/questions', questionRoute);
app.use('/api/v1/progress', authenticateToken, progressRoute);
app.use('/api/v1/auth', authRoute);
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});