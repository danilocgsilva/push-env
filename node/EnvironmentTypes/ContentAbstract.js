import { parseDocument } from 'yaml'
import NotFromCurrentContentClass from '../Exceptions/NotFromCurrentContentClass.js'

export default class ContentAbstract {
  _containerName
  #networkMode
  #customEntryScript

  constructor() {
    this._containerName = ""
    this.#networkMode = ""
    this.#customEntryScript = {}
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

  setPhpVersion(phpVersion) {
    throw new NotFromCurrentContentClass("This method is not designed to work with this class.")
  }

  writeConfigurationFiles() {
    throw new NotFromCurrentContentClass("This method is not designed to work with this class.")
  }

  setDevelopmentCommons() {
    throw new NotFromCurrentContentClass("This method is not designed to work with this class.")
  }

  setSingleContainer() {
    throw new NotFromCurrentContentClass("This method is not designed to work with this class.")
  }

  /**
   * Set the name for an entry script, after the build process.
   * By default, the class will have am empty string, which means there is no nedded to write an entry shell script.
   * 
   * @param {string} name 
   */
  setEntryScript(path, content) {
    let settedPath
    let settedContent
    if (path === "" || path === undefined) {
      settedPath = "entry.sh"
    }
    if (content === "" || path === undefined) {
      settedContent = `#!/bin/bash

while : ; do sleep 1000; done
`
    }

    this.#customEntryScript = {
      path: settedPath,
      content: settedContent
    }
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

  webDocumentRootSuffix(valueFromCli) {
    throw new NotFromCurrentContentClass("This method (webDocumentRootSuffix) is not designed to work with this class.")
  }

  getHostConfigurationContent() {
    return ""
  }

  entryScriptIsSetted() {
    const stringfiedEntryScriptObject = JSON.stringify(this.#customEntryScript)
    const emptyStringfied = JSON.stringify({})
    return stringfiedEntryScriptObject !== emptyStringfied
  }
  
}