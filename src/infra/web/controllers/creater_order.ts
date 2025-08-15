import { Request, Response } from 'express';
import { HttpController } from './http_controller.js';
import { CreateOrderUseCase } from '../../../application/usecases/create_order.js';
import { OrderValidator } from '../../../domain/entities/order_validator.js';

export class CreateOrderController implements HttpController {
  constructor(private usecase: CreateOrderUseCase) {}

  handle(req: Request, res: Response) {
    const validator = new OrderValidator(req.body.clientId, req.body.items)
    if (!validator.valid()) {
      return res.status(422).json({ err: "pedido mal formatado" })
    }

    const order = this.usecase.execute(validator.toJSON())
  
    return res.status(201).json({ id: order.oid().toString() })
  }
}