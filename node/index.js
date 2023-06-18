import DockerComposeYmlGenerator from "./DockerComposeYmlGenerator.js";
import { FileWritter } from "./FileWritter.js";
import MissingQueryException from "./Exceptions/MissingQueryException.js";
import GeneratorNotImplementedException from "./Exceptions/GeneratorNotImplementedException.js";
import EnvironmentTypes from "./EnvironmentTypes.js";

const environmentAskedName = process.argv[2];
if (!environmentAskedName) {
  throw new MissingQueryException();
}

try {
  const dockerComposeYmlGenerator = new DockerComposeYmlGenerator(environmentAskedName, new EnvironmentTypes());
  const fileWriter = new FileWritter();

  fileWriter.fileContent = dockerComposeYmlGenerator.generate();
  const filePath = "./docker-compose.yml";
  fileWriter.filePath = filePath;
  fileWriter.write();
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
