import { Order } from "../interfaces/order.js";
import { Queue } from "../../domain/queues/queue.js";
import { OrderRepository } from "../../domain/repositories/order.js";
import { ThreadingPool } from "../../domain/threading_pools/pool.js";
import { UseCase } from "./use_case.js";
import { ProcessedOrder } from "../../domain/entities/processed_order.js";
import { Id } from "../../domain/entities/id.js";

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
                    console.log('before process', dto)
                    const order = new ProcessedOrder(dto.clientId, dto.items, new Id(dto.id.value))
                    console.log('after process', order)
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