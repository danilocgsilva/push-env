import configureFromParameters from "../Includes/configureFromParameters.js";
import DockerComposeYmlGenerator from "../Includes/DockerComposeYmlGenerator.js";
import EnvironmentTypes from "../Includes/EnvironmentTypes.js";
import NotFromCurrentContentClass from "../Exceptions/NotFromCurrentContentClass.js";

describe('configureFromParameters', () => {

  test('Basic test for Debian content', () => {
    const t = () => {
      const configurations = {
        baseDir: "",
        dockerComposeYmlGenerator: new DockerComposeYmlGenerator("debian", new EnvironmentTypes()),
        queriedEnvironment: "debian"
      }
  
      configureFromParameters(configurations, [])
  
      configurations.dockerComposeYmlGenerator.getHostPort()
    };

    expect(t).toThrow(NotFromCurrentContentClass);
  })

  test('Must recover host port from PHPApacheContent', () => {
    const configurations = {
      baseDir: "",
      dockerComposeYmlGenerator: new DockerComposeYmlGenerator("php_apache", new EnvironmentTypes()),
      queriedEnvironment: "debian"
    }

    configureFromParameters(configurations, ["hostport:82"])

    expect(
      configurations.dockerComposeYmlGenerator.getHostPort()
    ).toEqual(
      "82"
    )
  })
  
  test('Setting php version PHPApacheContent', () => {
    const configurations = {
      baseDir: "",
      dockerComposeYmlGenerator: new DockerComposeYmlGenerator("php_apache", new EnvironmentTypes()),
      queriedEnvironment: "php_apache"
    }

    expect(
      configurations.dockerComposeYmlGenerator.getPhpVersion()
    ).toEqual(
      "8.2"
    )
  })

  test('Setting php version PHPApacheContent configured', () => {
    const configurations = {
      baseDir: "",
      dockerComposeYmlGenerator: new DockerComposeYmlGenerator("php_apache", new EnvironmentTypes()),
      queriedEnvironment: "php_apache"
    }

    configureFromParameters(configurations, ["php_version:8.1"])

    expect(
      configurations.dockerComposeYmlGenerator.getPhpVersion()
    ).toEqual(
      "8.1"
    )
  })

  test('Must throws Error if tries to get php version from NodeContent', () => {

    const t = () => {
      const configurations = {
        baseDir: "",
        dockerComposeYmlGenerator: new DockerComposeYmlGenerator("node", new EnvironmentTypes()),
        queriedEnvironment: "node"
      }
  
      configureFromParameters(configurations, [])
  
      configurations.dockerComposeYmlGenerator.getHostPort()
    }

    expect(t).toThrow(NotFromCurrentContentClass);
  })

  test('Must throws Error if tries to set php version from NodeContent', () => {
    const t = () => {
      const configurations = {
        baseDir: "",
        dockerComposeYmlGenerator: new DockerComposeYmlGenerator("node", new EnvironmentTypes()),
        queriedEnvironment: "node"
      }
  
      configureFromParameters(configurations, ["php_version:8.1"])
    }

    expect(t).toThrow(NotFromCurrentContentClass);
  })
})
