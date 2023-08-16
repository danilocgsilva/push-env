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
}

