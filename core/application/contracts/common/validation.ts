export default abstract class Validation<T> {
    /**
     * @throws {Error}
     */
    abstract validate(payload: T): void;
}