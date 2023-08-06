import DockerComposeYmlGenerator from "./Includes/DockerComposeYmlGenerator.js";
import configureFileWritter from "./Includes/configureFileWritter.js";
import EnvironmentTypes from "./Includes/EnvironmentTypes.js";
import configureFromParameters from "./Includes/configureFromParameters.js"
import { FileWritter } from "./Includes/FileWritter.js";
import GeneratorNotImplementedException from "./Exceptions/GeneratorNotImplementedException.js";
import { homedir } from 'os'
import path from 'path';
import ShallNotReplaceFile from "./Exceptions/ShallNotReplaceFile.js";
import list_environments from "./list_environments_back.js";

const environmentAskedName = process.argv[2];
if (!environmentAskedName) {

  console.log("You have provided no environment in the command line. Check the available ones and also some options: \n")
  
  console.log(
    list_environments()
  )
  process.exit(0)
}

const processFileWritting = async (noticeChanges, configurations, filePath, fileWriter) => {
  if (noticeChanges.container_name) {
    configurations.baseDir = `${configurations.baseDir}-${noticeChanges.container_name}`
  }
  filePath = configureFileWritter(
    fileWriter,
    configurations.baseDir,
    configurations.dockerComposeYmlGenerator
  )
  await fileWriter.write();
  console.log(
    `Great! A docker-compose.yml file has been generated. Check the file ${filePath}`
  );
}

let filePath
try {
  const fileWriter = new FileWritter();
  const additionalConfsFromCommandLice = process.argv.slice(3)
  const configurations = {
    baseDir: path.resolve(homedir(), "docker-environments", environmentAskedName),
    dockerComposeYmlGenerator: new DockerComposeYmlGenerator(
      environmentAskedName,
      new EnvironmentTypes()
    ),
    queriedEnvironment: environmentAskedName
  }
  const noticeChanges = configureFromParameters(configurations, additionalConfsFromCommandLice)
  
  if (noticeChanges.help) {
    console.log(configurations.dockerComposeYmlGenerator.help())
  } else {
    processFileWritting(noticeChanges, configurations, filePath, fileWriter)
  }

} catch (e) {
  if (e instanceof GeneratorNotImplementedException) {
    const message = "Error. Ever you provided a not existing environment? Check out the allowed ones:"
    console.log(message)

    const environmentTypes = new EnvironmentTypes();
    environmentTypes.listTypes();
    console.log("pass")
  } else if (e instanceof ShallNotReplaceFile) {
    const message = `A folder called ${filePath} already exists. Doing nothing.`
    console.log(message)
  } else {
    console.log(e);
    console.log("Some error hapenned :'(");
  }
}
