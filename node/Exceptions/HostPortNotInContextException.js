export default class HostPortNotInContextException extends Error {
    constructor(message) {
        const defaultMessage = "The current environment setup does not is setted to have port communication to local machine."
        super(message ? message : defaultMessage);
        this.name = "HostPortNotInContextException";
      }
}