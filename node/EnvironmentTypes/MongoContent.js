import ContentAbstract from "./ContentAbstract.js";

export default class MongoContent extends ContentAbstract {
  constructor() {
    super()
  }
  generate() {
    const dbPort = 27017;
    const containerName = this.getContainerName() == "" ? "mongodb" : this.getContainerName()
    const dockerComposeYml = `version: '3.5'

services:
  ${containerName}:
    image: mongo:latest
    ports:
      - ${dbPort}:27017
    container_name: ${containerName}
    environment:
      MYSQL_ROOT_PASSWORD: phppass
      MYSQL_USER: phpuser
      MYSQL_PASSWORD: phppass
      MYSQL_DATABASE: your_application`;

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "";
  }
}
