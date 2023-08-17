export default class MultipleContainers {

  #defaultTargetPort
  #phpContainerName
  #dockerComposeData
  #webserverContainerName
  #developmentContext = false

  set defaultTargetPort(defaultTargetPort) {
    this.#defaultTargetPort = defaultTargetPort
  }

  set phpContainerName(phpContainerName) {
    this.#phpContainerName = phpContainerName
  }

  set dockerComposeData(dockerComposeData) {
    this.#dockerComposeData = dockerComposeData
  }

  set webserverContainerName(webserverContainerName) {
    this.#webserverContainerName = webserverContainerName
  }

  setDevelopmentCommons() {
    this.#developmentContext = true
  }
  
  alterDockerComposeData() {
    this.#dockerComposeData.services[this.#phpContainerName] = this._generatePhpReceipt()
    this.#dockerComposeData.services[this.#webserverContainerName] = this._generateWebserverReceipt()
  }

  getDockerfileContent() {
    return `FROM nginx:latest

COPY ./configs/serverblock.conf /etc/nginx/conf.d/default.conf
`
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

  getDockerFileName() {
    return "Dockerfilewebserve"
  }

  getAdditionalFilesWithPathsAndContents() {
    const additionalFileContentHeader = "FROM php:8.2.8-fpm\n\n"

    const additionalFileContentFooter = "EXPOSE 9000\n"

    let additionalFileContent

    if (this.#developmentContext) {

      const developmentContent = `RUN apt-get update && apt-get install vim curl wget zip -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

`
      additionalFileContent = additionalFileContentHeader + developmentContent + additionalFileContentFooter
    } else {
      additionalFileContent = additionalFileContentHeader + additionalFileContentFooter
    }

    const additionalFile = {
      content: additionalFileContent,
      path: "Dockerfilephp"
    }

    return [additionalFile]
  }

  _generatePhpReceipt() {
    const phpReceipt = {
      container_name: this.#phpContainerName,
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

  _generateWebserverReceipt() {
    return {
      container_name: this.#webserverContainerName,
      build: {
        context: ".",
        dockerfile: "Dockerfilewebserve",
      },
      ports: [
        `${this.#defaultTargetPort}:80`
      ],
      links: [
        this.#phpContainerName
      ]
    }
  }
}
