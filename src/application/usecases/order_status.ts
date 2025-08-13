import { OrderRepository } from '../../domain/repositories/order.js';
import { OrderStatusDto } from '../dtos/order_status.js';
import { UseCase } from './use_case.js';

export class OrderStatusUseCase implements UseCase<{id: string}, OrderStatusDto | undefined> {
    constructor(private repo: OrderRepository) {}

    execute(params: {id: string}): OrderStatusDto | undefined {
        const order = this.repo.findById(params.id)

        if (order) {
            return { status: order.toJSON()['status'] }
        }
  }
}