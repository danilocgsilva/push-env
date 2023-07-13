import NodeContent from "../../EnvironmentTypes/NodeContent.js"

describe('NodeContent', () => {
  test('Basic', () => {
    const nodeContent = new NodeContent()

    const expectedContent = `version: "3.5"

services:
  node:
    build:
      context: .
    ports:
      - 3000:3000
    volumes:
      - ./app:/app
    container_name: node
`

    expect(nodeContent.generate()).toEqual(expectedContent)
  })

  test('Setting Host port', () => {
    const nodeContent = new NodeContent()

    nodeContent.setHostPort(3002)

    const expectContent = `version: "3.5"

services:
  node:
    build:
      context: .
    ports:
      - 3002:3000
    volumes:
      - ./app:/app
    container_name: node
`

    expect(nodeContent.generate()).toEqual(expectContent)
  })

  test('Setting Container Name', () => {
    const nodeContent = new NodeContent()

    nodeContent.setContainerName("my_node_container")

    const expectContent = `version: "3.5"

services:
  my_node_container:
    build:
      context: .
    ports:
      - 3000:3000
    volumes:
      - ./app:/app
    container_name: my_node_container
`

    expect(nodeContent.generate()).toEqual(expectContent)
  })

})