import { randomUUID } from "node:crypto";

export type OrderStatus = 'pending' | 'processed'

export class Order {
    private id: string;

    private clientId: string;

    private status: OrderStatus;
    
    private items: string[];

    constructor(clientId: string, items: string[], status?: OrderStatus, id?: string);
    constructor(clientId: string, items: string[], status: OrderStatus, id?: string);
    constructor(clientId: string, items: string[], status: OrderStatus, id: string) {
        this.clientId = clientId;
        this.items = items;
        this.status = status || 'pending';
        this.id = id || randomUUID();
    }


    public processed() {
        return this.status === 'processed';
    }

    toJSON() {
        return {
            id: this.id,
            clientId: this.clientId,
            status: this.status,
            items: this.items,
        }
    }

    toString() {
        return JSON.stringify(this.toJSON())
    }
}
