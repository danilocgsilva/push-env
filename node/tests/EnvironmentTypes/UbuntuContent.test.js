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
})