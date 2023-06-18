export default class RelationalDbContent {
  generate() {
    const dbPort1 = 3309;
    const environmentContainerName = "database1";

    const dockerComposeYml = `version: '3.5'

services:
  ${environmentContainerName}:
    image: mariadb:10.7
    ports:
      - ${dbPort1}:3306
    container_name: ${environmentContainerName}
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
