import PythonContent from "../../EnvironmentTypes/PythonContent.js"

describe('PythonContent', () => {

  test('Basic', () => {

    const pythonContent = new PythonContent()

    const expectContent = `version: '3.5'

services:
  python:
    build:
      context: .
    container_name: python
`

    expect(pythonContent.generate()).toEqual(expectContent)
  })

  test('Set Container Name', () => {

    const pythonContent = new PythonContent()

    pythonContent.setContainerName("python_container")

    const expectContent = `version: '3.5'

services:
  python_container:
    build:
      context: .
    container_name: python_container
`

    expect(pythonContent.generate()).toEqual(expectContent)
  })


})