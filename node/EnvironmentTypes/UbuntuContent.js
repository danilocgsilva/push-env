import ContentAbstract from "./ContentAbstract.js";
import { parseDocument } from 'yaml'

export default class UbuntuContent extends ContentAbstract {
  constructor() {
    super()
  }
  generate() {
    const containerName = this.getContainerName() == "" ? "ubuntu" : this.getContainerName()

    const dockerComposeData = {
      version: "3.5",
      services: {
        ubuntu: {
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
    const dockerfileContent = `FROM ubuntu:mantic

CMD while : ; do sleep 1000; done`;

    return dockerfileContent;
  }
}
