const configureFromParameters = (configurations, additionalConfsFromCommandLice) => {
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
    }
    if (keyFromCli == "base_path") {
      configurations.baseDir = valueFromCli
    }
    if (keyFromCli == "allow_external" && valueFromCli == "true") {
      configurations.dockerComposeYmlGenerator.setExternal()
    }
  })
}

export default configureFromParameters