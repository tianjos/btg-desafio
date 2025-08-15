import { Order } from "../../application/interfaces/order";
import { JsonSerializer } from "../../application/interfaces/json_serializable";
import { OrderJsonable } from "../../application/dtos/order_jsonable";
import { Id } from "./id";

export class ProcessedOrder implements Order, JsonSerializer<OrderJsonable> {
    constructor(private clientId: string, private items: string[], private id: Id) {}

    pending(): Order {
        throw new Error('already processed')
    }

    processed(): Order {
        throw new Error('already processed')
    }
    
    oid(): Id {
        return this.id;
    }

    toJSON(): OrderJsonable {
        return { clientId: this.clientId, items: this.items, id: this.id.toString() }
    }
}