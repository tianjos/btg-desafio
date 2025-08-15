import { Id } from "../../domain/entities/id.js";
import { NullOrder } from "../../domain/entities/null_order.js";
import { Order } from "../../application/interfaces/order.js";
import { OrderRepository } from "../../domain/repositories/order.js";

export class OrderRepoInMemory implements OrderRepository {
    private data: Map<string, Order> = new Map();

    public add(order: Order) {
        this.data.set(order.oid().toString(), order)
    }

    public findById(id: Id) {
        const order = this.data.get(id.toString())
        console.log('all', this.data)
        console.log('id', id)
        console.log('order', order)
        return order || new NullOrder()
    }

    public update(order: Order) {
        this.add(order)
    }
}