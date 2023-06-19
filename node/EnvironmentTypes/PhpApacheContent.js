import ContentAbstract from "./ContentAbstract.js";

export default class PhpApacheContent extends ContentAbstract {
  #hostPort

  constructor() {
    super()
    this.#hostPort = ""
  }

  setHostPort(hostPort) {
    this.#hostPort = hostPort
  }
  
  generate() {
    this.#hostPort = this.#hostPort == "" ? 80 : this.#hostPort

    if (this.getContainerName() == "") {
      this.setContainerName("php-apache")
    }

    const dockerComposeYml = `version: '3.5'

services:
  ${this.getContainerName()}:
    image: php:8.2-apache-bullseye
    ports:
      - ${this.#hostPort}:80
    volumes:
      - ./app:/var/www/html
    working_dir: /app:/var/www/html
    container_name: ${this.getContainerName()}`;

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "";
  }
}
