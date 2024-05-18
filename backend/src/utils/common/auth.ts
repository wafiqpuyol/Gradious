import { genSalt, hash } from "bcryptjs"

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
}

export const auth = new Auth();