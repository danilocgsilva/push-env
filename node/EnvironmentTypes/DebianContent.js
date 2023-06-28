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
          container_name: containerName,
          build: {
            context: "."
          }
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
    const dockerfileContent = `FROM debian:bullseye

CMD while : ; do sleep 1000; done`;

    return dockerfileContent;
  }
}
