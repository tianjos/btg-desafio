import { Request, Response } from 'express';
import { HttpController } from './http_controller.js';
import { CreateOrderUseCase } from '../../../application/usecases/create_order.js';

export class CreateOrderController implements HttpController {
  constructor(private usecase: CreateOrderUseCase) {}
  handle(req: Request, res: Response) {
    const order = this.usecase.execute(req.body)

    console.log('order created', order.toJSON())
    if (!order.valid()) {
      return res.status(422).json({ err: 'pedido mal formatado'})
    }
  
    return res.status(201).json(order)
  }
}