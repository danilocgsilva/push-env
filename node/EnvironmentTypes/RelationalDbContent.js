import ContentAbstract from "./ContentAbstract.js";

export default class RelationalDbContent extends ContentAbstract {
  constructor() {
    super()
  }

  generate() {
    const dbPort1 = 3309;
    this.containerName = this.getContainerName() == "" ? "database1" : this.containerName

    const dockerComposeYml = `version: '3.5'

services:
  ${this.containerName}:
    image: mariadb:10.7
    ports:
      - ${dbPort1}:3306
    container_name: ${this.containerName}
    volumes:
      - ./data/mysql:/var/lib/mysql
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
