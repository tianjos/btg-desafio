import { Request, Response } from "express";
import { HttpController } from "./HttpController";
import { OrderStatusUseCase } from "../../../application/usecases/order_status.usecase";

export class OrderStatusController implements HttpController {
    constructor(private usecase: OrderStatusUseCase) {}

    handle(req: Request, res: Response) {
        const status = this.usecase.execute(req.params as any)
        
        if (!status) {
            return res.status(404).json({ err: 'Pedido não encontrado' })
        }

        return res.json(status)
    }
}