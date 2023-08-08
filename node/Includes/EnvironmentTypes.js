import RelationalDb from "../EnvironmentTypes/RelationalDbContent.js";
import MongoContent from "../EnvironmentTypes/MongoContent.js";
import NodeContent from "../EnvironmentTypes/NodeContent.js";
import PhpApacheContent from "../EnvironmentTypes/PhpApacheContent.js";
import PhpApacheWithComposerContent from "../EnvironmentTypes/PhpApacheWithComposerContent.js";
import NodeDebianContent from "../EnvironmentTypes/NodeDebianContent.js";
import Node20DebianContent from "../EnvironmentTypes/Node20DebianContent.js";
import PythonContent from "../EnvironmentTypes/PythonContent.js";
import DebianContent from "../EnvironmentTypes/DebianContent.js";
import UbuntuContent from "../EnvironmentTypes/UbuntuContent.js";
import PHPContent from "../EnvironmentTypes/PHPContent.js";
import MySqlContent from "../EnvironmentTypes/MySqlContent.js";

export default class EnvironmentTypes {
  #types = null;
  constructor() {
    this.#types = {
      debian: new DebianContent(),
      mongo: new MongoContent(),
      mysql: new MySqlContent(),
      node: new NodeContent(),
      node_20_debian: new Node20DebianContent(),
      node_debian: new NodeDebianContent(),
      php_apache: new PhpApacheContent(),
      php_apache_composer: new PhpApacheWithComposerContent(),
      php: new PHPContent(),
      python: new PythonContent(),
      relationaldb: new RelationalDb(),
      ubuntu: new UbuntuContent()
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
