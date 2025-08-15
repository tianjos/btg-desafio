import { Order } from "../../application/interfaces/order.js";
import { ProcessedOrder } from "./processed_order.js";
import { JsonSerializer } from "../../application/interfaces/json_serializable.js";
import { OrderJsonable } from "../../application/dtos/order_jsonable.js";
import { Id } from "./id.js";

export class PendingOrder implements Order, JsonSerializer<OrderJsonable> {
    constructor(private clientId: string, private items: string[], private id: Id) {}

    pending(): Order {
        throw new Error("already pending")
    }

    processed(): Order {
        return new ProcessedOrder(this.clientId, this.items, this.id) 
    }

    oid(): Id {
        return this.id
    }

    toJSON(): OrderJsonable {
        return { clientId: this.clientId, items: this.items, id: this.id.toString() };
    }
}