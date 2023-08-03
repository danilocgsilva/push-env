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
    const dockerfileContent = `FROM php:8.2-apache-bullseye

RUN apt-get update
RUN apt-get install vim zip -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN pecl install xdebug && docker-php-ext-enable xdebug
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
}
