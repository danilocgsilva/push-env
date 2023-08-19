import path from 'path';
import ConfigureFileWritterException from "../Exceptions/ConfigureFileWritterException.js"
import { DockerFileWritter } from './DockerFileWritter.js';
import DockerComposeYmlGenerator from './DockerComposeYmlGenerator.js';

/**
 * @param {DockerFileWritter} dockerFileWritter 
 * @param {string} baseDir 
 * @param {DockerComposeYmlGenerator} dockerComposeYmlGenerator 
 * @returns 
 */
export default function configureFileWritter(
  dockerFileWritter,
  baseDir,
  dockerComposeYmlGenerator
) {
  if (baseDir == "") {
    throw new ConfigureFileWritterException("Base directory has not been given!")
  }
  
  dockerFileWritter.fileContent = dockerComposeYmlGenerator.generate();

  const filePath = path.resolve(baseDir, "./docker-compose.yml");
  dockerFileWritter.dockerFileName = dockerComposeYmlGenerator.getDockerFileName();
  dockerFileWritter.filePath = filePath;
  const dockerFileContent = dockerComposeYmlGenerator.getDockerfileContent()
  if (dockerFileContent != "") {
    dockerFileWritter.dockerfileContent = dockerFileContent
  }
  if (dockerComposeYmlGenerator.mayWriteConfigurationFile()) {

    const generator = dockerComposeYmlGenerator.getGenerator()

    dockerFileWritter.setAdditionalFileToWrite({
      content: generator.getHostConfigurationContent(),
      path: path.resolve(baseDir, generator.getHostConfigurationFilePath())
    })

    const additionalFiles = generator.getAdditionalFilesWithPathsAndContents()
    if (additionalFiles.length !== 0) {
      const fileToCreateDockerfilePhp = additionalFiles[0]
      fileToCreateDockerfilePhp.path = path.resolve(baseDir, fileToCreateDockerfilePhp.path)
      
      dockerFileWritter.setAdditionalFileToWrite(fileToCreateDockerfilePhp)
    }

  }

  return filePath
}
