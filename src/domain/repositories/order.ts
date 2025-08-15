import { Id } from "../entities/id.js";
import { Order } from "../../application/interfaces/order.js";

export interface OrderRepository {
    add(order: Order): void;
    findById(id: Id): Order
    update(order: Order): void
}