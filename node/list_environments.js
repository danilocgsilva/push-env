import EnvironmentTypes from "./EnvironmentTypes.js"

const environmentTypes = new EnvironmentTypes()
console.log(environmentTypes.listTypes())

const message = `Some options also is allowed:

* hostport
* container_name
* base_path

You can type: ./generate <your_environment> hostport:<your_host_port> container_name:<your_container_name>
`

console.log(message)

