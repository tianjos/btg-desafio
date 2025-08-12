import { OrderStatus } from "../../domain/entities/order"

export interface WorkerOrderDto {
    id: string
    clientId: string
    status: OrderStatus,
    items: string
}