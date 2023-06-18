export default class PhpApacheContent {
  generate() {
    const dbPort = 80;
    const environmentContainerName = "php-apache";
    const dockerComposeYml = `version: '3.5'

services:
  ${environmentContainerName}:
    image: php:8.2-apache-bullseye
    ports:
      - ${dbPort}:80
    container_name: ${environmentContainerName}`;

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "";
  }
}
