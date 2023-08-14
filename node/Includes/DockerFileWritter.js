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
  #dockerFileName = ""

  set dockerFileName(dockerFileName) {
    this.#dockerFileName = dockerFileName
  }

  set filePath(filePath) {
    this.#filePath = filePath
    this.#directoryPath = path.dirname(this.#filePath)
    this.#dockerfilePath = path.resolve(this.#directoryPath, this.#dockerFileName)
  }

  set fileContent(fileContent) {
    this.#fileContent = fileContent;
  }

  get fileContent() {
    return this.#fileContent
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
      const directoryPath = path.dirname(element.path)

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }
      
      await fs.writeFile(element.path, element.content, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
}
