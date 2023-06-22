import ContentAbstract from "./ContentAbstract.js";

export default class NodeDebianContent extends ContentAbstract {
  constructor() {
    super()
  }

  generate() {
    const dbPort = 3000;
    this.containerName = this.getContainerName() == "" ? "node-debian" : this.containerName
    const dockerComposeYml = `version: '3.5'
    
services:
  ${this.containerName}:
    build:
      context: .
    ports:
      - ${dbPort}:3000
    volumes:
      - ./app:/app
    container_name: ${this.containerName}`;

    return dockerComposeYml;
  }

  getDockerfileContent() {
    const dockerfileContent = `FROM debian:bullseye

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install nodejs npm -y
RUN mkdir ./app
WORKDIR /app

CMD while : ; do sleep 1000; done`;

    return dockerfileContent;
  }
}
