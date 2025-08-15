export interface ThreadingPool {
    run(task: any): Promise<any>
    stop(): Promise<void>
}