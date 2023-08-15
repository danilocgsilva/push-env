import { parseDocument } from 'yaml'
import NotFromCurrentContentClass from '../Exceptions/NotFromCurrentContentClass.js'

export default class ContentAbstract {
  _containerName
  #networkMode

  constructor() {
    this._containerName = ""
    this.#networkMode = ""
  }

  setContainerName(containerName) {
    this._containerName = containerName
  }

  getContainerName() {
    return this._containerName
  }

  setNetworkMode(networkMode) {
    this.#networkMode = networkMode
  }

  getNetworkMode() {
    return this.#networkMode
  }

  addBlankLine(stringToInsertBlankLine, lineNumber) {
    const lines = stringToInsertBlankLine.split("\n")

    if (lineNumber >= 0 && lineNumber <= lines.length) {
      lines.splice(lineNumber, 0, "")
    } else {
      throw new Error("Line number is out of range.")
    }

    return lines.join("\n")
  }

  getContentFinalStringFromYml(dockerComposeData) {
    const doc = parseDocument(dockerComposeData)
    doc.contents = dockerComposeData
    let dockerComposeYml = doc.toString()
    dockerComposeYml = this.addBlankLine(dockerComposeYml, 1)
    return dockerComposeYml
  }

  mayWriteConfigurationFile() {
    return false
  }

  setHostPort() {
    throw new NotFromCurrentContentClass("This method is not designed to work with this class.")
  }

  getHostPort() {
    throw new NotFromCurrentContentClass("This method is not designed to work with this class.")
  }

  getPhpVersion() {
    throw new NotFromCurrentContentClass("This method is not designed to work with this class.")
  }

  setPhpVersion() {
    throw new NotFromCurrentContentClass("This method is not designed to work with this class.")
  }

  writeConfigurationFiles() {
    throw new NotFromCurrentContentClass("This method is not designed to work with this class.")
  }

  setDevelopmentCommons() {
    throw new NotFromCurrentContentClass("This method is not designed to work with this class.")
  }

  help() {
    return "Help not implemented yet. Sorry!"
  }

  getDockerFileName() {
    return "Dockerfile"
  }

  getAdditionalFilesWithPathsAndContents() {
    return []
  }
}