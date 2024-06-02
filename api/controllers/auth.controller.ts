import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    try {

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPass });

        await newUser.save();

        res.status(201).json({
            message: "User Created Successfully!"
        });
    } catch (error) {

        next(error);
    }
};


export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, 'User Not Found!'));
        }

        const validPassword = await bcrypt.compare(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(401, 'Wrong Credentials!'));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        const { password: hashedPass, ...rest } = validUser.toObject();
        const expireDate = new Date(Date.now() + 3600000);

        res.cookie('access_token', token, { httpOnly: true, expires: expireDate }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
            const { password: hashedPassword, ...rest } = user.toObject();
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!);
            const { password: hashedPassword2, ...rest } = newUser.toObject();
            const expiryDate = new Date(Date.now() + 3600000);
            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};
