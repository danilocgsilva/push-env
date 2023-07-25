import ContentAbstract from "./ContentAbstract.js";
import { parseDocument } from 'yaml'

export default class PHPContent extends ContentAbstract {

  constructor() {
    super()
  }

  generate() {
    const containerName = this.getContainerName() == "" ? "php" : this.getContainerName()
    const serviceBody = {
      container_name: containerName,
      build: {
        context: "."
      }
    }

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    dockerComposeData.services[containerName] = serviceBody

    const doc = parseDocument(dockerComposeData)

    doc.contents = dockerComposeData

    let dockerComposeYml = doc.toString()
    dockerComposeYml = this.addBlankLine(dockerComposeYml, 1)

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "FROM php:latest";
  }
}
