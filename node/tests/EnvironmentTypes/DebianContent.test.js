import DebianContent from "../../EnvironmentTypes/DebianContent.js"

describe('DebianContent', () => {

  test('Basic', () => {

    const debianContent = new DebianContent()

    const expectContent = `version: "3.5"

services:
  debian:
    container_name: debian
    build:
      context: .
`

    expect(debianContent.generate()).toEqual(expectContent)
  })

  test('Change Container name', () => {

    const debianContent = new DebianContent()
    debianContent.setContainerName("just_another_debian_container")

    const expectContent = `version: "3.5"

services:
  just_another_debian_container:
    container_name: just_another_debian_container
    build:
      context: .
`

    expect(debianContent.generate()).toEqual(expectContent)
  })

})