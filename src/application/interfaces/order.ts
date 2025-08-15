import { Id } from "../../domain/entities/id.js"

export interface Order {
    oid(): Id
    processed(): Order
    pending(): Order
}
