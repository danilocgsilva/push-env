import DockerComposeYmlGenerator from "./Includes/DockerComposeYmlGenerator.js";
import configureFileWritter from "./Includes/configureFileWritter.js";
import EnvironmentTypes from "./Includes/EnvironmentTypes.js";
import configureFromParameters from "./Includes/configureFromParameters.js"
import { FileWritter } from "./Includes/FileWritter.js";
import MissingQueryException from "./Exceptions/MissingQueryException.js";
import GeneratorNotImplementedException from "./Exceptions/GeneratorNotImplementedException.js";
import { homedir } from 'os'
import path from 'path';
import ShallNotReplaceFile from "./Exceptions/ShallNotReplaceFile.js";

const environmentAskedName = process.argv[2];
if (!environmentAskedName) {
  throw new MissingQueryException();
}

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
if (noticeChanges.container_name) {
  configurations.baseDir = `${configurations.baseDir}-${noticeChanges.container_name}`
}

const filePath = configureFileWritter(
  fileWriter,
  configurations.baseDir,
  configurations.dockerComposeYmlGenerator
)

try {
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
  } else if (e instanceof ShallNotReplaceFile) {
    const message = `A folder called ${filePath} already exists. Doing nothing.`
    console.log(message)
  } else {
    console.log(e);
    console.log("Some error hapenned :'(");
  }
}
