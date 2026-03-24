import { Request, Response, NextFunction } from "express";
interface AdminPayload {
    id: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            admin?: AdminPayload;
        }
    }
}
export declare const protect: (req: Request, res: Response, next: NextFunction) => void;
export {};
