import ContentAbstract from "./ContentAbstract.js";

export default class PHPContent extends ContentAbstract {

  #developmentContext
  #phpVersion

  constructor() {
    super()
    this.#phpVersion = ""
  }

  setDevelopmentCommons() {
    this.#developmentContext = true
  }

  /**
   * Returns docker-compose.yml file content
   * 
   * @returns string
   */
  generate() {
    const containerName = this.getContainerName() == "" ? "php" : this.getContainerName()
    const serviceBody = {
      container_name: containerName,
      build: {
        context: "."
      }
    }

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    const networkMode = this.getNetworkMode()
    if (networkMode != "") {
      serviceBody.network_mode = networkMode
    }

    dockerComposeData.services[containerName] = serviceBody

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml;
  }

  getDockerfileContent() {

    const tag = this.#phpVersion === "" ? "latest" : this.#phpVersion
    
    const dockerReceipt = `FROM php:${tag}`

    if (this.#developmentContext) {
      const suffix = `

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install vim git curl wget zip -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug
COPY configs/docker-php-ext-xdebug.ini /usr/local/etc/php/conf.d
`
      return dockerReceipt + suffix
    }

    return dockerReceipt
  }

  setPhpVersion(phpVersion) {
    this.#phpVersion = phpVersion
  }

  mayWriteConfigurationFile() {
    if (this.#developmentContext === "") {
      return false
    }
    return true
  }

  getAdditionalFilesWithPathsAndContents() {
    const fileContent = `zend_extension=xdebug
xdebug.start_with_request = 1
xdebug.mode=debug
`

    const additionalFile = {
      content: fileContent,
      path: "configs/docker-php-ext-xdebug.ini"
    }

    return [additionalFile]
  }

  help() {
    return `Generates the recipe for a PHP.
Additionals parameters:

dev: must receive yes or true. Add packages suitable for development. For example, camposer, git, zip, curl, wget and xdebug.
php_version: defines which version you desite for recipe. For example, you may choose 8.0, for exemple.
`
  }
}
