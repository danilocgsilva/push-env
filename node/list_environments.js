import EnvironmentTypes from "./Includes/EnvironmentTypes.js"

const environmentTypes = new EnvironmentTypes()
console.log(environmentTypes.listTypes())

const message = `Some options also is allowed:

* hostport
* container_name
* base_path
* set_external
* network_mode
* php_version

For any of the available options, you can use its just as follows in the command line: hostport:<value>

For example, you can type: ./generate <your_environment> hostport:<your_host_port> container_name:<your_container_name>
`

console.log(message)
