import User from "../database/entities/user";
import connectDB from "../config/ormconfig";
import bcrypt from 'bcryptjs';

class AuthService {
    register = async (data: object): Promise<any | null> => {
        const user = await connectDB.getRepository(User).save(data)
        return user;
    };

    login = async (email: string, password: string): Promise<any | null> => {
        const user = await connectDB.getRepository(User).findOne({ where: { email } });
        if (!user) return;

        let isEncryptedPassWord = this.comparePassword(password, user.password);
        if (!isEncryptedPassWord) return;

        return user;
    };

    comparePassword = (password: string, hashedPassword: string) => {
        return bcrypt.compareSync(password, hashedPassword);
    }

    authenticatedUser = async (payload: any): Promise<any | null> => {
        const user = await connectDB.getRepository(User).findOne({
            where: { id: payload.id }
        });

        if (!user) return;

        return user;
    };
}

export default AuthService;