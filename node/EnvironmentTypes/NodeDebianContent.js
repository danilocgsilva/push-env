export default class NodeDebianContent {
  generate() {
    const dbPort = 3000;
    const environmentContainerName = "node-debian";
    const dockerComposeYml = `version: '3.5'
    
services:
  ${environmentContainerName}:
    build:
      context: .
    ports:
      - ${dbPort}:3000
    container_name: ${environmentContainerName}`;

    return dockerComposeYml;
  }
  getDockerfileContent() {
    const dockerfileContent = `FROM debian:bullseye

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install nodejs npm -y
RUN mkdir ./app
WORKDIR ./app

CMD while : ; do sleep 1000; done`;

    return dockerfileContent;
  }
}
