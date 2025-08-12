export interface Queue<T> {
    enqueue(item: T): void
    dequeue(): T | undefined
    empty(): boolean
}