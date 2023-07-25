import ContentAbstract from "./ContentAbstract.js";

export default class PhpApacheWithComposerContent extends ContentAbstract {

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
      this.setContainerName("php-apache-composer")
    }

    const dockerComposeYml = `version: '3.5'

services:
  ${this.getContainerName()}:
    build:
      context: .
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
    const dockerfileContent = `FROM php:8.2-apache-bullseye

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN mkdir ./app
WORKDIR /app
 
CMD while : ; do sleep 1000; done
`

    return dockerfileContent
  }
}
