import { ThreadingPool } from "../../domain/threading_pools/pool";

export class FakeThreadingPool implements ThreadingPool {
    run(task: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}