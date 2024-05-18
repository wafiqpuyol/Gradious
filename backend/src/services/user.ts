import { IJwtPayload, User } from "../types/user"
import { auth } from "../utils/common/auth"
import { userRepository } from "../repositories"


class UserService {
    async createUser({ email, firstName, lastName, password }: User) {
        try {
            const isUserExist = await userRepository.findByEmail(email)
            if (isUserExist) {
                return ("User already exist")
            }
            const hashedPassword = await auth.generateHash(password)

            await userRepository.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
            return;
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async authenticateUser({ email, password }: { email: string, password: string }) {
        try {
            const isUserExist = await userRepository.findByEmail(email);
            if (!isUserExist) {
                throw new Error("User does not exist with this email");
            }
            const isPasswordMatch = await auth.checkPassword(password, isUserExist.password)
            if (!isPasswordMatch) {
                throw new Error("Invalid email or password");
            }
            const payload: IJwtPayload = {
                id: isUserExist._id.toString(),
                email: isUserExist.email,
                userName: `${isUserExist.firstName} ${isUserExist.lastName}`
            }
            const token = auth.generateToken(payload);
            return { token, userId: payload.id };
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export const userService = new UserService()