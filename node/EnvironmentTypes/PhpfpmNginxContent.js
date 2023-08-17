import ContentAbstract from "./ContentAbstract.js";
import MultipleContainers from "./PhpfpmAdapters/MultipleContainers.js";
import SingleContainer from "./PhpfpmAdapters/SingleContainer.js";

export default class PhpfpmNginxContent extends ContentAbstract {

  #defaultTargetPort
  #phpContainerName = ""
  #developmentContext = false
  #singleContainer = false
  #adapter = null

  constructor() {
    super()
    this.#defaultTargetPort = "80"
  }

  setSingleContainer() {
    this.#singleContainer = true;
    this._prepareSingleContainerMode()
  }

  setContainerName(containerName) {
    this._containerName = containerName
    this.forcePhpContainerName()
  }

  forcePhpContainerName() {
    this.#phpContainerName = this.getContainerName() == "" ? "nginx_php_fpm_dyn" : this.getContainerName() + "_php"
  }

  getPhpContainerName() {
    return this.#phpContainerName
  }

  generate() {
    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    if (!this.#singleContainer) {
      this._prepareMultipleContainerMode()
    }

    this.#adapter.defaultTargetPort = this.#defaultTargetPort
    this.#adapter.dockerComposeData = dockerComposeData
    this.#adapter.alterDockerComposeData()

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)
    return dockerComposeYml
  }

  getDockerfileContent() {
    if (this.#adapter === null) {
      this.#adapter = new MultipleContainers()
    }
    return this.#adapter.getDockerfileContent()
  }

  setHostPort(port) {
    this.#defaultTargetPort = port
  }

  setDevelopmentCommons() {
    this.#developmentContext = true
  }

  mayWriteConfigurationFile() {
    return true
  }

  getConfigurationsContent() {

    this.forcePhpContainerName()

    if (this.#adapter === null) {
      this.#adapter = new MultipleContainers()
      this.#adapter.phpContainerName = this.#phpContainerName
    }

    return this.#adapter.getConfigurationsContent()
  }

  getDockerFileName() {
    return this.#adapter.getDockerFileName()
  }

  getAdditionalFilesWithPathsAndContents() {
    if (this.#adapter === null) {
      this.#adapter = new MultipleContainers()
    }

    if (this.#developmentContext) {
      this.#adapter.setDevelopmentCommons()
    }

    return this.#adapter.getAdditionalFilesWithPathsAndContents()
  }

  help() {
    return `Generates a Docker recipe encompassing two containers: one to php-fpm and another to the Nginx server. Both reside in the same docker-compose.yml file.

There is also a parameters that can be used:

* dev:<affirmation>

The <affirmation> can be only yes or true. This installs additional stuffs to the php-fpm recipe, so is better for a development porpouse. Vim, curl, zip, wget and composer packages are added to the environment.
`
  }

  _prepareSingleContainerMode() {
    const containerName = this.getContainerName() == "" ? "nginx_php_fpm" : `${this.getContainerName()}_webserver`
    this.#adapter = new SingleContainer()
    this.#adapter.containerName = containerName
  }

  _prepareMultipleContainerMode() {
    const webserverContainerName = this.getContainerName() == "" ? "nginx_php_fpm_webserver" : `${this.getContainerName()}_webserver`

    this.#adapter = new MultipleContainers()
    this.#adapter.webserverContainerName = webserverContainerName
    this.forcePhpContainerName()
    this.#adapter.phpContainerName = this.#phpContainerName
  }
}