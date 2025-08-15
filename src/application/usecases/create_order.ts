import { Id } from '../../domain/entities/id.js';
import { Order } from '../interfaces/order.js';
import { PendingOrder } from '../../domain/entities/pending_order.js';
import { Queue } from '../../domain/queues/queue.js';
import { OrderRepository } from '../../domain/repositories/order.js';
import { OrderDto } from '../dtos/order.js';
import { UseCase } from './use_case.js';

export class CreateOrderUseCase implements UseCase<OrderDto, Order> {
  constructor(private repo: OrderRepository, private queue: Queue<Order>) {} 

  execute(params: OrderDto): Order {
    const order = new PendingOrder(params.clientId, params.items, new Id())
    
    this.repo.add(order)

    this.queue.enqueue(order)

    return order
  }
}