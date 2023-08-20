import PhpApacheContent from "../../EnvironmentTypes/PhpApacheContent.js"
import configureFromParameters from "../../Includes/configureFromParameters.js"
import DockerComposeYmlGenerator from "../../Includes/DockerComposeYmlGenerator.js"
import EnvironmentTypes from "../../Includes/EnvironmentTypes.js"

describe('PhpApacheContent', () => {

  test('Basic', () => {

    const phpApacheContent = new PhpApacheContent()

    const expectContent = `version: "3.5"

services:
  php-apache:
    image: php:8.2-apache-bullseye
    ports:
      - 80:80
    volumes:
      - ./app:/var/www/html
    working_dir: /var/www/html
    container_name: php-apache
`

    expect(phpApacheContent.generate()).toEqual(expectContent)
  })

  test('Change container name', () => {

    const phpApacheContent = new PhpApacheContent()

    phpApacheContent.setContainerName("php_apache_container")

    const expectContent = `version: "3.5"

services:
  php_apache_container:
    image: php:8.2-apache-bullseye
    ports:
      - 80:80
    volumes:
      - ./app:/var/www/html
    working_dir: /var/www/html
    container_name: php_apache_container
`

    expect(phpApacheContent.generate()).toEqual(expectContent)
  })

  test('Select port', () => {
    const additionalConfsFromCommandLice = ["hostport:82"]
    const configureation = {
      dockerComposeYmlGenerator: new DockerComposeYmlGenerator("php_apache", new EnvironmentTypes()),
    }
    configureFromParameters(configureation, additionalConfsFromCommandLice)
  })

  test('Change php version', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.setPhpVersion("8.1")
    const expectContent = `version: "3.5"

services:
  php-apache:
    image: php:8.1-apache-bullseye
    ports:
      - 80:80
    volumes:
      - ./app:/var/www/html
    working_dir: /var/www/html
    container_name: php-apache
`
    expect(phpApacheContent.generate()).toEqual(expectContent)
  })

  test('Network mode', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.setNetworkMode("host")
    const expectContent = `version: "3.5"

services:
  php-apache:
    image: php:8.2-apache-bullseye
    ports:
      - 80:80
    volumes:
      - ./app:/var/www/html
    working_dir: /var/www/html
    container_name: php-apache
    network_mode: host
`
    expect(phpApacheContent.generate()).toEqual(expectContent)
  })

  test('Php Apache Composer with development packages - Dockerfile', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.setDevelopmentCommons()

    const expectedContent = `FROM php:8.2-apache-bullseye

RUN apt-get update
RUN apt-get install -y vim git zip curl wget
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN a2enmod rewrite
RUN mkdir ./app
WORKDIR /app
EXPOSE 80
ENTRYPOINT [ "/usr/sbin/apachectl" ]
CMD ["-D", "FOREGROUND"]
`

    const objectContentResult = phpApacheContent.getDockerfileContent()

    expect(
      objectContentResult
    ).toEqual(
      expectedContent
    )
  })

  test('Php Apache Composer with development packages - docker-compose.yml', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.setDevelopmentCommons()
    phpApacheContent.setPhpVersion("8.1")

    const expectContent = `version: "3.5"

services:
  php-apache:
    build:
      context: .
    ports:
      - 80:80
    volumes:
      - ./app:/var/www/html
    working_dir: /var/www/html
    container_name: php-apache
`
    const generatedContent = phpApacheContent.generate()

    expect(generatedContent).toEqual(expectContent)
  })

  test('Php Apache Composer with development packages - Dockerfile and setting port', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.setDevelopmentCommons()
    phpApacheContent.setPhpVersion("8.1")

    const expectedContent = `FROM php:8.1-apache-bullseye

RUN apt-get update
RUN apt-get install -y vim git zip curl wget
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN a2enmod rewrite
RUN mkdir ./app
WORKDIR /app
EXPOSE 80
ENTRYPOINT [ "/usr/sbin/apachectl" ]
CMD ["-D", "FOREGROUND"]
`

    const objectContentResult = phpApacheContent.getDockerfileContent()

    expect(
      objectContentResult
    ).toEqual(
      expectedContent
    )
  })

  test('Php Apache Composer changing port for object', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.setHostPort("88")

    const expectContent = `version: "3.5"

services:
  php-apache:
    image: php:8.2-apache-bullseye
    ports:
      - 88:80
    volumes:
      - ./app:/var/www/html
    working_dir: /var/www/html
    container_name: php-apache
`
    const generatedContent = phpApacheContent.generate()

    expect(generatedContent).toEqual(expectContent)
  })

  test('Setting a suffix for document web root and checking the Dockerfile output', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.webDocumentRootSuffix("public")

    const expectedContent = `FROM php:8.2-apache-bullseye

COPY ./config/000-default.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite
RUN mkdir ./app
WORKDIR /app
EXPOSE 80
ENTRYPOINT [ "/usr/sbin/apachectl" ]
CMD ["-D", "FOREGROUND"]
`
    expect(phpApacheContent.getDockerfileContent()).toEqual(expectedContent)
  })

  test('Setting a suffix for document root and checking the configuration file content', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.webDocumentRootSuffix("public")
    const expectedContent = `<VirtualHost *:80>

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/public

        ErrorLog \${APACHE_LOG_DIR}/error.log
        CustomLog \${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
`
    expect(phpApacheContent.getHostConfigurationContent()).toEqual(expectedContent)
  })

  test('Setting a suffix for document root and checking the configuration file content witho other value', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.webDocumentRootSuffix("new/www")
    const expectedContent = `<VirtualHost *:80>

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/new/www

        ErrorLog \${APACHE_LOG_DIR}/error.log
        CustomLog \${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
`
    expect(phpApacheContent.getHostConfigurationContent()).toEqual(expectedContent)
  })

  test('Check if additional configurations files shall be not created', () => {
    const phpApacheContent = new PhpApacheContent()
    expect(phpApacheContent.mayWriteConfigurationFile()).toBe(false)
  })

  test('Check if additional configurations files shall be created', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.webDocumentRootSuffix("public")
    expect(phpApacheContent.mayWriteConfigurationFile()).toBe(true)
  })

  test('getHostConfigurationFilePath', () => {
    const phpApacheContent = new PhpApacheContent()
    const configurationFilePath = phpApacheContent.getHostConfigurationFilePath()
    const expectedContent = "config/000-default.conf"
    expect(configurationFilePath).toEqual(expectedContent)
  })

  test('Test generate with different document root path', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.webDocumentRootSuffix("public")

    const expectContent = `version: "3.5"

services:
  php-apache:
    build:
      context: .
    ports:
      - 80:80
    volumes:
      - ./app:/var/www/html
    working_dir: /var/www/html
    container_name: php-apache
`
    const generatedContent = phpApacheContent.generate()

    expect(generatedContent).toEqual(expectContent)
  })

  test('Development content for Dockerfile setting document suffix.', () => {
    const phpApacheContent = new PhpApacheContent()
    phpApacheContent.webDocumentRootSuffix("public")
    phpApacheContent.setDevelopmentCommons()

    const expectedContent = `FROM php:8.2-apache-bullseye

RUN apt-get update
RUN apt-get install -y vim git zip curl wget
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
COPY ./config/000-default.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite
RUN mkdir ./app
WORKDIR /app
EXPOSE 80
ENTRYPOINT [ "/usr/sbin/apachectl" ]
CMD ["-D", "FOREGROUND"]
`

    expect(phpApacheContent.getDockerfileContent()).toEqual(expectedContent)
  })

})
