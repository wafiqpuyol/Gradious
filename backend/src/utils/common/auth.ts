import { genSalt, hash, compare } from "bcryptjs"
import { sign, verify, JwtPayload } from "jsonwebtoken"
import { IJwtPayload } from "../../types"

declare module 'jsonwebtoken' {
    export interface JwtPayload extends IJwtPayload { }
}

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

    generateToken(payload: IJwtPayload, expiration: string): string {
        return sign({
            data: payload
        }, process.env.JWT_SECRET as string, { expiresIn: expiration });
    }

    async validateToken(accessToken: string) {
        try {
            const decodedPayload = await (new Promise((resolve, reject) => {
                verify(accessToken, process.env.JWT_SECRET as string, (err, decoded) => {
                    console.log(err);
                    if (err) {
                        reject(err.message);
                    }
                    resolve(decoded);
                })
            }));
            console.log(decodedPayload);
            if (!decodedPayload) {
                throw new Error("Invalid access token");
            }
            return decodedPayload
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
}

export const auth = new Auth();