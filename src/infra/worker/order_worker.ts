import { Worker } from "./worker.js";
import { WorkerFile } from "./worker_file.js";

export class OrderWorker implements Worker {
    constructor(private workerFile: WorkerFile) {}

    location() {
        return this.workerFile.asPath()
    }
}