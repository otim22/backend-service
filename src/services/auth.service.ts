import User from "../database/entities/user";
import connectDB from "../config/ormconfig";
import bcryptjs from 'bcryptjs';

class AuthService {
    register = async (data: object): Promise<any | null> => {
        const user = await connectDB.getRepository(User).save(data)
        return user;
    };

    login = async (email: string, password: string): Promise<any | null> => {
        const user = await connectDB.getRepository(User).findOne({
            where: { email }
        });

        if (!user) {
            return null
        }

        if (await bcryptjs.compare(password, user.password)) {
            return null
        }

        return user
    };

    authenticatedUser = async (payload: any): Promise<any | null> => {
        const user = await connectDB.getRepository(User).findOne({
            where: { id: payload.id }
        });

        if (!user) {
            return null
        }

        return user;
    };
}

export default AuthService;