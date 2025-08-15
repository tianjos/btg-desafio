import { Request, Response, Router } from 'express';
import { CreateOrderController } from './controllers/creater_order.js';
import { CreateOrderUseCase } from '../../application/usecases/create_order.js';
import { OrderStatusUseCase } from '../../application/usecases/order_status.js';
import { OrderStatusController } from './controllers/order_status.js';
import { OrderRepository } from '../../domain/repositories/order.js';
import { HttpController } from './controllers/http_controller.js';
import { Queue } from '../../domain/queues/queue.js';
import { Order } from '../../application/interfaces/order.js';

export class RouteMethod {
    constructor(private method: 'post' | 'get') {}
    type(): 'post' | 'get' {
        return this.method
    }
}

interface RouteHandler {
    handle(req: Request, res: Response): void
}

export class HttpRoute {
    constructor(
        private router: Router,
        private endpoint: string, 
        private method: RouteMethod
    ) {}

    publish(controller: HttpController) {
        this.router[this.method.type()](this.endpoint, (req, res) => controller.handle(req, res))
    }
}


const createOrderHandler = (httpRoute: HttpRoute, repo: OrderRepository, queue: Queue<Order>) => {
    const usecase = new CreateOrderUseCase(repo, queue);
    const controller = new CreateOrderController(usecase);
    
    httpRoute.publish(controller)
}


const orderStatusHandler = (httpRoute: HttpRoute, repo: OrderRepository) => {
    const usecase = new OrderStatusUseCase(repo)
    const controller = new OrderStatusController(usecase)

    httpRoute.publish(controller)

}

export const buildOrderRoutes = (router: Router, repo: OrderRepository, queue: Queue<Order>) => {
    const createOrderRoute = new HttpRoute(router, '/pedidos', new RouteMethod('post'))
    const orderStatusRoute = new HttpRoute(router, '/pedidos/:id', new RouteMethod('get'))

    createOrderHandler(createOrderRoute, repo, queue)
    orderStatusHandler(orderStatusRoute, repo)

    return router
}
