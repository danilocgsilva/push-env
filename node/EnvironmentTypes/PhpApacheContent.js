import ContentAbstract from "./ContentAbstract.js";

export default class PhpApacheContent extends ContentAbstract {
  #hostPort
  #phpVersion
  #developmentContext
  #documentRootSuffix

  constructor() {
    super()
    this.#hostPort = ""
    this.#phpVersion = "8.2"
    this.#developmentContext = false
    this.#documentRootSuffix = ""
  }

  setHostPort(hostPort) {
    this.#hostPort = hostPort
  }

  getHostPort() {
    return this.#hostPort
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
    this.#hostPort = this.#hostPort == "" ? 80 : this.#hostPort

    if (this.getContainerName() == "") {
      this.setContainerName("php-apache")
    }

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    const serviceBody = {}

    if (this.#developmentContext || this.#documentRootSuffix !== "") {
      serviceBody.build = { context: "." }
    } else {
      serviceBody.image = `php:${this.#phpVersion}-apache-bullseye`
    }

    serviceBody.ports = [`${this.#hostPort}:80`]
    serviceBody.volumes = ["./app:/var/www/html"]
    serviceBody.working_dir = "/var/www/html"
    serviceBody.container_name = this.getContainerName()

    const networkMode = this.getNetworkMode()
    if (networkMode != "") {
      serviceBody.network_mode = networkMode
    }

    dockerComposeData.services[this.getContainerName()] = serviceBody

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml
  }

  /**
   * Returns the Dockerfile content
   * 
   * @returns string
   */
  getDockerfileContent() {
    let dockerfileContent = `FROM php:${this.#phpVersion}-apache-bullseye
`

    if (this.#developmentContext) {
      dockerfileContent += `
RUN apt-get update
RUN apt-get install -y vim git zip curl wget
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug
COPY configs/docker-php-ext-xdebug.ini /usr/local/etc/php/conf.d`

    }

    if (this.#documentRootSuffix !== "") {
      dockerfileContent += "\nCOPY ./config/000-default.conf /etc/apache2/sites-available/000-default.conf"
    }

    dockerfileContent += `
RUN a2enmod rewrite
RUN mkdir ./app
WORKDIR /app
EXPOSE 80
`

    return dockerfileContent
  }

  /**
   * Returns the Nginx server block file content
   * 
   * @returns string
   */
  getHostConfigurationContent() {
    return `<VirtualHost *:80>

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/${this.#documentRootSuffix}

        ErrorLog \${APACHE_LOG_DIR}/error.log
        CustomLog \${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
`
  }

  getPhpVersion() {
    return this.#phpVersion
  }

  mayWriteConfigurationFile() {
    if (this.#documentRootSuffix === "" && !this.#developmentContext) {
      return false
    }
    return true
  }

  setPhpVersion(phpVersion) {
    this.#phpVersion = phpVersion
  }

  getAdditionalFilesWithPathsAndContents() {
    if (this.#developmentContext) {

      const xdebugConfigurationChunck = `zend_extension=xdebug
xdebug.start_with_request = 1
xdebug.mode=debug
`
      
      return [{
        content: xdebugConfigurationChunck,
        path: "configs/docker-php-ext-xdebug.ini"
      }]
    }
    return []
  }

  /**
   * Set the suffix for the default document root path for web
   * 
   * @param {string} suffix 
   */
  webDocumentRootSuffix(suffix) {
    this.#documentRootSuffix = suffix
  }

  getHostConfigurationFilePath() {
    return "config/000-default.conf"
  }

  help() {
    return `The php_apache type of auto generation can receive some special arguments:

* php_version: Tested with 8.1, but other versions may works as well.
* dev: may receive yes or true. This will create a receipt with includes common development packages for the environment, as zip, git, vim and xdebug.
* hostport: the host port to be redirected to the port 80 from container.
* document_root_suffix: Appends a path to the default apache web document root, which is the /var/www/html
`
  }
}
