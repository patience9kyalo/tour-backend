import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Payload } from "../Models/authModels";

dotenv.config();

export interface ExtendedRequest extends Request {
    info?: Payload;
}

export function verifyToken(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'Forbidden !!' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET as string) as Payload;

        if (decodedToken.Role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

    
        req.info = decodedToken;

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    next();
}

export function verifyUserToken(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'Forbidden !!' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET as string) as Payload;

        if (decodedToken.Id !== 'user.Id') {
            return res.status(403).json({ message: 'Access denied.' });
        }

    
        req.info = decodedToken;

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}