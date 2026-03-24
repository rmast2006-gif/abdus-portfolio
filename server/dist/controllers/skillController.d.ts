import { Request, Response } from "express";
export declare const getSkills: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createSkill: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateSkill: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteSkill: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
