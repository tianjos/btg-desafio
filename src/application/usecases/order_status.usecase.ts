import { OrderRepository } from '../../domain/repositories/order.repository.js';
import { OrderStatusDto } from '../dtos/order_status.dto.js';
import { UseCase } from './use_case.interface.js';

export class OrderStatusUseCase implements UseCase<{id: string}, OrderStatusDto | undefined> {
    constructor(private repo: OrderRepository) {}

    execute(params: {id: string}): OrderStatusDto | undefined {
        const order = this.repo.findById(params.id)

        if (order) {
            return { status: order.toJSON()['status'] }
        }
  }
}