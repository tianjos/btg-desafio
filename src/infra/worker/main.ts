import { WorkerFile } from "./worker_file.js"

export const workerPath = __dirname

export const orderProcess = new WorkerFile(__dirname, 'order_process.js');