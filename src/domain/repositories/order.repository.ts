import { Order } from "../entities/order";

export interface OrderRepository {
    add(order: Order): void;
    findById(id: string): Order | undefined
    update(order: Order): void
}