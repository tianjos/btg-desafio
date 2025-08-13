import { Order } from "../../domain/entities/order.js";
import { OrderRepository } from "../../domain/repositories/order.js";

export class OrderRepoInMemory implements OrderRepository {
    private data: Map<string, Order> = new Map();

    public add(order: Order) {
        const { id } = order.toJSON()

        this.data.set(id, order)
    }

    public findById(id: string) {
        const order = this.data.get(id)

        return order
    }

    public update(order: Order) {
        this.add(order)
    }
}