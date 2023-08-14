import fs from "fs";
import path from "path";
import ShallNotReplaceFile from "../Exceptions/ShallNotReplaceFile.js"

export class DockerFileWritter {
  #filePath = null
  #fileContent = null
  #directoryPath = null
  #dockerfilePath = null
  #dockerfileContent = ""
  #additionalFilesToWrite = []

  set filePath(filePath) {
    this.#filePath = filePath
    this.#directoryPath = path.dirname(this.#filePath)
    this.#dockerfilePath = path.resolve(this.#directoryPath, "Dockerfile")
  }

  set fileContent(fileContent) {
    this.#fileContent = fileContent;
  }

  set dockerfileContent(dockerFileContent) {
    this.#dockerfileContent = dockerFileContent
  }

  async write() {
    this.writeFolders();
    await this.writeDockerComposeYmlFile();
    if (this.#dockerfileContent != "") {
      await this.writeDockerFile();
    }
    await this._writeConfigurationsFiles()
  }

  writeFolders() {
    if (!fs.existsSync(this.#directoryPath)) {
      fs.mkdirSync(this.#directoryPath, { recursive: true });
    }
  }

  setAdditionalFileToWrite(fileToCreate) {
    this.#additionalFilesToWrite.push(fileToCreate)
  }

  async writeDockerFile() {
    await fs.writeFile(this.#dockerfilePath, this.#dockerfileContent, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  async writeDockerComposeYmlFile() {
    if (fs.existsSync(this.#filePath)) {
      throw new ShallNotReplaceFile()
    }

    await fs.writeFile(this.#filePath, this.#fileContent, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  async _writeConfigurationsFiles() {
    for (const element of this.#additionalFilesToWrite) {
      await fs.writeFile(element.path, element.content, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
}
