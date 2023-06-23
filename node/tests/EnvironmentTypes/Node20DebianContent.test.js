import Node20DebianContent from "../../EnvironmentTypes/Node20DebianContent.js"

describe('Node20DebianContent', () => {
    test('Basic', () => {
        const node20DebianContent = new Node20DebianContent()

        const expectedContent = `version: '3.5'
    
services:
  node-20-debian:
    build:
      context: .
    ports:
      - 3002:3000
    volumes:
      - ./app:/app
    container_name: node-20-debian`

      expect(node20DebianContent.generate()).toEqual(expectedContent)
    })
})