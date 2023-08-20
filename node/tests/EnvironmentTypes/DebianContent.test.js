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

  test('Change Container name', () => {

    const debianContent = new DebianContent()
    debianContent.setHostPort("84")

    const expectContent = `version: "3.5"

services:
  debian:
    container_name: debian
    build:
      context: .
    ports:
      - 84:80
`
    expect(debianContent.generate()).toEqual(expectContent)
  })

  test('Test getDockerfileContent', () => {
    const debianContent = new DebianContent()

    const expectedContent = `FROM debian:bookworm

CMD while : ; do sleep 1000; done
`
    
    expect(debianContent.getDockerfileContent()).toEqual(expectedContent)
  })

  test('getDockerFileContent after setting the default entrypoint', () => {
    const debianContent = new DebianContent()
    debianContent.setEntryScript()
    const expectedContent = `FROM debian:bookworm

CMD entry.sh
`

    expect(debianContent.getDockerfileContent()).toEqual(expectedContent)
  })

  test('Additional file contents for default behaviour', () => {
    const debianContent = new DebianContent()
    const additionalFiles = debianContent.getAdditionalFilesWithPathsAndContents()
    expect(additionalFiles.length).toEqual(0)
  })

  test('Additional file contents if getting entry script', () => {
    const debianContent = new DebianContent()
    debianContent.setEntryScript()
    const additionalFiles = debianContent.getAdditionalFilesWithPathsAndContents()
    expect(additionalFiles.length).toEqual(1)
  })

  test('Check configuration content for additional file after setting entry point', () => {
    const debianContent = new DebianContent()
    debianContent.setEntryScript()

    const expectedContent = `#!/bin/bash

while : ; do sleep 1000; done
`
    const returnedEntryContent = debianContent.getAdditionalFilesWithPathsAndContents()[0]

    expect(returnedEntryContent.content).toEqual(expectedContent)
  })

})