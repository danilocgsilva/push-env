import ContentAbstract from "./ContentAbstract.js";

export default class PhpApacheWithComposerContent extends ContentAbstract {

  #hostPort

  constructor() {
    super()
    this.#hostPort = "80"
  }

  setHostPort(hostPort) {
    this.#hostPort = hostPort
  }

  generate() {
    if (this.getContainerName() == "") {
      this.setContainerName("php-apache-composer")
    }

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    const nodeServiceBody = {
      build: {
        context: "."
      },
      ports: [
        `${this.#hostPort}:80`
      ],
      volumes: [
        './app:/var/www/html'
      ],
      working_dir: "/app:/var/www/html",
      container_name: this.getContainerName()
    }

    if (this.getNetworkMode() !== "") {
      nodeServiceBody.network_mode = this.getNetworkMode()
    }

    dockerComposeData.services[this.getContainerName()] = nodeServiceBody

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml;
  }

  getDockerfileContent() {
    const dockerfileContent = `FROM php:8.2-apache-bullseye

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN mkdir ./app
WORKDIR /app
EXPOSE 80
ENTRYPOINT [ "/usr/sbin/apachectl" ]
CMD ["-D", "FOREGROUND"]
`

    return dockerfileContent
  }

  getPhpVersion() {
    return "8.2"
  }
}
