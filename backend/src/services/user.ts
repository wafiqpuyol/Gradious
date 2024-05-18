import { User } from "../types/user"
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
}

export const userService = new UserService()