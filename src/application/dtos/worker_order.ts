//import { OrderStatus } from "../../domain/entities/order.js"

export interface WorkerOrderDto {
    id: { value: string }
    clientId: string
    items: string[]
}