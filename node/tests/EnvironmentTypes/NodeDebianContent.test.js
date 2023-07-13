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
    container_name: node-debian
`

    expect(nodeDebianContent.generate()).toEqual(expectContent)
  })

  test('Change Container name', () => {

    const nodeDebianContent = new NodeDebianContent()

    nodeDebianContent.setContainerName("some_debian_container")

    const expectContent = `version: '3.5'
    
services:
  some_debian_container:
    build:
      context: .
    ports:
      - 3000:3000
    volumes:
      - ./app:/app
    container_name: some_debian_container
`

    expect(nodeDebianContent.generate()).toEqual(expectContent)
  })

})