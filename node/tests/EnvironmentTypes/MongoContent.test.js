import MongoContent from "../../EnvironmentTypes/MongoContent.js"

describe('MongoContent', () => {

  test('Basic', () => {
    const mongoContent = new MongoContent()

    const expectedContent = `version: '3.5'

services:
  mongodb:
    image: mongo:latest
    ports:
      - 27017:27017
    container_name: mongodb
    environment:
      MYSQL_ROOT_PASSWORD: phppass
      MYSQL_USER: phpuser
      MYSQL_PASSWORD: phppass
      MYSQL_DATABASE: your_application
`

    expect(mongoContent.generate()).toEqual(expectedContent)
  })

  test('Change Container Name', () => {
    const mongoContent = new MongoContent()

    mongoContent.setContainerName("my_mongodb_container")

    const expectedContent = `version: '3.5'

services:
  my_mongodb_container:
    image: mongo:latest
    ports:
      - 27017:27017
    container_name: my_mongodb_container
    environment:
      MYSQL_ROOT_PASSWORD: phppass
      MYSQL_USER: phpuser
      MYSQL_PASSWORD: phppass
      MYSQL_DATABASE: your_application
`

    expect(mongoContent.generate()).toEqual(expectedContent)
  })

})