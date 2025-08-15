import { WorkerOrderDto } from "../../application/dtos/worker_order.js";

export default async function (dto: WorkerOrderDto): Promise<WorkerOrderDto> {
    return new Promise(resolve => resolve(dto))
}