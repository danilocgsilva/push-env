import ContentAbstract from "./ContentAbstract.js";

export default class PhpApacheContent extends ContentAbstract {
  #hostPort
  #phpVersion
  #developmentContext

  constructor() {
    super()
    this.#hostPort = ""
    this.#phpVersion = "8.2"
    this.#developmentContext = false
  }

  setHostPort(hostPort) {
    this.#hostPort = hostPort
  }

  getHostPort() {
    return this.#hostPort
  }

  setDevelopmentCommons() {
    this.#developmentContext = true
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

    const serviceBody = {}

    if (!this.#developmentContext) {
      serviceBody.image = `php:${this.#phpVersion}-apache-bullseye`
    } else {
      serviceBody.build = {context: "."}
    }

    serviceBody.ports = ["80:80"]
    serviceBody.volumes = ["./app:/var/www/html"]
    serviceBody.working_dir = "/var/www/html"
    serviceBody.container_name = this.getContainerName()

    const networkMode = this.getNetworkMode()
    if (networkMode != "") {
      serviceBody.network_mode = networkMode
    }

    dockerComposeData.services[this.getContainerName()] = serviceBody

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml
  }

  getDockerfileContent() {
    const dockerfileContent = `FROM php:${this.#phpVersion}-apache-bullseye

RUN apt-get update
RUN apt-get install vim zip git -y
RUN mkdir ./app
WORKDIR /app
EXPOSE 80
ENTRYPOINT [ "/usr/sbin/apachectl" ]
CMD ["-D", "FOREGROUND"]
`

    return dockerfileContent
  }

  getPhpVersion() {
    return this.#phpVersion
  }

  setPhpVersion(phpVersion) {
    this.#phpVersion = phpVersion
  } 

  help() {
    return `The php_apache type of auto generation can receive some special arguments:

* php_version: Tested with 8.1, but other versions may works as well.
* dev: may receive yes or true. This will create a receipt with includes common development packages for the environment, as zip, git, vim and xdebug.
`
  }
}
