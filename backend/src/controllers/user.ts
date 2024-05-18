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

    async authenticateUser(req: Request, res: Response) {
        try {
            const result = await userService.authenticateUser(req.body);
            successResponse.message = "Login successful";
            successResponse.statusCode = StatusCodes.OK;
            return res.
                cookie("auth_token", result, { httpOnly: true })
                .status(successResponse.statusCode)
                .json(successResponse)
        } catch (error: any) {
            errorResponse.message = error.message || "Something went wrong while authenticating user."
            errorResponse.origin = "authenticateUser() controller method error"
            errorResponse.statusCode = error.message.includes("Password") || error.message.includes("User") ? StatusCodes.UNAUTHORIZED : StatusCodes.INTERNAL_SERVER_ERROR;
            return res
                .status(errorResponse.statusCode)
                .json(errorResponse)
        }
    }
}

export const userController = new UserController();