import PhpApacheWithComposerContent from "../../EnvironmentTypes/PhpApacheWithComposerContent.js";

describe('PhpApacheContent', () => {

  let phpApacheWithComposerContent

  beforeAll((done) => {
    phpApacheWithComposerContent = new PhpApacheWithComposerContent()
    done()
  })

  test('Basic', () => {
    const expectContent = `version: "3.5"

services:
  php-apache-composer:
    build:
      context: .
    ports:
      - 80:80
    volumes:
      - ./app:/var/www/html
    working_dir: /app:/var/www/html
    container_name: php-apache-composer
`

    expect(phpApacheWithComposerContent.generate()).toEqual(expectContent)
  })

  test('getDockerfileContent', () => {
    const expectContent = `FROM php:8.2-apache-bullseye

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN mkdir ./app
WORKDIR /app
 
CMD while : ; do sleep 1000; done
`

    expect(phpApacheWithComposerContent.getDockerfileContent()).toEqual(expectContent)
  })

  test('Change Container Name', () => {
    phpApacheWithComposerContent.setContainerName("php_apache_and_composer")

    const expectContent = `version: "3.5"

services:
  php_apache_and_composer:
    build:
      context: .
    ports:
      - 80:80
    volumes:
      - ./app:/var/www/html
    working_dir: /app:/var/www/html
    container_name: php_apache_and_composer
`

    expect(phpApacheWithComposerContent.generate()).toEqual(expectContent)
  })

  test('Set network mode', () => {
    phpApacheWithComposerContent.setNetworkMode("host")
    const expectContent = `version: "3.5"

services:
  php_apache_and_composer:
    build:
      context: .
    ports:
      - 80:80
    volumes:
      - ./app:/var/www/html
    working_dir: /app:/var/www/html
    container_name: php_apache_and_composer
    network_mode: host
`

    expect(phpApacheWithComposerContent.generate()).toEqual(expectContent)
  })

})
