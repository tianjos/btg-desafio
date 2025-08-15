"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupServer = setupServer;
const order_processing_1 = require("../../src/application/usecases/order_processing");
const order_1 = require("../../src/infra/db/order");
const memory_queue_1 = require("../../src/infra/queue/memory_queue");
const cpu_1 = require("../../src/infra/system/cpu");
const pool_1 = require("../../src/infra/thread/pool");
const server_1 = require("../../src/infra/web/server");
const main_1 = require("../../src/infra/worker/main");
const order_worker_1 = require("../../src/infra/worker/order_worker");
function setupServer() {
    const repo = new order_1.OrderRepoInMemory();
    const queue = new memory_queue_1.MemoryQueue([]);
    const worker = new order_worker_1.OrderWorker(main_1.fakeOrderProcess);
    const pool = new pool_1.PiscinaThreading(worker, new cpu_1.CPU());
    const backgroundTask = new order_processing_1.OrderProcessingUseCase(repo, queue, pool);
    return (0, server_1.createServer)(queue, repo, backgroundTask);
}
