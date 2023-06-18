import path from 'path';

export default function configureFileWritter(fileWriter, homedir, dockerComposeYmlGenerator, environmentAskedName) {
    fileWriter.fileContent = dockerComposeYmlGenerator.generate();
    const filePath = path.resolve(homedir(), "docker-environments", environmentAskedName, "./docker-compose.yml");
    fileWriter.filePath = filePath;
    const dockerFileContent = dockerComposeYmlGenerator.getDockerfileContent()
    if (dockerFileContent != "") {
      fileWriter.dockerfileContent = dockerFileContent
    }

    return filePath
}