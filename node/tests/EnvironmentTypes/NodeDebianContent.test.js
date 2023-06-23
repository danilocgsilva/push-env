import NodeDebianContent from "../../EnvironmentTypes/NodeDebianContent.js"

describe('NodeDebianContent', () => {
    test('Basic', () => {

        const nodeDebianContent = new NodeDebianContent()

        const expectContent = `version: '3.5'
    
services:
  node-debian:
    build:
      context: .
    ports:
      - 3000:3000
    volumes:
      - ./app:/app
    container_name: node-debian`

        expect(nodeDebianContent.generate()).toEqual(expectContent)
    })
})