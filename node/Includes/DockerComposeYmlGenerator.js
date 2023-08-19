import GeneratorNotImplementedException from "../Exceptions/GeneratorNotImplementedException.js";
import ContentAbstract from "../EnvironmentTypes/ContentAbstract.js";

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

  /**
   * Returns docker-compose.yml file content
   * 
   * @returns String
   */
  generate() {
    return this.#generator.generate()
  }

  getDockerfileContent() {
    return this.#generator.getDockerfileContent()
  }

  help() {
    return this.#generator.help()
  }

  setHostPort(port) {
    this.#generator.setHostPort(port)
  }

  setExternal() {
    this.#generator.setExternal()
  }

  setNetworkMode(network_mode) {
    this.#generator.setNetworkMode(network_mode)
  }

  set containerName(containerName) {
    this.#generator.setContainerName(containerName)
  }

  getHostPort() {
    return this.#generator.getHostPort()
  }

  setPhpVersion(phpVersion) {
    return this.#generator.setPhpVersion(phpVersion)
  }

  getPhpVersion() {
    return this.#generator.getPhpVersion()
  }

  setDevelopmentCommons() {
    return this.#generator.setDevelopmentCommons()
  }

  /**
   * Tells that addition configuration files must be generated.
   * 
   * @returns bool
   */
  mayWriteConfigurationFile() {
    return this.#generator.mayWriteConfigurationFile()
  }

  /**
   * Returns the Generator
   * 
   * @returns ContentAbstract
   */
  getGenerator() {
    return this.#generator
  }

  /**
   * Get Dockerfile name.
   * Usually, is -> Dockerfile <-, but depending on the adapter it can be different
   * 
   * @returns string
   */
  getDockerFileName() {
    return this.#generator.getDockerFileName()
  }

  getAdditionalFilesWithPathsAndContents() {
    return this.#generator.getAdditionalFilesWithPathsAndContents()
  }

  setSingleContainer() {
    this.#generator.setSingleContainer()
  }

  webDocumentRootSuffix(suffix) {
    this.#generator.webDocumentRootSuffix(suffix)
  }
}
