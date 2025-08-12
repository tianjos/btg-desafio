import { OrderProcessingUseCase } from "./application/usecases/order_prcoessing.usecase";
import { OrderRepoInMemory } from "./infra/db/order.repo";
import { InMemoryQueue } from "./infra/queue/inMemoryQueue";
import { CPU } from "./infra/system/cpu";
import { PiscinaThreading } from "./infra/thread/pool";
import { createServer } from "./infra/web/server";
import { workerPath } from "./infra/worker/main";

const main = () => {
    const repo = new OrderRepoInMemory()
    const queue = new InMemoryQueue([])
    const pool = new PiscinaThreading(workerPath, new CPU())
    const backgroundTask = new OrderProcessingUseCase(repo, queue, pool)
    
    createServer(queue, pool, repo, backgroundTask)
}

main()

