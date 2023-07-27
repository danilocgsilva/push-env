import ContentAbstract from "./ContentAbstract.js";

export default class PhpApacheContent extends ContentAbstract {
  #hostPort
  #phpVersion

  constructor() {
    super()
    this.#hostPort = ""
    this.#phpVersion = "8.2"
  }

  setHostPort(hostPort) {
    this.#hostPort = hostPort
  }

  getHostPort() {
    return this.#hostPort
  }
  
  generate() {
    this.#hostPort = this.#hostPort == "" ? 80 : this.#hostPort

    if (this.getContainerName() == "") {
      this.setContainerName("php-apache")
    }

    const dockerComposeYml = `version: '3.5'

services:
  ${this.getContainerName()}:
    image: php:${this.#phpVersion}-apache-bullseye
    ports:
      - ${this.#hostPort}:80
    volumes:
      - ./app:/var/www/html
    working_dir: /app:/var/www/html
    container_name: ${this.getContainerName()}
`;

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "";
  }

  getPhpVersion() {
    return this.#phpVersion
  }

  setPhpVersion(phpVersion) {
    this.#phpVersion = phpVersion
  }
}
