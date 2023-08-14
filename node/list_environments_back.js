import EnvironmentTypes from "./Includes/EnvironmentTypes.js"
const environmentTypes = new EnvironmentTypes()

const list_environments = _ => {
    let message = environmentTypes.listTypes()
    
    message += `\nSome common options also is allowed:

* container_name
* base_path
* set_external
* network_mode

For any of the available options, you can use like this: hostport:<value>

For example, you can type: ./generate <your_environment> hostport:<your_host_port> container_name:<your_container_name>

The types also can have exclusive arguments. You can check those typing:

./generate <your_content_type> help

Thus, additional specific data is printed in the command line with more arguments.
`
    
    return message
}

export default list_environments