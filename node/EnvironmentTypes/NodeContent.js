export default class NodeContent {
  generate() {
    const dbPort = 3000;
    const environmentContainerName = "node";

    const dockerComposeYml = `version: '3.5'

services:
  ${environmentContainerName}:
    build:
      context: .
    ports:
      - ${dbPort}:3000
    volumes:
      - ./app:/app
    container_name: ${environmentContainerName}`;

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
