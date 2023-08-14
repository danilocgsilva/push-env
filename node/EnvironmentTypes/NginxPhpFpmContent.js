import ContentAbstract from "./ContentAbstract.js";

export default class NginxPhpFpmContent extends ContentAbstract {

  #defaultTargetPort

  constructor() {
    super()
    this.#defaultTargetPort = "80"
  }

  generate() {

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    const phpContainerName = this.getContainerName() == "" ? "nginx_php_fpm_dyn" : this.getContainerName() + "_php"
    const webserverContainerName = this.getContainerName() == "" ? "nginx_php_fpm_webserver" : `${this.getContainerName()}_webserver`

    dockerComposeData.services[phpContainerName] = this._generatePhpReceipt(phpContainerName)
    dockerComposeData.services[webserverContainerName] = this._generateWebserverReceipt(
      phpContainerName, 
      webserverContainerName
    )

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "FROM nginx:latest\n";
  }

  setHostPort(port) {
    this.#defaultTargetPort = port
  }

  _generatePhpReceipt(phpContainerName) {
    const phpReceipt = {
      container_name: phpContainerName,
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

  _generateWebserverReceipt(
    phpContainerName,
    webserverContainerName
  ) {
    return {
      container_name: webserverContainerName,
      build: {
        context: ".",
        dockerfile: "Dockerfilewebserve",
      },
      ports: [
        `${this.#defaultTargetPort}:80`
      ],
      links: [
        phpContainerName
      ]
    }
  }
}