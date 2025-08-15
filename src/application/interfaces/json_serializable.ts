export interface JsonSerializer<T> {
    toJSON(): T
}