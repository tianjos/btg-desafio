import Piscina from "piscina";
import { CPU } from "../system/cpu";
import { resolve } from "node:path";
import { ThreadingPool } from "../../domain/threading_pools/pool";


export class PiscinaThreading implements ThreadingPool {
    private piscina: Piscina

    constructor(private workerPath: string, private cpu: CPU) {
        this.piscina = new Piscina({
            minThreads: this.cpu.cores(),
            maxThreads: this.cpu.cores(),
            filename: resolve(this.workerPath, 'order_process.worker.js')
        })
    }

    run(task: any): Promise<any> {
        return this.piscina.run(task)
    }
}

export const createPool = (workerPath: string, cpu: CPU) => {
    return new Piscina({ 
        minThreads: cpu.cores(),
        maxThreads: cpu.cores(),
        filename: resolve(workerPath, 'order_process.worker.js')
    })
} 
