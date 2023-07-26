import path from 'path';

export default function configureFileWritter(
  fileWriter,
  baseDir,
  dockerComposeYmlGenerator
) {
  if (baseDir == "") {
    throw new Error("Base directory has not been given!")
  }
  
  fileWriter.fileContent = dockerComposeYmlGenerator.generate();

  const filePath = path.resolve(baseDir, "./docker-compose.yml");
  fileWriter.filePath = filePath;
  const dockerFileContent = dockerComposeYmlGenerator.getDockerfileContent()
  if (dockerFileContent != "") {
    fileWriter.dockerfileContent = dockerFileContent
  }

  return filePath
}