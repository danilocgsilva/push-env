import path from 'path';

export default function configureFileWritter(
  fileWriter, 
  homedir, 
  dockerComposeYmlGenerator, 
  environmentAskedName,
  argumentsFromCommandLine
) {
    const additionalConfsFromCommandLice = argumentsFromCommandLine.slice(3)
    let queriedEnvironment = environmentAskedName
    additionalConfsFromCommandLice.forEach((confData, index, theArray) => {
      const optionsKeyValue = confData.split(":")
      if (optionsKeyValue[0] == "hostport") {
        dockerComposeYmlGenerator.setHostPort(optionsKeyValue[1])
      }
      if (optionsKeyValue[0] == "container_name") {
        dockerComposeYmlGenerator.containerName = optionsKeyValue[1]
        queriedEnvironment += "-" + optionsKeyValue[1]
      }
    })

    fileWriter.fileContent = dockerComposeYmlGenerator.generate();

    const filePath = path.resolve(homedir(), "docker-environments", queriedEnvironment, "./docker-compose.yml");
    fileWriter.filePath = filePath;
    const dockerFileContent = dockerComposeYmlGenerator.getDockerfileContent()
    if (dockerFileContent != "") {
      fileWriter.dockerfileContent = dockerFileContent
    }

    return filePath
}
