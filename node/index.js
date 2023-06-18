import DockerComposeYmlGenerator from './DockerComposeYmlGenerator.js'
import { FileWritter } from './FileWritter.js'
import MissingQueryException from './Exceptions/MissingQueryException.js'

const environmentAskedName = process.argv[2]
if (!environmentAskedName) {
    throw new MissingQueryException();
}

const filePath = './docker-compose.yml'

const dockerComposeYmlGenerator = new DockerComposeYmlGenerator(environmentAskedName)
const fileWriter = new FileWritter()

try {
    fileWriter.fileContent = dockerComposeYmlGenerator.generate()
    fileWriter.filePath = './docker-compose.yml'
    fileWriter.write()
    console.log(`Great! A docker-compose.yml file has been generated. Check the file ${filePath}`)
} catch (e) {
    console.log(e)
    console.log('Some error hapenned :\'(')
}
