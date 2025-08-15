import request from "supertest";
import { createServer } from "../../src/infra/web/server.js";
import { Queue } from "../../src/domain/queues/queue.js";
import { Order } from "../../src/application/interfaces/order.js";
import { MemoryQueue } from "../../src/infra/queue/memory_queue.js";
import { OrderRepository } from "../../src/domain/repositories/order.js";
import { Worker } from "../../src/infra/worker/worker.js";
import { ThreadingPool } from "../../src/domain/threading_pools/pool.js";
import { UseCase } from "../../src/application/usecases/use_case.js";
import { OrderProcessingUseCase } from "../../src/application/usecases/order_processing.js";
import { OrderRepoInMemory } from "../../src/infra/db/order.js";
import { CPU } from "../../src/infra/system/cpu.js";
import { PiscinaThreading } from "../../src/infra/thread/pool.js";
import { fakeOrderProcess } from "../../src/infra/worker/main.js";
import { OrderWorker } from "../../src/infra/worker/order_worker.js";


describe('Create Order', () => {
    let server: ReturnType<typeof createServer>;
    let queue: Queue<Order>;
    let repo: OrderRepository;
    let worker: Worker;
    let pool: ThreadingPool;
    let backgroundTask: UseCase<void, void>;

    beforeEach(async () => {
        repo = new OrderRepoInMemory()
        queue = new MemoryQueue([])
        worker = new OrderWorker(fakeOrderProcess)
        pool = new PiscinaThreading(worker, new CPU())
        backgroundTask = new OrderProcessingUseCase(repo, queue, pool)

        server = createServer(queue, repo, backgroundTask)
    })

    afterEach(async () => {
        (backgroundTask as any).stopLoop();
        await new Promise<void>((resolve) => server.close(() => resolve()));
        await pool.stop()
    })

    it('should create order', async () => {
        const payload = { clientId: '123', items: [] }
        const res = await request(server).post("/pedidos").send(payload).set("Content-Type", "application/json")

        expect(res.status).toBe(201)
    })
})