export default class ConfigureFileWritterException extends Error {
  constructor(message) {
    super(message);
    this.name = "ConfigureFileWritterException";
  }
}