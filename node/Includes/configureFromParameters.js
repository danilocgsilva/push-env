const configureFromParameters = (configurations, additionalConfsFromCommandLice) => {

  const noticeChanges = {
    "container_name": null
  }
  
  additionalConfsFromCommandLice.forEach(confData => {
    const optionsKeyValue = confData.split(":")

    const keyFromCli = optionsKeyValue[0]
    const valueFromCli = optionsKeyValue[1]

    if (keyFromCli == "hostport") {
      configurations.dockerComposeYmlGenerator.setHostPort(valueFromCli)
    }
    if (keyFromCli == "container_name") {
      configurations.dockerComposeYmlGenerator.containerName = valueFromCli
      configurations.queriedEnvironment += "-" + valueFromCli
      noticeChanges.container_name = valueFromCli

    }
    if (keyFromCli == "base_path") {
      configurations.baseDir = valueFromCli
    }
    if (keyFromCli == "allow_external" && valueFromCli == "true") {
      configurations.dockerComposeYmlGenerator.setExternal()
    }
    if (keyFromCli == "network_mode") {
      configurations.dockerComposeYmlGenerator.setNetworkMode(valueFromCli)
    }
    if (keyFromCli == "php_version") {
      configurations.dockerComposeYmlGenerator.setPhpVersion(valueFromCli)
    }
    if (keyFromCli == "dev") {
      if (valueFromCli == "yes" || valueFromCli == "true") {
        configurations.dockerComposeYmlGenerator.setDevelopmentCommons()
      } else {
        throw new Error("The provided value for the dev context is not known.")
      }
    }
  })

  return noticeChanges
}

export default configureFromParameters