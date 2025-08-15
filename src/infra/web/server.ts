import express, { Router } from 'express';
import { buildOrderRoutes } from './routes.js';
import { OrderRepository } from '../../domain/repositories/order.js';
import { Queue } from '../../domain/queues/queue.js';
import { Order } from '../../application/interfaces/order.js';
import { Worker } from '../worker/worker.js';

export function createServer(queue: Queue<Order>, repo: OrderRepository, worker: Worker) {
  const app = express();
  const router = Router()
  
  app.use(express.json());
  app.use(buildOrderRoutes(router, repo, queue));

  const server = app.listen(3000, () => {
    console.log('starting app on port 3000')
    worker.start()
  })

  return {
    server,
    worker,
    cleanUp: () => {
      server.close()
      worker.stop()
    }
  }
}