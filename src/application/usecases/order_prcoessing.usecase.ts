import { Order } from "../../domain/entities/order";
import { Queue } from "../../domain/queues/queue";
import { OrderRepository } from "../../domain/repositories/order.repository";
import { ThreadingPool } from "../../domain/threading_pools/pool";
import { UseCase } from "./use_case.interface";

export class OrderProcessingUseCase implements UseCase<void, void> {
    constructor(
        private repo: OrderRepository,
        private queue: Queue<Order>, 
        private pool: ThreadingPool
    ) {}
    execute(params: void): void {
        let order = this.queue.dequeue()

        if (order) {
            this.pool.run(order).then((dto) => {
                const order = new Order(dto.clientId, dto.items, dto.status, dto.id)
                this.repo.update(order)
            })
        }

        setImmediate(() => this.execute())
    }
}