import { Order } from '../../domain/entities/order.js';
import { Queue } from '../../domain/queues/queue.js';
import { OrderRepository } from '../../domain/repositories/order.js';
import { OrderDto } from '../dtos/order.js';
import { UseCase } from './use_case.js';

export class CreateOrderUseCase implements UseCase<OrderDto, Order> {
  constructor(private repo: OrderRepository, private queue: Queue<Order>) {} 

  execute(params: OrderDto): Order {
    const order = new Order(params.clientId, params.items)
    
    this.repo.add(order)

    this.queue.enqueue(order)

    return order
  }
}