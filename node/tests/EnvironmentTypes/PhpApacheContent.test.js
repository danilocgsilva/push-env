import PhpApacheContent from "../../EnvironmentTypes/PhpApacheContent.js"

describe('PhpApacheContent', () => {

  test('Basic', () => {

    const phpApacheContent = new PhpApacheContent()

    const expectContent = `version: '3.5'

services:
  php-apache:
    image: php:8.2-apache-bullseye
    ports:
      - 80:80
    volumes:
      - ./app:/var/www/html
    working_dir: /app:/var/www/html
    container_name: php-apache
`

    expect(phpApacheContent.generate()).toEqual(expectContent)
  })

  test('Change container name', () => {

    const phpApacheContent = new PhpApacheContent()

    phpApacheContent.setContainerName("php_apache_container")

    const expectContent = `version: '3.5'

services:
  php_apache_container:
    image: php:8.2-apache-bullseye
    ports:
      - 80:80
    volumes:
      - ./app:/var/www/html
    working_dir: /app:/var/www/html
    container_name: php_apache_container
`

    expect(phpApacheContent.generate()).toEqual(expectContent)
  })

})