import { Request, Response, Router } from 'express';
import { CreateOrderController } from './controllers/createrOrderController';
import { CreateOrderUseCase } from '../../application/usecases/create_order.usecase';
import { OrderStatusUseCase } from '../../application/usecases/order_status.usecase';
import { OrderStatusController } from './controllers/orderStatusController';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { HttpController } from './controllers/HttpController';
import { Queue } from '../../domain/queues/queue';
import { Order } from '../../domain/entities/order';

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
