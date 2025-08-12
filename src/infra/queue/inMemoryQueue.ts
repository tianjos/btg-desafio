import { Order } from "../../domain/entities/order";
import { Queue } from "../../domain/queues/queue";

export class InMemoryQueue implements Queue<Order> {
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