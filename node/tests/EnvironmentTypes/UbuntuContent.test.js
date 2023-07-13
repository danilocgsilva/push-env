import UbuntuContent from "../../EnvironmentTypes/UbuntuContent.js"

describe('UbuntuContent', () => {

  test('Basic', () => {

    const ubuntuContent = new UbuntuContent()

    const expectContent = `version: "3.5"

services:
  ubuntu:
    container_name: ubuntu
    build:
      context: .
`

    expect(ubuntuContent.generate()).toEqual(expectContent)
  })

  test('Changing Container Name', () => {

    const ubuntuContent = new UbuntuContent()
    ubuntuContent.setContainerName("ubuntu_container")

    const expectContent = `version: "3.5"

services:
  ubuntu_container:
    container_name: ubuntu_container
    build:
      context: .
`

    expect(ubuntuContent.generate()).toEqual(expectContent)
  })

})