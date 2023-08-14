import ContentAbstract from "./ContentAbstract.js";

export default class NginxPhpFpmContent extends ContentAbstract {

  #defaultTargetPort

  constructor() {
    super()
    this.#defaultTargetPort = "80"
  }

  generate() {

    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    const phpContainerName = this.getContainerName() == "" ? "nginx_php_fpm_dyn" : this.getContainerName() + "_php"
    const webserverContainerName = this.getContainerName() == "" ? "nginx_php_fpm_webserver" : `${this.getContainerName()}_webserver`

    dockerComposeData.services[phpContainerName] = this._generatePhpReceipt(phpContainerName)
    dockerComposeData.services[webserverContainerName] = this._generateWebserverReceipt(
      phpContainerName, 
      webserverContainerName
    )

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return "FROM nginx:latest\n";
  }

  setHostPort(port) {
    this.#defaultTargetPort = port
  }

  mayWriteConfigurationFile() {
    return true
  }

  getConfigurationsContent() {
    return `server {
    server_name localhost;
    root /var/www/html/public;

    location = / {
        try_files @site @site;
    }

    location / {
        try_files $uri $uri/ @site;
    }

    location ~ \.php$ {
        return 404;
    }

    location @site {
        fastcgi_pass nginx_php_fpm_dyn:9000;
        include fastcgi_params;
        fastcgi_param  SCRIPT_FILENAME $document_root/index.php;
    }

    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
}`
  }

  _generatePhpReceipt(phpContainerName) {
    const phpReceipt = {
      container_name: phpContainerName,
      build: {
        context: ".",
        dockerfile: "Dockerfilephp"
      }
    }

    phpReceipt["ports"] = [
      "9000:9000"
    ]
    
    return phpReceipt
  }

  _generateWebserverReceipt(
    phpContainerName,
    webserverContainerName
  ) {
    return {
      container_name: webserverContainerName,
      build: {
        context: ".",
        dockerfile: "Dockerfilewebserve",
      },
      ports: [
        `${this.#defaultTargetPort}:80`
      ],
      links: [
        phpContainerName
      ]
    }
  }
}