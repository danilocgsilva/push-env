import ContentAbstract from "./ContentAbstract.js";

export default class NodeContent extends ContentAbstract {
  constructor() {
    super()
  }

  generate() {
    const dbPort = 3000;
    const containerName = this.getContainerName() == "" ? "node" : this.getContainerName()
    const dockerComposeYml = `version: '3.5'

services:
  ${containerName}:
    build:
      context: .
    ports:
      - ${dbPort}:3000
    volumes:
      - ./app:/app
    container_name: ${containerName}`;

    return dockerComposeYml;
  }

  getDockerfileContent() {
    const dockerfileContent = `FROM node:latest

RUN mkdir ./app
WORKDIR /app

CMD while : ; do sleep 1000; done`

    return dockerfileContent
  }
}
