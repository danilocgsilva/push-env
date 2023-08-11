import ContentAbstract from "./ContentAbstract.js";

export default class DotNetCoreContent extends ContentAbstract {

  constructor() {
    super()
  }

  generate() {
    const containerName = this.getContainerName() == "" ? "dotnetcore" : this.getContainerName()

    const serviceBody = {
      container_name: containerName,
      image: "mcr.microsoft.com/dotnet/sdk:6.0"
    }

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    dockerComposeData.services[containerName] = serviceBody

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "";
  }
}