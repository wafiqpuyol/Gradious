import { StatusCodes } from "http-status-codes";

export const successResponse = {
    success: true,
    message: "Request fulfilled successfully",
    data: {},
    statusCode: StatusCodes.OK,
    origin: ""
}

export const errorResponse = {
    success: false,
    message: "Something went wrong",
    error: {},
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    origin: "",
    path: [] as (string | number)[]
}
