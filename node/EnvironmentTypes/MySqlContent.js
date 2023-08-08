import ContentAbstract from "./ContentAbstract.js";

export default class MySqlContent extends ContentAbstract {

  constructor() {
    super()
    this._dbPort = 3309
    this._setExternal = false
  }

  setExternal() {
    this._setExternal = true
  }

  setHostPort(newPort) {
    this._dbPort = newPort
  }

  generate() {
    const containerName = this.getContainerName() == "" ? "database1" : this.getContainerName()

    const serviceBody = {
      image: "mysql:8.0.34"
    }

    if (this.getNetworkMode() == "") {
      serviceBody.ports = [`${this._dbPort}:3306`]
    }

    serviceBody.container_name = containerName
    serviceBody.volumes = ["./data/mysql:/var/lib/mysql"]

    const environment = {
      MYSQL_ROOT_PASSWORD: "phppass",
      MYSQL_USER: "phpuser",
      MYSQL_PASSWORD: "phppass",
      MYSQL_DATABASE: "your_application"
    }

    serviceBody.environment = environment

    if (this.getNetworkMode() != "") {
      serviceBody.network_mode = this.getNetworkMode()
    }

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    if (this._setExternal) {
      dockerComposeData.networks = {
        network1: {
          name: "bridge",
          external: true
        }
      }
    }

    dockerComposeData.services[containerName] = serviceBody

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "";
  }
}
