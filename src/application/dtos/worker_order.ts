import { OrderStatus } from "../../domain/entities/order.js"

export interface WorkerOrderDto {
    id: string
    clientId: string
    status: OrderStatus,
    items: string
}