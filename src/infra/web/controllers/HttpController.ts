import { Request, Response } from "express";

export interface HttpController {
    handle(req: Request, res: Response): any
}