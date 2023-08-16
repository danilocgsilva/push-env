export default class MultipleContainers {

  #defaultTargetPort
  #phpContainerName
  #dockerComposeData
  #webserverContainerName

  set defaultTargetPort(defaultTargetPort) {
    this.#defaultTargetPort = defaultTargetPort
  }

  set phpContainerName(phpContainerName) {
    this.#phpContainerName = phpContainerName
  }

  set dockerComposeData(dockerComposeData) {
    this.#dockerComposeData = dockerComposeData
  }

  set webserverContainerName(webserverContainerName) {
    this.#webserverContainerName = webserverContainerName
  }
  
  alterDockerComposeData() {
    this.#dockerComposeData.services[this.#phpContainerName] = this._generatePhpReceipt()
    this.#dockerComposeData.services[this.#webserverContainerName] = this._generateWebserverReceipt()
  }

  _generatePhpReceipt() {
    const phpReceipt = {
      container_name: this.#phpContainerName,
      build: {
        context: ".",
        dockerfile: "Dockerfilephp"
      }
    }

    phpReceipt["ports"] = [
      "9000:9000"
    ]
    
    return phpReceipt
  }

  _generateWebserverReceipt() {
    return {
      container_name: this.#webserverContainerName,
      build: {
        context: ".",
        dockerfile: "Dockerfilewebserve",
      },
      ports: [
        `${this.#defaultTargetPort}:80`
      ],
      links: [
        this.#phpContainerName
      ]
    }
  }
}
