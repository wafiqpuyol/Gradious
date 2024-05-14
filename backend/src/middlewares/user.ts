import { NextFunction, Request, Response } from "express";
import { signUpSchema } from "../schema/signup"
import { StatusCodes } from 'http-status-codes';
import { errorResponse } from "../utils/response"

class UserMiddleware {
    validateSignupData = (req: Request, res: Response, next: NextFunction) => {
        const registrationData = signUpSchema.safeParse(req.body)
        if (!registrationData.success) {
            errorResponse.message = registrationData.error.message;
            errorResponse.statusCode = StatusCodes.BAD_REQUEST;
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
        next()
    }
}

export const userMiddleware = new UserMiddleware()