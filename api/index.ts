import express, {NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
dotenv.config();

mongoose.connect(`${process.env.DB}`).then(() => {
     console.log('DB Connected!');
}).catch(() => {
     console.log('DB Disconnected!');
});

const app = express();
app.use(express.json());

app.listen(3000, ()=> {
     console.log('Server Started!')
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

interface CustomError extends Error {
    statusCode?: number;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
