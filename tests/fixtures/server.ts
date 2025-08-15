import { OrderProcessingUseCase } from "../../src/application/usecases/order_processing"
import { OrderRepoInMemory } from "../../src/infra/db/order"
import { MemoryQueue } from "../../src/infra/queue/memory_queue"
import { CPU } from "../../src/infra/system/cpu"
import { PiscinaThreading } from "../../src/infra/thread/pool"
import { createServer } from "../../src/infra/web/server"
import { fakeOrderProcess } from "../../src/infra/worker/main"
import { OrderWorker } from "../../src/infra/worker/order_worker"

export function setupServer() {
    const repo = new OrderRepoInMemory()
    const queue = new MemoryQueue([])
    const worker = new OrderWorker(fakeOrderProcess)
    const pool = new PiscinaThreading(worker, new CPU())
    const backgroundTask = new OrderProcessingUseCase(repo, queue, pool)
    
    return createServer(queue, repo, backgroundTask)
}