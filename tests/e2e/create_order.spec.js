"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_js_1 = require("../../src/infra/web/server.js");
const memory_queue_js_1 = require("../../src/infra/queue/memory_queue.js");
const order_processing_js_1 = require("../../src/application/usecases/order_processing.js");
const order_js_1 = require("../../src/infra/db/order.js");
const cpu_js_1 = require("../../src/infra/system/cpu.js");
const pool_js_1 = require("../../src/infra/thread/pool.js");
const main_js_1 = require("../../src/infra/worker/main.js");
const order_worker_js_1 = require("../../src/infra/worker/order_worker.js");
describe('Create Order', () => {
    let app;
    let queue;
    let repo;
    let worker;
    let pool;
    let backgroundTask;
    beforeEach(async () => {
        repo = new order_js_1.OrderRepoInMemory();
        queue = new memory_queue_js_1.MemoryQueue([]);
        worker = new order_worker_js_1.OrderWorker(main_js_1.fakeOrderProcess);
        pool = new pool_js_1.PiscinaThreading(worker, new cpu_js_1.CPU());
        backgroundTask = new order_processing_js_1.OrderProcessingUseCase(repo, queue, pool);
        app = (0, server_js_1.createServer)(queue, repo, backgroundTask);
    });
    afterEach(async () => {
        await pool.stop();
    });
    it('should create order', async () => {
        const payload = { clientId: '123', items: [] };
        const res = await (0, supertest_1.default)(app).post("/pedidos").send(payload).set("Content-Type", "application/json");
        expect(res.status).toBe(201);
    });
});
