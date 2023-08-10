import ApacheContent from "../../EnvironmentTypes/ApacheContent.js"

describe('ApacheContent', () => {

  test('Basic', () => {
    const apacheContent = new ApacheContent()
    const expectContent = `version: "3.5"

services:
  apache:
    container_name: apache
    image: httpd:2.4
    ports:
      - 80:80
`
    expect(apacheContent.generate()).toEqual(expectContent)
  })

})