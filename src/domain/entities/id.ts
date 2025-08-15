import { randomUUID } from "crypto"
import { Printable } from "../../application/interfaces/printable";

export class Id implements Printable {
    private value: string

    constructor(value?: string) {
        this.value = value || randomUUID();
    }

    toString() {
        return this.value;
    }

    asText(): string {
        return this.value;
    }
}