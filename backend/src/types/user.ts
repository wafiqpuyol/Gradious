export interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IJwtPayload {
    id: string;
    email: string;
    userName: string;
}