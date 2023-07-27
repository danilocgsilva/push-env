import ContentAbstract from "./ContentAbstract.js";
import { parseDocument } from 'yaml'

export default class Node20DebianContent extends ContentAbstract {
  constructor() {
    super()
  }

  generate() {
    const dbPort = 3002;
    const containerName = this.getContainerName() == "" ? "node-20-debian" : this.getContainerName()

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }    

    const nodeServiceBody = {
      build: {
        context: "."
      },
      ports: [
        `${dbPort}:3000`
      ],
      volumes: [
        './app:/app'
      ],
      container_name: containerName
    }

    if (this.getNetworkMode() !== "") {
      nodeServiceBody.network_mode = this.getNetworkMode()
    }

    dockerComposeData.services[containerName] = nodeServiceBody

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)
    
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
