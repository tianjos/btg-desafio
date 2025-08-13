import { WorkerOrderDto } from "../../application/dtos/worker_order.js";

export default async function (order: WorkerOrderDto): Promise<WorkerOrderDto> {
    return new Promise(resolve => {
        setTimeout(() => {
            const now = new Date().toISOString();
            console.log(`[${now}] - [${order.id}] processed`)
            resolve({ ...order, status: 'processed'})
        }, 2000)
    })
}