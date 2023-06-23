import NodeContent from "../../EnvironmentTypes/NodeContent.js"

describe('NodeContent', () => {
    test('Basic', () => {
        const nodeContent = new NodeContent()

        const expectedContent = `version: '3.5'

services:
  node:
    build:
      context: .
    ports:
      - 3000:3000
    volumes:
      - ./app:/app
    container_name: node`

        expect(nodeContent.generate()).toEqual(expectedContent)
    })
})