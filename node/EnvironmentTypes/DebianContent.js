import ContentAbstract from "./ContentAbstract.js";

export default class DebianContent extends ContentAbstract {

  #defaultTargetPort

  constructor() {
    super()
    this.#defaultTargetPort = null
  }

  generate() {
    const containerName = this.getContainerName() == "" ? "debian" : this.getContainerName()

    const serviceBody = {
      container_name: containerName,
      build: {
        context: "."
      }
    }

    if (this.#defaultTargetPort) {
      serviceBody["ports"] = [
        `${this.#defaultTargetPort}:80`
      ]
    }

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    dockerComposeData.services[containerName] = serviceBody

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml;
  }

  getDockerfileContent() {

    let dockerfileContent = "FROM debian:bookworm\n\n"

    if (this.entryScriptIsSetted()) {
      dockerfileContent += "CMD entry.sh\n"
    } else {
      dockerfileContent += "CMD while : ; do sleep 1000; done\n"
    }

    return dockerfileContent;
  }

  setHostPort(port) {
    this.#defaultTargetPort = port
  }

  help() {
    const message = `Creates an environment based on Debian Bookworm.

An argumento for host is acceptable for debian_conte:

* hostport

Use hostport:<your_host_port> in the command line. It is the host port that will be redirected to the port 80 from the container, the expected port for an web application.
`

    return message
  }

  getAdditionalFilesWithPathsAndContents() {
    if (this.entryScriptIsSetted()) {

      const entrypointcontent = `#!/bin/bash

while : ; do sleep 1000; done
`
      
      return [
        {
          "content": entrypointcontent,
          "path": "entry.sh"
        }
      ]
    }
    return []
  }
}
