import { DockerComposeYmlGenerator } from './DockerComposeYmlGenerator.js'
import { FileWritter } from './FileWritter.js'

const dockerComposeYmlGenerator = new DockerComposeYmlGenerator()
const fileWriter = new FileWritter()

fileWriter.fileContent = dockerComposeYmlGenerator.generate()
fileWriter.filePath = './docker-compose.yml'
fileWriter.write()
