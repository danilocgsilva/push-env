import ContentAbstract from "./ContentAbstract.js";

export default class PhpfpmNginxContent extends ContentAbstract {

  #defaultTargetPort
  #phpContainerName = "nginx_php_fpm_dyn"

  constructor() {
    super()
    this.#defaultTargetPort = "80"
  }

  setContainerName(containerName) {
    this._containerName = containerName
    this.#phpContainerName = this.getContainerName() == "" ? "nginx_php_fpm_dyn" : this.getContainerName() + "_php"
  }

  getPhpContainerName() {
    return this.#phpContainerName
  }

  generate() {
    const dockerComposeData = {
      version: "3.5",
      services: {}
    }

    const webserverContainerName = this.getContainerName() == "" ? "nginx_php_fpm_webserver" : `${this.getContainerName()}_webserver`

    dockerComposeData.services[this.#phpContainerName] = this._generatePhpReceipt(this.#phpContainerName)
    dockerComposeData.services[webserverContainerName] = this._generateWebserverReceipt(
      this.#phpContainerName, 
      webserverContainerName
    )

    const dockerComposeYml = this.getContentFinalStringFromYml(dockerComposeData)

    return dockerComposeYml;
  }

  getDockerfileContent() {
    return `FROM nginx:latest

COPY ./configs/serverblock.conf /etc/nginx/conf.d/default.conf
`;
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
    root /var/www/html;

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
        fastcgi_pass ${this.#phpContainerName}:9000;
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

  getDockerFileName() {
    return "Dockerfilewebserve"
  }

  getAdditionalFilesWithPathsAndContents() {

    const additionalFileContent = `FROM php:8.2.8-fpm

EXPOSE 9000
`

    const additionalFile = {
      content: additionalFileContent,
      path: "Dockerfilephp"
    }

    return [additionalFile]
  }
}