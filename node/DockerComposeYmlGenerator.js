import environmentTypes from "./environmentTypes.js"
import GeneratorNotImplementedException from "./Exceptions/GeneratorNotImplementedException.js";

export default class DockerComposeYmlGenerator {
    #generator = null
    constructor(environmentType) {
        const generator = environmentTypes[environmentType];
        if (!generator) {
            throw new GeneratorNotImplementedException()
        }
        this.#generator = generator
    }
    generate() {
        return this.#generator.generate()
    }
}
