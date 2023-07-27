import ContentAbstract from "./ContentAbstract.js";

export default class MongoContent extends ContentAbstract {

  constructor() {
    super()
  }

  generate() {
    const dbPort = 27017;
    const containerName = this.getContainerName() == "" ? "mongodb" : this.getContainerName()

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    const serviceBody = {
      image: "mongo:latest",
      ports: [
        `${dbPort}:27017`
      ],
      container_name: containerName,
      environment: {
        MYSQL_ROOT_PASSWORD: "phppass",
        MYSQL_USER: "phpuser",
        MYSQL_PASSWORD: "phppass",
        MYSQL_DATABASE: "your_application",
      }
    }

    dockerComposeData.services[containerName] = serviceBody

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "";
  }
}
