export default class MongoContent {
  generate() {
    const dbPort = 27017;
    const environmentContainerName = "mongodb";
    const dockerComposeYml = `version: '3.5'

services:
  ${environmentContainerName}:
    image: mongodb:latest
    ports:
      - ${dbPort}:27017
    container_name: ${environmentContainerName}
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
