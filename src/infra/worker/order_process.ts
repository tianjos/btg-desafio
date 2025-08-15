import { WorkerOrderDto } from "../../application/dtos/worker_order.js";

export default async function (dto: WorkerOrderDto): Promise<WorkerOrderDto> {
    return new Promise(resolve => {
        setTimeout(() => {
            const now = new Date().toISOString();
            console.log(`[${now}] - [${dto.id.value}] processed`)
            resolve(dto)
        }, 5000)
    })
}