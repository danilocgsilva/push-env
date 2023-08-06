import EnvironmentTypes from "./Includes/EnvironmentTypes.js"
const environmentTypes = new EnvironmentTypes()

const list_environments = _ => {
    let message = environmentTypes.listTypes()
    
    message += `\nSome options also is allowed:

* hostport
* container_name
* base_path
* set_external
* network_mode
* php_version
* dev (only for php_apache, and shoud receive yes or true)

For any of the available options, you can use like this: hostport:<value>

For example, you can type: ./generate <your_environment> hostport:<your_host_port> container_name:<your_container_name>
`
    
    return message
}

export default list_environments