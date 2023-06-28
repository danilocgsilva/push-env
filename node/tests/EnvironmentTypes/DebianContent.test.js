import DebianContent from "../../EnvironmentTypes/DebianContent.js"

describe('DebianContent', () => {
    test('Basic', () => {

        const debianContent = new DebianContent()

        const expectContent = `version: "3.5"
services:
  debian:
    image: debian:latest
    container_name: debian
`

        expect(debianContent.generate()).toEqual(expectContent)
    })
})