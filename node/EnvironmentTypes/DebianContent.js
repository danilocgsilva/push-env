import ContentAbstract from "./ContentAbstract.js";
import YAML from "yaml"
// import { LineCounter, Parser } from 'yaml'
import { LineCounter, parseDocument } from 'yaml'

export default class DebianContent extends ContentAbstract {
  constructor() {
    super()
  }
  generate() {
    const containerName = this.getContainerName() == "" ? "debian" : this.getContainerName()

    const lineCounter = new LineCounter()

    lineCounter.linePos(3)

    const dockerComposeData = {
      version: "3.5",
      services: {
        debian: {
          image: "debian:latest",
          container_name: containerName
        }
      }
    }

    const doc = parseDocument(dockerComposeData, { lineCounter })

    doc.contents = dockerComposeData

    let dockerComposeYml = doc.toString()

    dockerComposeYml = this.addBlankLine(dockerComposeYml, 1)

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "";
  }
}
