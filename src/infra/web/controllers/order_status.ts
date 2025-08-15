import { Request, Response } from "express";
import { HttpController } from "./http_controller.js";
import { OrderStatusUseCase } from "../../../application/usecases/order_status.js";
import { Id } from "../../../domain/entities/id.js";

export class OrderStatusController implements HttpController {
    constructor(private usecase: OrderStatusUseCase) {}

    handle(req: Request, res: Response) {
        const id = new Id(req.params.id)
        const order = this.usecase.execute({ id })
        
        try {
            return res.json(order.toJSON())
        } catch (error) {
            return res.status(404).json({ err: "pedido não encontrado" })
        }
    }
}