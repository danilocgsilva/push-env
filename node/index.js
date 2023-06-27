import DockerComposeYmlGenerator from "./DockerComposeYmlGenerator.js";
import { FileWritter } from "./FileWritter.js";
import MissingQueryException from "./Exceptions/MissingQueryException.js";
import GeneratorNotImplementedException from "./Exceptions/GeneratorNotImplementedException.js";
import EnvironmentTypes from "./EnvironmentTypes.js";
import configureFileWritter from "./configureFileWritter.js";
import { homedir } from 'os'
import path from 'path';

const configureFromParameters = (configurations, additionalConfsFromCommandLice) => {
  additionalConfsFromCommandLice.forEach(confData => {
    const optionsKeyValue = confData.split(":")
    if (optionsKeyValue[0] == "hostport") {
      configurations.dockerComposeYmlGenerator.setHostPort(optionsKeyValue[1])
    }
    if (optionsKeyValue[0] == "container_name") {
      configurations.dockerComposeYmlGenerator.containerName = optionsKeyValue[1]
      configurations.queriedEnvironment += "-" + optionsKeyValue[1]
    }
    if (optionsKeyValue[0] == "base_path") {
      configurations.baseDir = optionsKeyValue[1]
    }
  })
}

const environmentAskedName = process.argv[2];
if (!environmentAskedName) {
  throw new MissingQueryException();
}

try {
  const fileWriter = new FileWritter();

  const additionalConfsFromCommandLice = process.argv.slice(3)
  const configurations = {
    baseDir: "",
    dockerComposeYmlGenerator: new DockerComposeYmlGenerator(environmentAskedName, new EnvironmentTypes()),
    queriedEnvironment: environmentAskedName
  }

  configureFromParameters(configurations, additionalConfsFromCommandLice)

  if (configurations.baseDir == "") {
    configurations.baseDir = path.resolve(homedir(), "docker-environments", configurations.queriedEnvironment)
  }

  const filePath = configureFileWritter(
    fileWriter, 
    configurations.baseDir, 
    configurations.dockerComposeYmlGenerator, 
    configurations.queriedEnvironment,
  )
  await fileWriter.write();
  console.log(
    `Great! A docker-compose.yml file has been generated. Check the file ${filePath}`
  );
} catch (e) {
  if (e instanceof GeneratorNotImplementedException) {
    const message = "Error. Ever you provided a not existing environment? Check out the allowed ones:"
    console.log(message)

    const environmentTypes = new EnvironmentTypes();
    environmentTypes.listTypes();
  } else {
    console.log(e);
    console.log("Some error hapenned :'(");
  }
}
