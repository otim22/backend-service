import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { middlewares } from "../middlewares";
import Service from "../services";

const { responses, messages, codes } = middlewares;
const { User } = Service;

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken: string = req.cookies.access_token;
    const refreshToken: string = req.cookies.refresh_token;
    
    if (!accessToken || !refreshToken) {
        return responses.error(codes.unauthorizedError(), messages.unauthorizedMessage(), res);
    }
    const payload: any = verify(accessToken, "access_secret");

    if (!payload) {
        return responses.error(codes.unauthorizedError(), messages.unauthorizedMessage(), res);
    }
    
    const user = await User.authenticatedUser(payload);

    if (!user) {
        return responses.error(codes.unauthorizedError(), messages.unauthorizedMessage(), res);
    }
    
    next();
}