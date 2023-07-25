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
    if (optionsKeyValue[0] == "allow_external" && optionsKeyValue[1] == "true") {
      configurations.dockerComposeYmlGenerator.setExternal()
    }
  })
}

export default configureFromParameters