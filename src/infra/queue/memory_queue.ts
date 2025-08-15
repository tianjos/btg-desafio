import { Order } from "../../application/interfaces/order.js";
import { Queue } from "../../domain/queues/queue.js";

export class MemoryQueue implements Queue<Order> {
    constructor(private queue: Order[]) {}

    public enqueue(order: Order) {
        this.queue.push(order)
    }

    public dequeue() {
        return this.queue.shift()
    }

    public empty() {
        return !!this.queue.length
    }
}