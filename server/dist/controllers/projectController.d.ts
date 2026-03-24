import { Request, Response } from "express";
export declare const getProjects: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
