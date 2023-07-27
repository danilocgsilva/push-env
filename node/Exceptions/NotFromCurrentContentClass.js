export default class NotFromCurrentContentClass extends Error {
  constructor(message) {
    const defaultMessage = "This method is not designed to work to this content class."
    super(message ? message : defaultMessage);
    this.name = "NotFromCurrentContentClass";
  }
}
