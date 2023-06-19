import ContentAbstract from "./ContentAbstract.js";

export default class PythonContent extends ContentAbstract {
  constructor() {
    super()
  }

  generate() {
    this.containerName = this.containerName == "" ? "python" : this.containerName

    const dockerComposeYml = `version: '3.5'

services:
  ${this.containerName}:
    build:
      context: .
    container_name: ${this.containerName}`

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return `FROM python:3.9-bullseye

RUN mkdir /app
    
CMD while : ; do sleep 1000; done`;
  }
}
