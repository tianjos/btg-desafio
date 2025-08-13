import Piscina from "piscina";
import { CPU } from "../system/cpu.js";
import { ThreadingPool } from "../../domain/threading_pools/pool.js";
import { Worker } from "../worker/worker.js";


export class PiscinaThreading implements ThreadingPool {
    private piscina: Piscina

    constructor(private worker: Worker, private cpu: CPU) {
        this.piscina = new Piscina({
            minThreads: this.cpu.cores(),
            maxThreads: this.cpu.cores(),
            filename: this.worker.location()
        })
    }

    run(task: any): Promise<any> {
        return this.piscina.run(task)
    }
}
