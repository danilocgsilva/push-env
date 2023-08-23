import DockerComposeYmlGenerator from "./Includes/DockerComposeYmlGenerator.js";
import EnvironmentTypes from "./Includes/EnvironmentTypes.js";
import configureFromParameters from "./Includes/configureFromParameters.js"
import { DockerFileWritter } from "./Includes/DockerFileWritter.js";
import GeneratorNotImplementedException from "./Exceptions/GeneratorNotImplementedException.js";
import { homedir } from 'os'
import path from 'path';
import ShallNotReplaceFile from "./Exceptions/ShallNotReplaceFile.js";
import list_environments from "./list_environments_back.js";
import processFileWritting from "./Includes/processFileWritting.js";

const environmentAskedName = process.argv[2];
if (!environmentAskedName) {

  console.log("You have provided no environment in the command line. Check the available ones and also some options: \n")
  
  console.log(
    list_environments()
  )
  process.exit(0)
}

let filePath
try {
  const dockerFileWritter = new DockerFileWritter();
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
    processFileWritting(noticeChanges, configurations, filePath, dockerFileWritter)
  }

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
