export default class GeneratorNotImplementedException extends Error {
    constructor(message) {
        const defaultMessage = "The object miss the implementation to generate the docker content. Does the asked type for docker environment exists or where implemented?"
        super(message ? message : defaultMessage);
        this.name = "GeneratorNotImplementedException";
      }
}
