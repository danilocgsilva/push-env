import RelationalDb from "./EnvironmentTypes/RelationalDbContent.js";
import MongoContent from "./EnvironmentTypes/MongoContent.js";
import NodeContent from "./EnvironmentTypes/NodeContent.js";
import PhpApacheContent from "./EnvironmentTypes/PhpApacheContent.js";
import NodeDebianContent from "./EnvironmentTypes/NodeDebianContent.js";
import Node20DebianContent from "./EnvironmentTypes/Node20DebianContent.js";

export default class EnvironmentTypes {
  #types = null;
  constructor() {
    this.#types = {
      node: new NodeContent(),
      relationaldb: new RelationalDb(),
      mongo: new MongoContent(),
      php_apache: new PhpApacheContent(),
      node_debian: new NodeDebianContent(),
      node_20_debian: new Node20DebianContent()
    };
  }
  getEnvironments() {
    return this.#types;
  }
  listTypes() {
    Object.keys(this.#types).forEach((key) => {
      console.log("* " + key);
    });
    return "";
  }
}
