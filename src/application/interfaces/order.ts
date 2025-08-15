//import { randomUUID } from "node:crypto";

import { Id } from "../../domain/entities/id"

export interface Order {
    oid(): Id
    processed(): Order
    pending(): Order
}

//export type OrderStatus = 'pending' | 'processed'

//export class Order {
//    private id: string;

//    private clientId: string;

//    private status: OrderStatus;
    
//    private items: string[];

//    constructor(clientId: string, items: string[], status?: OrderStatus, id?: string);
//    constructor(clientId: string, items: string[], status: OrderStatus, id?: string);
//    constructor(clientId: string, items: string[], status: OrderStatus, id: string) {
//        this.clientId = clientId;
//        this.items = items;
//        this.status = status || 'pending';
//        this.id = id || randomUUID();
//    }
//
//
//    public processed() {
//        return this.status === 'processed';
//    }
//
//    valid() {
//        return (
//            typeof this.clientId === 'string' &&
//            Array.isArray(this.items)
//        )
//    }
//
//    toJSON() {
//        return {
//            id: this.id,
//            clientId: this.clientId,
//            status: this.status,
//            items: this.items,
//        }
//    }
//
//    toString() {
//        return JSON.stringify(this.toJSON())
//    }
//}
