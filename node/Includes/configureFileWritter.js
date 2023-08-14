import path from 'path';
import ConfigureFileWritterException from "../Exceptions/ConfigureFileWritterException.js"

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
  dockerFileWritter.filePath = filePath;
  const dockerFileContent = dockerComposeYmlGenerator.getDockerfileContent()
  if (dockerFileContent != "") {
    dockerFileWritter.dockerfileContent = dockerFileContent
  }
  if (dockerComposeYmlGenerator.mayWriteConfigurationFile()) {
    const generator = dockerComposeYmlGenerator.getGenerator()
    const fileToCreate = {
      content: generator.getConfigurationsContent(),
      path: path.resolve(baseDir, "configs", "serverblock.conf")
    }
    dockerFileWritter.setAdditionalFileToWrite(fileToCreate)
  }

  return filePath
}
