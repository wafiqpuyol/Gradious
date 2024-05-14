import { Model } from "mongoose"
import { User } from "../types/user"

export class CrudRepository {
    constructor(private model: Model<any>) { }

    async create(payload: User) {
        try {
            await this.model.create(payload)
        } catch (error: any) {
            throw new Error(error)
        }
    }
}