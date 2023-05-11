import { Request, Response } from "express";
import { middlewares } from "../middlewares";
import Service from "../services";
import { sign, verify } from 'jsonwebtoken';

const { responses, messages, codes } = middlewares;
const { User } = Service;

class UserController {
    register = async (req: Request, res: Response) => {
        const {
            name,
            email,
            password
        }: {
            name: string;
            email: string;
            password: string;
        } = req.body;

        if(!name || !email || !password){
            return responses.error(codes.unauthorizedError(), messages.loginMessage(), res);
        }

        const response = await User.register({
            name,
            email,
            password
        });
      
        if (!response) {
            return responses.error(codes.conflict(), messages.registerMessage(), res);
        }
      
        return responses.success(
            codes.created(),
            messages.created(),
            { name, email },
            res
        );
    }

    login = async (req: Request, res: Response) => {
        const { email, password  }:  { email: string; password: string } = req.body;

        if(!email || !password){
            return responses.error(codes.unauthorizedError(), messages.loginMessage(), res);
        }

        const user = await User.login(email, password);
    
        if (!user) {
          return responses.error(codes.unauthorizedError(), messages.loginMessage(), res);
        }

        const accessToken = sign({ id: user.id
        }, "access_secret", { expiresIn: 60 * 60 });

        const refreshToken = sign({id: user.id
        }, "refresh_secret", { expiresIn: 24 * 60 * 60 })

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //equivalent to 1 day
        });

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 //equivalent to 7 days
        })
    
        return responses.success(
            codes.ok(),
            messages.success(),
            { email, accessToken },
            res
        );
    };

    authenticatedUser = async (req: Request, res: Response) => {
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
        
        const { name, email } = user;

        return responses.success(
            codes.ok(),
            messages.success(),
            { name, email },
            res
        );
    }

    refreshPage = async (req: Request, res: Response) => {
        const refreshToken: string = req.cookies.refresh_token;
        const payload: any = verify(refreshToken, "refresh_secret");

        if (!payload) {
            return responses.error(codes.unauthorizedError(), messages.unauthorizedMessage(), res);
        }

        const accessToken = sign({
            id: payload.id,
        }, "access_secret", { expiresIn: 60 * 60 })

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //equivalent to 1 day
        });

        return responses.success(
            codes.ok(),
            messages.success(),
            { accessToken },
            res
        );
    }

    logout = async (req: Request, res: Response) => {
        res.cookie('access_token', '', { maxAge: 0 });
        res.cookie('refresh_token', '', { maxAge: 0 });

        return responses.success(
            codes.ok(),
            messages.success(),
            {},
            res
        );
    }
}

export default UserController;