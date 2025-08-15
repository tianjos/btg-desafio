import { Id } from "./id.js";
import { Order } from "../../application/interfaces/order.js";

export class NullOrder implements Order {
    processed(): Order {
        return this;
    }
    pending(): Order {
        return this;
    }

    oid(): Id {
        return new Id()
    }

}