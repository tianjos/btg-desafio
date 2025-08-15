import { Order } from "../../application/interfaces/order.js";
import { Id } from "../../domain/entities/id.js";
import { ProcessedOrder } from "../../domain/entities/processed_order.js";
import { Queue } from "../../domain/queues/queue.js";
import { OrderRepository } from "../../domain/repositories/order.js";
import { ThreadingPool } from "../../domain/threading_pools/pool.js";
import { Worker } from "./worker.js";

export class OrderWorker implements Worker {
    private nextHandle?: NodeJS.Immediate;
    private running = false;
    
    constructor(
        private queue: Queue<Order>, 
        private pool: ThreadingPool,
        private repo: OrderRepository
    ) {}


    start() {
        if (this.running) return;
        this.running = true;
        this.scheduleNext();
    }

    stop() {
        this.running = false;
        if (this.nextHandle) {
        clearImmediate(this.nextHandle);
        this.nextHandle = undefined;
        }
    }

    private scheduleNext() {
        this.nextHandle = setImmediate(() => this.run());
    }

    private async run() {
        if (!this.running) return;

        const job = this.queue.dequeue();
        if (job) {
            try {
                const dto = await this.pool.run(job);
                const order = new ProcessedOrder(dto.clientId, dto.items, new Id(dto.id.value))
                this.repo.update(order)
            } catch (err) {
                console.error('Task failed:', err);
            }
        }
        
        if (this.running) this.scheduleNext();
    }
}