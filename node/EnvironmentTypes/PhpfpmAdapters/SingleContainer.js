export default class SingleContainer {
  #defaultTargetPort
  #dockerComposeData
  #containerName

  set defaultTargetPort(defaultTargetPort) {
    this.#defaultTargetPort = defaultTargetPort
  }

  set containerName(containerName) {
    this.#containerName = containerName
  }

  set dockerComposeData(dockerComposeData) {
    this.#dockerComposeData = dockerComposeData
  }

  alterDockerComposeData() {
    this.#dockerComposeData.services[this.#containerName] = {
      container_name: this.#containerName,
      build: {
        context: "."
      },
      ports: [
        `${this.#defaultTargetPort}:80`
      ]
    }
  }

  getDockerFileName() {
    return "Dockerfile"
  }

  getConfigurationsContent() {
    return `server {
      listen 80 default_server;
      listen [::]:80 default_server;

      root /var/www/html;

      index index.html index.htm index.nginx-debian.html index.php;

      server_name _;

      location / {
              try_files $uri $uri/ =404;
      }

      location ~ \.php$ {
              include snippets/fastcgi-php.conf;
              fastcgi_pass unix:/run/php/php8.2-fpm.sock;
      }

      location ~ /\.ht {
              deny all;
      }
}
`
  }

  getDockerfileContent() {
    return `FROM debian:bookworm

RUN apt-get update && apt-get upgrade -y
RUN apt-get install vim git zip curl wget -y
RUN apt-get install nginx -y
RUN apt-get install php8.2-fpm -y
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD [ "./entrypoint.sh" ]
`
  }

  getAdditionalFilesWithPathsAndContents() {

    const fileContent = `#!/bin/bash

/etc/init.d/nginx start
/etc/init.d/php8.2-fpm start

while : ; do sleep 1000; done
`
    const additionalContent = {
      content: fileContent,
      path: "entrypoint.sh"
    }

    return [additionalContent]
  }
}

