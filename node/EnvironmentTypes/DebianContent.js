import ContentAbstract from "./ContentAbstract.js";
import { LineCounter, parseDocument } from 'yaml'

export default class DebianContent extends ContentAbstract {
  constructor() {
    super()
  }
  generate() {
    const containerName = this.getContainerName() == "" ? "debian" : this.getContainerName()

    const dockerComposeData = {
      version: "3.5",
      services: {
        debian: {
          container_name: containerName,
          build: {
            context: "."
          }
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
    const dockerfileContent = `FROM debian:bullseye

CMD while : ; do sleep 1000; done`;

    return dockerfileContent;
  }
}
