import ContentAbstract from "./ContentAbstract.js";

export default class DebianContent extends ContentAbstract {
  constructor() {
    super()
  }
  generate() {
    const containerName = this.getContainerName() == "" ? "debian" : this.getContainerName()
    const dockerComposeYml = `version: '3.5'

services:
  ${containerName}:
    image: debian:latest
    container_name: ${containerName}`;

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "";
  }
}
