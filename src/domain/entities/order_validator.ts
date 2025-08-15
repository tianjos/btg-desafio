import { OrderDto } from "../../application/dtos/order.js";
import { JsonSerializer } from "../../application/interfaces/json_serializable.js";

export class OrderValidator implements JsonSerializer<OrderDto> {
    constructor(private clientId: string, private items: string[]) {}

    valid() {
        return (
            typeof this.clientId === 'string' &&
            Array.isArray(this.items)
        )
    }

    toJSON(): OrderDto {
        return { clientId: this.clientId, items: this.items }
    }
}