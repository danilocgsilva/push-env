export default class SingleContainer {
  #defaultTargetPort
  #dockerComposeData
  #containerName

  set defaultTargetPort(defaultTargetPort) {
    this.#defaultTargetPort = defaultTargetPort
  }

  set containerName(containerName) {
    this.#containerName = containerName
  }

  set dockerComposeData(dockerComposeData) {
    this.#dockerComposeData = dockerComposeData
  }

  alterDockerComposeData() {
    this.#dockerComposeData.services[this.#containerName] = {
      container_name: this.#containerName,
      build: {
        context: "."
      },
      ports: [
        `${this.#defaultTargetPort}:80`
      ]
    }
  }

  getDockerfileContent() {
    return `FROM debian:bookworm

RUN apt-get update && apt-get upgrade -y
RUN apt-get install vim git zip curl wget -y
RUN apt-get install nginx -y
RUN apt-get install php8.2-fpm -y
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD [ "./entrypoint.sh" ]
`
  }
}

