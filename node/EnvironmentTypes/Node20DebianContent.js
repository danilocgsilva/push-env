import ContentAbstract from "./ContentAbstract.js";

export default class Node20DebianContent extends ContentAbstract {
  constructor() {
    super()
  }

  generate() {
    const dbPort = 3002;
    const containerName = this.getContainerName() == "" ? "node-20-debian" : this.getContainerName()
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
    const dockerfileContent = `FROM debian:bullseye

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install curl -y

RUN curl -fsSL https://deb.nodesource.com/setup_20.x > /tmp/node20setup.sh 
RUN bash /tmp/node20setup.sh
RUN apt-get install nodejs

RUN mkdir ./app
WORKDIR /app

CMD while : ; do sleep 1000; done`;

    return dockerfileContent;
  }
}
