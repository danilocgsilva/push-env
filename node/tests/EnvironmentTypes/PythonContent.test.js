import PythonContent from "../../EnvironmentTypes/PythonContent.js"

describe('PythonContent', () => {
    test('Basic', () => {

        const pythonContent = new PythonContent()

        const expectContent = `version: '3.5'

services:
  python:
    build:
      context: .
    container_name: python`

        expect(pythonContent.generate()).toEqual(expectContent)
    })
})