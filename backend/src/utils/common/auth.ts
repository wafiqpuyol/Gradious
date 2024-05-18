import { genSalt, hash, compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { IJwtPayload } from "../../types/user"

class Auth {
    async generateHash(rawPassword: string): Promise<string> {
        return await new Promise((resolve, reject) => {
            genSalt(12, (err, salt) => {
                if (err) {
                    reject(err.message)
                }
                hash(rawPassword, salt, function (err, hash) {
                    if (err) {
                        reject(err.message)
                    }
                    resolve(hash);
                });
            })
        }) as string
    }

    async checkPassword(rawPassword: string, hashedPassword: string): Promise<boolean> {
        return await compare(rawPassword, hashedPassword);
    }

    generateToken(payload: IJwtPayload): string {
        return sign({
            data: payload
        }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    }
}

export const auth = new Auth();