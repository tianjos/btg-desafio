import { OrderStatusDto } from "../../application/dtos/order_status.js";
import { JsonSerializer } from "../../application/interfaces/json_serializable.js";
import { Order } from "../../application/interfaces/order.js";
import { PendingOrder } from "./pending_order.js";
import { ProcessedOrder } from "./processed_order.js";

export class OrderMessage implements JsonSerializer<OrderStatusDto> {
    private status() {
        if (this.order instanceof PendingOrder) return 'pending';
        if (this.order instanceof ProcessedOrder) return 'processed';
        
        throw new Error('unknown order type')
    }
    constructor(private order: Order) {}

    toJSON(): OrderStatusDto {
        return { status: this.status() }
    }
    

}