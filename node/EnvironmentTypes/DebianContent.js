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
    // const parser = new Parser()

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

    // const doc = new YAML.Document()

    const doc = parseDocument(dockerComposeData, { lineCounter })

    doc.contents = dockerComposeData

    const dockerComposeYml = doc.toString()

//     const dockerComposeYml = `version: '3.5'

// services:
//   ${containerName}:
//     image: debian:latest
//     container_name: ${containerName}`;

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "";
  }
}
