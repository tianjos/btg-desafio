import { OrderRepoInMemory } from "./infra/db/order.js";
import { MemoryQueue } from "./infra/queue/memory_queue.js";
import { CPU } from "./infra/system/cpu.js";
import { PiscinaThreading } from "./infra/thread/pool.js";
import { createServer } from "./infra/web/server.js";
import { orderProcess } from "./infra/worker/main.js";
import { OrderWorker } from "./infra/worker/order_worker.js";

const main = () => {
    const repo = new OrderRepoInMemory()
    const queue = new MemoryQueue([])
    const pool = new PiscinaThreading(orderProcess, new CPU())
    const worker = new OrderWorker(queue, pool, repo)
    
    const {cleanUp } = createServer(queue, repo, worker)

    process.on('SIGINT', () => {
        console.log('server aborted')
        cleanUp()
    })
}

main()
