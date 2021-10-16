export interface UseCase<T> {
    execute(data: Omit<T, "created_at" | "id" | "updated_at">): Promise<T>
}