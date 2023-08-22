import PHPContent from "../../EnvironmentTypes/PHPContent.js"

describe('PHPContent', () => {

  test('Basic', () => {

    const phpContent = new PHPContent()

    const expectContent = `version: "3.5"

services:
  php:
    container_name: php
    build:
      context: .
`

    expect(phpContent.generate()).toEqual(expectContent)
  })

  test('Change Container name', () => {

    const phpContent = new PHPContent()
    phpContent.setContainerName("just_another_php_container")

    const expectContent = `version: "3.5"

services:
  just_another_php_container:
    container_name: just_another_php_container
    build:
      context: .
`

    expect(phpContent.generate()).toEqual(expectContent)
  })

  test('Network mode', () => {
    const phpContent = new PHPContent()

    phpContent.setNetworkMode("host")

    const expectContent = `version: "3.5"

services:
  php:
    container_name: php
    build:
      context: .
    network_mode: host
`
    expect(phpContent.generate()).toEqual(expectContent)
  })

  test('Test for getDockerfileContent', () => {
    const phpContent = new PHPContent()
    const expectedContent = "FROM php:latest"

    expect(phpContent.getDockerfileContent()).toEqual(expectedContent)
  })

  test('getDockerfileContent, with development assets', () => {
    const phpContent = new PHPContent()
    phpContent.setDevelopmentCommons()

    const expectedContent = `FROM php:latest

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install vim git curl wget zip -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug
COPY configs/docker-php-ext-xdebug.ini /usr/local/etc/php/conf.d
`
    expect(phpContent.getDockerfileContent()).toEqual(expectedContent)
  })

  test('getDockerfileContent setting php version', () => {
    const phpContent = new PHPContent()
    phpContent.setPhpVersion("8.1")
    const expectedContent = "FROM php:8.1"
    expect(phpContent.getDockerfileContent()).toEqual(expectedContent)
  })

  test('getDockerfileContent setting php version and with development packages', () => {
    const phpContent = new PHPContent()
    phpContent.setDevelopmentCommons()
    phpContent.setPhpVersion("8.0")
    const expectedContent = `FROM php:8.0

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install vim git curl wget zip -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug
COPY configs/docker-php-ext-xdebug.ini /usr/local/etc/php/conf.d
`
    expect(phpContent.getDockerfileContent()).toEqual(expectedContent)
  })
})