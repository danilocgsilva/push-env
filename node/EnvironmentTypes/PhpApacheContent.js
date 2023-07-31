import ContentAbstract from "./ContentAbstract.js";

export default class PhpApacheContent extends ContentAbstract {
  #hostPort
  #phpVersion

  constructor() {
    super()
    this.#hostPort = ""
    this.#phpVersion = "8.2"
  }

  setHostPort(hostPort) {
    this.#hostPort = hostPort
  }

  getHostPort() {
    return this.#hostPort
  }

  generate() {
    this.#hostPort = this.#hostPort == "" ? 80 : this.#hostPort

    if (this.getContainerName() == "") {
      this.setContainerName("php-apache")
    }

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    const serviceBody = {
      image: `php:${this.#phpVersion}-apache-bullseye`,
      ports: ["80:80"],
      volumes: ["./app:/var/www/html"],
      working_dir: "/var/www/html",
      container_name: this.getContainerName()
    }

    const networkMode = this.getNetworkMode()
    if (networkMode != "") {
      serviceBody.network_mode = networkMode
    }

    dockerComposeData.services[this.getContainerName()] = serviceBody

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml
  }

  getDockerfileContent() {
    return "";
  }

  getPhpVersion() {
    return this.#phpVersion
  }

  setPhpVersion(phpVersion) {
    this.#phpVersion = phpVersion
  }
}
