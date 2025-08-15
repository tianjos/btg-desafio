import { Id } from '../../domain/entities/id.js';
import { OrderMessage } from '../../domain/entities/order_message.js';
import { OrderRepository } from '../../domain/repositories/order.js';
import { UseCase } from './use_case.js';

export class OrderStatusUseCase implements UseCase<{id: Id}, OrderMessage> {
    constructor(private repo: OrderRepository) {}

    execute(params: { id: Id }): OrderMessage {
        const order = this.repo.findById(params.id)

        return new OrderMessage(order)
  }
}