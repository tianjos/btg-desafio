import { randomUUID } from "node:crypto";
import { Order } from "../../application/interfaces/order";
import { ProcessedOrder } from "./processed_order";
import { JsonSerializer } from "../../application/interfaces/json_serializable";
import { OrderJsonable } from "../../application/dtos/order_jsonable";
import { Id } from "./id";

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