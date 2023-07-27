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

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "FROM php:latest";
  }
}
