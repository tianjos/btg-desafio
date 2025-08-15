import express, { Router } from 'express';
import { buildOrderRoutes } from './routes.js';
import { OrderRepository } from '../../domain/repositories/order.js';
import { Queue } from '../../domain/queues/queue.js';
import { Order } from '../../application/interfaces/order.js';
import { UseCase } from '../../application/usecases/use_case.js';

export function createServer(queue: Queue<Order>, repo: OrderRepository, backgroundTask: UseCase<void, void>) {
  const app = express();
  const router = Router()
  
  app.use(express.json());
  app.use(buildOrderRoutes(router, repo, queue));

  return app.listen(3000, () => {
    console.log('starting app on port 3000')
    backgroundTask.execute()
  })

  //return app;
}