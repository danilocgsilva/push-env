export default class MissingQueryException extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingQueryException";
  }
}
