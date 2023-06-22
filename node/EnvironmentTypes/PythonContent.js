import ContentAbstract from "./ContentAbstract.js";

export default class PythonContent extends ContentAbstract {
  constructor() {
    super()
  }

  generate() {
    const containerName = this.getContainerName() == "" ? "python" : this.getContainerName()

    const dockerComposeYml = `version: '3.5'

services:
  ${containerName}:
    build:
      context: .
    container_name: ${containerName}`

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return `FROM python:3.9-bullseye

RUN mkdir /app
    
CMD while : ; do sleep 1000; done`;
  }
}
