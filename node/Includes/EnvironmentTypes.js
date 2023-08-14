import RelationalDb from "../EnvironmentTypes/RelationalDbContent.js";
import MongoContent from "../EnvironmentTypes/MongoContent.js";
import NodeContent from "../EnvironmentTypes/NodeContent.js";
import PhpApacheContent from "../EnvironmentTypes/PhpApacheContent.js";
import NodeDebianContent from "../EnvironmentTypes/NodeDebianContent.js";
import NginxPhpFpmContent from "../EnvironmentTypes/NginxPhpFpmContent.js";
import Node20DebianContent from "../EnvironmentTypes/Node20DebianContent.js";
import PythonContent from "../EnvironmentTypes/PythonContent.js";
import DebianContent from "../EnvironmentTypes/DebianContent.js";
import UbuntuContent from "../EnvironmentTypes/UbuntuContent.js";
import PHPContent from "../EnvironmentTypes/PHPContent.js";
import MySqlContent from "../EnvironmentTypes/MySqlContent.js";
import ApacheContent from "../EnvironmentTypes/ApacheContent.js";
import DotNetCoreContent from "../EnvironmentTypes/DotNetCoreContent.js";

export default class EnvironmentTypes {
  #types = null;
  constructor() {
    this.#types = {
      apache: new ApacheContent(),
      debian: new DebianContent(),
      dotnetcore: new DotNetCoreContent(),
      mongo: new MongoContent(),
      mysql: new MySqlContent(),
      node: new NodeContent(),
      nginx_php_fpm: new NginxPhpFpmContent(),
      node_20_debian: new Node20DebianContent(),
      node_debian: new NodeDebianContent(),
      php_apache: new PhpApacheContent(),
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
