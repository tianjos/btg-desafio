import request from "supertest";
import { createServer } from "../../src/infra/web/server.js";
import { Queue } from "../../src/domain/queues/queue.js";
import { Order } from "../../src/application/interfaces/order.js";
import { MemoryQueue } from "../../src/infra/queue/memory_queue.js";
import { OrderRepository } from "../../src/domain/repositories/order.js";
import { Worker } from "../../src/infra/worker/worker.js";
import { ThreadingPool } from "../../src/domain/threading_pools/pool.js";
import { OrderRepoInMemory } from "../../src/infra/db/order.js";
import { CPU } from "../../src/infra/system/cpu.js";
import { FakePool } from "../../src/infra/thread/fake_pool.js";
import { fakeOrderProcess } from "../../src/infra/worker/main.js";
import { OrderWorker } from "../../src/infra/worker/order_worker.js";


describe('Order', () => {
    let queue: Queue<Order>;
    let repo: OrderRepository;
    let worker: Worker;
    let pool: ThreadingPool;
    let server: ReturnType<typeof createServer>;

    beforeEach(async () => {
        repo = new OrderRepoInMemory()
        queue = new MemoryQueue([])
        pool = new  FakePool(fakeOrderProcess, new CPU())
        worker = new OrderWorker(queue, pool, repo)

        server = createServer(queue, repo, worker)
    })

    afterEach(async () => {
        server.cleanUp()
    })

    it('should create order', async () => {
        const payload = { clientId: '123', items: [] }
        const res = await request(server.server).post("/pedidos").send(payload).set("Content-Type", "application/json")

        expect(res.status).toBe(201)
    })

    it('should return order processed', async () => {
        const payload = { client: '123', items: [] }
        const res1 = await request(server.server).post("/pedidos").send(payload).set("Content-Type", "application/json")
        
        const res2 = await request(server.server).get(`/pedidos/${res1.body.id}`)

        expect(res2.body).toBe({ status: 'processed' })
    })

})