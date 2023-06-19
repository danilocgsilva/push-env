export default class PythonContent {
  generate() {
    const environmentContainerName = "python";

    const dockerComposeYml = `version: '3.5'

services:
  ${environmentContainerName}:
    build:
      context: .
    container_name: ${environmentContainerName}`

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return `FROM python:3.9-bullseye

RUN mkdir /app
    
CMD while : ; do sleep 1000; done`;
  }
}
