import RelationalDbContent from "../../EnvironmentTypes/RelationalDbContent.js"

describe('RelationalDbContent', () => {

  test('Basic', () => {

    const relationalDbContent = new RelationalDbContent()

    const expectContent = `version: "3.5"

services:
  database1:
    image: mariadb:10.7
    ports:
      - 3309:3306
    container_name: database1
    volumes:
      - ./data/mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: phppass
      MYSQL_USER: phpuser
      MYSQL_PASSWORD: phppass
      MYSQL_DATABASE: your_application
`

    expect(relationalDbContent.generate()).toEqual(expectContent)
  })

  test('Setting Container Name', () => {

    const relationalDbContent = new RelationalDbContent()

    relationalDbContent.setContainerName("my_own_database")

    const expectContent = `version: "3.5"

services:
  my_own_database:
    image: mariadb:10.7
    ports:
      - 3309:3306
    container_name: my_own_database
    volumes:
      - ./data/mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: phppass
      MYSQL_USER: phpuser
      MYSQL_PASSWORD: phppass
      MYSQL_DATABASE: your_application
`

    expect(relationalDbContent.generate()).toEqual(expectContent)
  })

  test('Setting Port Number', () => {

    const relationalDbContent = new RelationalDbContent()

    relationalDbContent.setHostPort(3406)

    const expectContent = `version: "3.5"

services:
  database1:
    image: mariadb:10.7
    ports:
      - 3406:3306
    container_name: database1
    volumes:
      - ./data/mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: phppass
      MYSQL_USER: phpuser
      MYSQL_PASSWORD: phppass
      MYSQL_DATABASE: your_application
`

    expect(relationalDbContent.generate()).toEqual(expectContent)
  })

  test('Setting Port Number and Container Name', () => {

    const relationalDbContent = new RelationalDbContent()

    relationalDbContent.setHostPort(3506)
    relationalDbContent.setContainerName("the_database")

    const expectContent = `version: "3.5"

services:
  the_database:
    image: mariadb:10.7
    ports:
      - 3506:3306
    container_name: the_database
    volumes:
      - ./data/mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: phppass
      MYSQL_USER: phpuser
      MYSQL_PASSWORD: phppass
      MYSQL_DATABASE: your_application
`

    expect(relationalDbContent.generate()).toEqual(expectContent)
  })

  test('Allow external', () => {

    const relationalDbContent = new RelationalDbContent()

    relationalDbContent.setExternal()

    const expectContent = `version: "3.5"

services:
  database1:
    image: mariadb:10.7
    ports:
      - 3309:3306
    container_name: database1
    volumes:
      - ./data/mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: phppass
      MYSQL_USER: phpuser
      MYSQL_PASSWORD: phppass
      MYSQL_DATABASE: your_application
networks:
  network1:
    name: bridge
    external: true
`

    expect(relationalDbContent.generate()).toEqual(expectContent)
  })

  test('Template with network_mode changed to host', () => {
    const relationalDbContent = new RelationalDbContent()
    relationalDbContent.setNetworkMode("host")

    const expectContent = `version: "3.5"

services:
  database1:
    image: mariadb:10.7
    container_name: database1
    volumes:
      - ./data/mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: phppass
      MYSQL_USER: phpuser
      MYSQL_PASSWORD: phppass
      MYSQL_DATABASE: your_application
    network_mode: host
`

    expect(relationalDbContent.generate()).toEqual(expectContent)

  })
})