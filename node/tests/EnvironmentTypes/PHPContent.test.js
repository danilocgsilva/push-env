import PHPContent from "../../EnvironmentTypes/PHPContent.js"

describe('PHPContent', () => {

  test('Basic', () => {

    const phpContent = new PHPContent()

    const expectContent = `version: "3.5"

services:
  php:
    container_name: php
    build:
      context: .
`

    expect(phpContent.generate()).toEqual(expectContent)
  })

  test('Change Container name', () => {

    const phpContent = new PHPContent()
    phpContent.setContainerName("just_another_php_container")

    const expectContent = `version: "3.5"

services:
  just_another_php_container:
    container_name: just_another_php_container
    build:
      context: .
`

    expect(phpContent.generate()).toEqual(expectContent)
  })

})