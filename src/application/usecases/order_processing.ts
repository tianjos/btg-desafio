import { Order } from "../../domain/entities/order.js";
import { Queue } from "../../domain/queues/queue.js";
import { OrderRepository } from "../../domain/repositories/order.js";
import { ThreadingPool } from "../../domain/threading_pools/pool.js";
import { UseCase } from "./use_case.js";

export class OrderProcessingUseCase implements UseCase<void, void> {
    constructor(
        private repo: OrderRepository,
        private queue: Queue<Order>, 
        private pool: ThreadingPool
    ) {}

    execute(params: void): void {
        let order = this.queue.dequeue()

        if (order) {
            this.pool.run(order)
                .then((dto) => {
                    const order = new Order(dto.clientId, dto.items, dto.status, dto.id)
                    this.repo.update(order)
                })
        }

        this.yieldToEventLoop()
    }

    /**
     * Avoid stack multiple setImmediate calls without clean it out.
     */
    private yieldToEventLoop() {
        new Promise((resolve) => resolve(setImmediate(() => this.execute())))
    }
}