import { Request, Response } from 'express';
import { HttpController } from './HttpController.js';
import { CreateOrderUseCase } from '../../../application/usecases/create_order.usecase.js';

export class CreateOrderController implements HttpController {
  constructor(private usecase: CreateOrderUseCase) {}
  handle(req: Request, res: Response) {
    const order = this.usecase.execute(req.body)
  
    return res.status(201).json(order)
  }
}