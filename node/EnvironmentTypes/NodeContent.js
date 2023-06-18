export default class NodeContent {
    generate() {
        const dbPort = 3000
        const environmentContainerName = "node"

        const dockerComposeYml = `version: '3.5'

        services:
          ${environmentContainerName}:
            image: node:latest
            ports:
              - ${dbPort}:3000
            container_name: ${environmentContainerName}
            environment:
              MYSQL_ROOT_PASSWORD: phppass
              MYSQL_USER: phpuser
              MYSQL_PASSWORD: phppass
              MYSQL_DATABASE: your_application`;
        
        return dockerComposeYml;
    }
}