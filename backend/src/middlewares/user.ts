import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { loginSchema } from "../schema/login";
import { signUpSchema } from "../schema/signup";
import { errorResponse } from "../utils/common/response";

class UserMiddleware {
    validateSignupData = (req: Request, res: Response, next: NextFunction) => {
        const registrationData = signUpSchema.safeParse(req.body)
        if (!registrationData.success) {
            errorResponse.message = registrationData.error.errors[0].message;
            errorResponse.path = registrationData.error.errors[0].path;
            errorResponse.statusCode = StatusCodes.BAD_REQUEST;
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
        next()
    }

    validateSignInData(req: Request, res: Response, next: NextFunction) {
        const loginData = loginSchema.safeParse(req.body)
        if (!loginData.success) {
            errorResponse.message = loginData.error.errors[0].message;
            errorResponse.path = loginData.error.errors[0].path;
            errorResponse.statusCode = StatusCodes.UNAUTHORIZED;
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
        next()
    }
}

export const userMiddleware = new UserMiddleware()