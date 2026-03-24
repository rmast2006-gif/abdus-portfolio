import { Request, Response } from "express";
export declare const postContact: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getContacts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteContact: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
