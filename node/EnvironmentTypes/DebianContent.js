import ContentAbstract from "./ContentAbstract.js";

export default class DebianContent extends ContentAbstract {

  #defaultTargetPort
  
  constructor() {
    super()
    this.#defaultTargetPort = null
  }

  generate() {
    const containerName = this.getContainerName() == "" ? "debian" : this.getContainerName()

    const serviceBody = {
      container_name: containerName,
      build: {
        context: "."
      }
    }

    if (this.#defaultTargetPort) {
      serviceBody["ports"] = [
        `${this.#defaultTargetPort}:80`
      ]
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
    const dockerfileContent = `FROM debian:bullseye

CMD while : ; do sleep 1000; done`;

    return dockerfileContent;
  }

  setHostPort(port) {
    this.#defaultTargetPort = port
  }
}
