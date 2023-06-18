export default class PhpApacheContent {
    generate() {
        const dbPort = 80
        const environmentContainerName = "php-apache"
        const dockerComposeYml = `version: '3.5'

        services:
          ${environmentContainerName}:
            image: php:8.2-apache-bullseye
            ports:
              - ${dbPort}:80
            container_name: ${environmentContainerName}
            environment:
              MYSQL_ROOT_PASSWORD: phppass
              MYSQL_USER: phpuser
              MYSQL_PASSWORD: phppass
              MYSQL_DATABASE: your_application`;
        
        return dockerComposeYml;
    }
}