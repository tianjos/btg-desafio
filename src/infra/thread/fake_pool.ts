import { WorkerOrderDto } from "../../application/dtos/worker_order.js";
import { Order } from "../../application/interfaces/order.js";
import { ThreadingPool } from "../../domain/threading_pools/pool.js";
import { CPU } from "../system/cpu.js";
import { WorkerFile } from "../worker/worker_file.js";

export class FakePool implements ThreadingPool {
    constructor(private worker: WorkerFile, private cpu: CPU) {}

    run(order: Order): Promise<WorkerOrderDto> {
        return new Promise(resolve => {
            resolve({
                clientId: (order as any)['clientId'], 
                id: { value: order.oid().asText() }, 
                items: (order as any)['items']
            }) as any as WorkerOrderDto
        })

    }
    stop(): Promise<void> {
        return Promise.resolve()
    }

}