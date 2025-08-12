import express, { Router } from 'express';
import { buildOrderRoutes } from './routes';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Queue } from '../../domain/queues/queue';
import { ThreadingPool } from '../../domain/threading_pools/pool';
import { Order } from '../../domain/entities/order';
import { UseCase } from '../../application/usecases/use_case.interface';

export function createServer(queue: Queue<Order>, pool: ThreadingPool, repo: OrderRepository, backgroundTask: UseCase<void, void>) {
  const app = express();
  app.use(express.json());

  const router = Router()
  app.use(buildOrderRoutes(router, repo, queue));

  app.listen(3000, () => {
    console.log('starting app on port 5000')
    backgroundTask.execute()
  })

  return app;
}