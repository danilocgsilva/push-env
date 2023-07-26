import Node20DebianContent from "../../EnvironmentTypes/Node20DebianContent.js"

describe('Node20DebianContent', () => {

  test('Basic', () => {
    const node20DebianContent = new Node20DebianContent()

    const expectedContent = `version: "3.5"

services:
  node-20-debian:
    build:
      context: .
    ports:
      - 3002:3000
    volumes:
      - ./app:/app
    container_name: node-20-debian
`

    expect(node20DebianContent.generate()).toEqual(expectedContent)
  })

  test('Setting Container Name', () => {
    const node20DebianContent = new Node20DebianContent()

    node20DebianContent.setContainerName("node_based_on_debian")

    const expectedContent = `version: "3.5"

services:
  node_based_on_debian:
    build:
      context: .
    ports:
      - 3002:3000
    volumes:
      - ./app:/app
    container_name: node_based_on_debian
`

    expect(node20DebianContent.generate()).toEqual(expectedContent)
  })

  test('Set network mode', () => {
    const node20DebianContent = new Node20DebianContent()

    node20DebianContent.setContainerName("node_based_on_debian")
    node20DebianContent.setNetworkMode("host")

    const expectedContent = `version: "3.5"

services:
  node_based_on_debian:
    build:
      context: .
    ports:
      - 3002:3000
    volumes:
      - ./app:/app
    container_name: node_based_on_debian
    network_mode: host
`

    expect(node20DebianContent.generate()).toEqual(expectedContent)
  })

})