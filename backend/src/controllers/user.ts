import { Request, Response } from "express";
import { userService } from "../services"
import { successResponse, errorResponse } from "../utils/common/response"
import { StatusCodes } from 'http-status-codes';


class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const result = await userService.createUser(req.body)
            successResponse.message = result || "User created successfully";
            successResponse.statusCode = result ? StatusCodes.BAD_REQUEST : StatusCodes.CREATED;
            return res.status(successResponse.statusCode).json(successResponse)
        } catch (error: any) {
            if (error.message.includes("Mongo")) {
                errorResponse.message = error.message || "Something went wrong while querying database."
            } else {
                successResponse.message = "Something went wrong."
            }
            successResponse.origin = "createUser() controller method error"
            errorResponse.error = { ...error }
            return res.status(successResponse.statusCode).json(errorResponse)
        }
    }
}

export const userController = new UserController();