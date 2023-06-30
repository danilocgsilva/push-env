import ContentAbstract from "./ContentAbstract.js";
import { LineCounter, parse, parseDocument } from 'yaml'

export default class NodeContent extends ContentAbstract {
  constructor() {
    super()
    this.hostPort = 3000
  }

  setHostPort(hostPort) {
    this.hostPort = hostPort
  }

  generate() {
    const containerName = this.getContainerName() == "" ? "node" : this.getContainerName()

    const dockerComposeData = {
      version: "3.5",
      services: {
        node: {
          build: {
            context: "."
          },
          ports: [
            `${this.hostPort}:3000`
          ],
          volumes: [
            './app:/app'
          ],
          container_name: containerName
        }
      }
    }

    const doc = parseDocument(dockerComposeData)

    doc.contents = dockerComposeData

    let dockerComposeYml = doc.toString()

    dockerComposeYml = this.addBlankLine(dockerComposeYml, 1)

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
