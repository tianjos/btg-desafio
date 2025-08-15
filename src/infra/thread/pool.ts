import Piscina from "piscina";
import { CPU } from "../system/cpu.js";
import { ThreadingPool } from "../../domain/threading_pools/pool.js";
import { WorkerFile } from "../worker/worker_file.js";


export class PiscinaThreading implements ThreadingPool {
    private piscina: Piscina

    constructor(private worker: WorkerFile, private cpu: CPU) {
        this.piscina = new Piscina({
            minThreads: this.cpu.cores(),
            maxThreads: this.cpu.cores(),
            filename: this.worker.asPath(),
        })
    }

    run(task: any): Promise<any> {
        return this.piscina.run(task)
    }

    stop(): Promise<void> {
        return this.piscina.destroy()
    }
}
