import { Id } from "./id";
import { Order } from "../../application/interfaces/order";

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