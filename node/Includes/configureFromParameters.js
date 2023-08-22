const processSingleInput = (confData, configurations, noticeChanges) => {
  const optionsKeyValue = confData.split(":")

  const keyFromCli = optionsKeyValue[0]
  const valueFromCli = optionsKeyValue[1]

  switch (keyFromCli) {
    case "hostport":
      configurations.dockerComposeYmlGenerator.setHostPort(valueFromCli)
      break
      
    case "container_name":
      configurations.dockerComposeYmlGenerator.containerName = valueFromCli
      configurations.queriedEnvironment += "-" + valueFromCli
      noticeChanges.container_name = valueFromCli
      break;
      
    case "base_path":
      configurations.baseDir = valueFromCli
      break
      
    case "allow_external":
      if (valueFromCli === "true") {
        configurations.dockerComposeYmlGenerator.setExternal()
      }
      break
      
    case "network_mode":
      configurations.dockerComposeYmlGenerator.setNetworkMode(valueFromCli)
      break
      
    case "php_version":
      configurations.dockerComposeYmlGenerator.setPhpVersion(valueFromCli)
      break
      
    case "dev":
      if (valueFromCli === "yes" || valueFromCli === "true") {
        configurations.dockerComposeYmlGenerator.setDevelopmentCommons()
      } else {
        throw new Error("The provided value for the dev context is not known.");
      }
      break

    case "single_container":
      if (valueFromCli === "yes" || valueFromCli === "true") {
        configurations.dockerComposeYmlGenerator.setSingleContainer()
      } else {
        throw new Error("The provided value for the single_container context is not known.");
      }
      break

    case "document_root_suffix":
      configurations.dockerComposeYmlGenerator.webDocumentRootSuffix(valueFromCli)
      break

    case "set_entrypoint":
      
      if (valueFromCli === "yes" || valueFromCli === "true") {
        configurations.dockerComposeYmlGenerator.setEntryScript("", "")
      } else {
        throw new Error("The provided value for the single_container context is not known.");
      }
      break

    default:
      throw new Error(`The argument name provided ${keyFromCli} is not known.`);
  }
}

const configureFromParameters = (configurations, additionalConfsFromCommandLice) => {
  const noticeChanges = {
    "container_name": null,
    "help": false
  }

  additionalConfsFromCommandLice.forEach(confData => {
    if (confData == "help") {
      noticeChanges.help = true
    } else {
      processSingleInput(confData, configurations, noticeChanges)
    }
  })

  return noticeChanges
}

export default configureFromParameters