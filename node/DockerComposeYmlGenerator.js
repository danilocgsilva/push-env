import GeneratorNotImplementedException from "./Exceptions/GeneratorNotImplementedException.js";

export default class DockerComposeYmlGenerator {
    #generator = null
    constructor(environmentType, environmentTypesO) {
        const environmentTypes = environmentTypesO.getEnvironments()
        const generator = environmentTypes[environmentType];
        if (!generator) {
            throw new GeneratorNotImplementedException()
        }
        this.#generator = generator
    }
    generate() {
        return this.#generator.generate()
    }
    getDockerfileContent() {
        return this.#generator.getDockerfileContent()
    }
}
