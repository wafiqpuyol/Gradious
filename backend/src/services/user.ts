import { User } from "../types/user"
import { genSalt, hash } from "bcryptjs"
import { userRepository } from "../repositories"


class UserService {
    async createUser({ email, firstName, lastName, password }: User) {
        try {
            const isUserExist = await userRepository.findByEmail(email)
            if (isUserExist) {
                return ("User already exist")
            }
            const hashedPassword = await new Promise((resolve, reject) => {
                genSalt(12, (err, salt) => {
                    if (err) {
                        reject(err.message)
                    }
                    hash(password, salt, function (err, hash) {
                        if (err) {
                            reject(err.message)
                        }
                        resolve(hash);
                    });
                })
            }) as string

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