import ContentAbstract from "./ContentAbstract.js";

export default class DebianContent extends ContentAbstract {

  #defaultTargetPort

  constructor() {
    super()
    this.#defaultTargetPort = "80"
  }

  generate() {
    const containerName = this.getContainerName() == "" ? "apache" : this.getContainerName()

    const serviceBody = {
      container_name: containerName,
      image: "httpd:2.4"
    }

    serviceBody["ports"] = [
      `${this.#defaultTargetPort}:80`
    ]

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    dockerComposeData.services[containerName] = serviceBody

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "";
  }

  setHostPort(port) {
    this.#defaultTargetPort = port
  }

  help() {
    return `Creates a basic Apache webserver.
  
You can use the following argument:

* hostport

Add in the command line -> hostport:<your_port> <- .In this way, you redirects a different host port (other than 80) to the port 80 from your container, which is the default port to responds http requests for an web server.
`
  }
}