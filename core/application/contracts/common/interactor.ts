export default abstract class Interactor<P, R> {
  abstract execute(payload: P): R;
}
