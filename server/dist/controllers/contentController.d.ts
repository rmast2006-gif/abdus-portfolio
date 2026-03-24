import { Request, Response } from "express";
export declare const getPageContent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateContent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
