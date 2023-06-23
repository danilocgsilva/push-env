import MongoContent from "../../EnvironmentTypes/MongoContent"

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
      MYSQL_DATABASE: your_application`
        

        expect(mongoContent.generate()).toEqual(expectedContent)
    })
})