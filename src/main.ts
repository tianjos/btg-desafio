import { OrderProcessingUseCase } from "./application/usecases/order_processing.js";
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
    const worker = new OrderWorker(orderProcess)
    const pool = new PiscinaThreading(worker, new CPU())
    const backgroundTask = new OrderProcessingUseCase(repo, queue, pool)
    
    createServer(queue, repo, backgroundTask)
}

main()

