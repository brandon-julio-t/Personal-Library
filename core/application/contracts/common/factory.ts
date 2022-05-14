export default interface Factory<D, R> {
  create(data: D): R;
}
