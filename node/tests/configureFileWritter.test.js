import configureFileWritter from "../Includes/configureFileWritter.js"
import { DockerFileWritter } from "../Includes/DockerFileWritter.js";
import EnvironmentTypes from "../Includes/EnvironmentTypes.js";
import DockerComposeYmlGenerator from "../Includes/DockerComposeYmlGenerator.js";
import ConfigureFileWritterException from "../Exceptions/ConfigureFileWritterException.js"

describe('configureFileWritter', _ => {

  test('Basic configureFileWritter', () => {

    const fileWriter = new DockerFileWritter();
    const baseDir = ''
    const dockerComposeYmlGenerator = new DockerComposeYmlGenerator(
      "php",
      new EnvironmentTypes()
    )

    const t = () => {
      configureFileWritter(
        fileWriter,
        baseDir,
        dockerComposeYmlGenerator)
    };

    expect(t).toThrow(ConfigureFileWritterException);
  })
})
