import PhpfpmNginxContent from "../../EnvironmentTypes/PhpfpmNginxContent.js"

describe('PhpfpmNginxContent', () => {

  test('Basic', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    const expectContent = `version: "3.5"

services:
  nginx_php_fpm_dyn:
    container_name: nginx_php_fpm_dyn
    build:
      context: .
      dockerfile: Dockerfilephp
    ports:
      - 9000:9000
  nginx_php_fpm_webserver:
    container_name: nginx_php_fpm_webserver
    build:
      context: .
      dockerfile: Dockerfilewebserve
    ports:
      - 80:80
    links:
      - nginx_php_fpm_dyn
`
    expect(nginxPhpFpmContent.generate()).toEqual(expectContent)
  })

  test('Test dockerfile content', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    const expectContent = `FROM nginx:latest

COPY ./configs/serverblock.conf /etc/nginx/conf.d/default.conf
`
    expect(nginxPhpFpmContent.getDockerfileContent()).toEqual(expectContent)
  })

  test('Changing webserver port redirection', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    nginxPhpFpmContent.setHostPort("88")
    const expectContent = `version: "3.5"

services:
  nginx_php_fpm_dyn:
    container_name: nginx_php_fpm_dyn
    build:
      context: .
      dockerfile: Dockerfilephp
    ports:
      - 9000:9000
  nginx_php_fpm_webserver:
    container_name: nginx_php_fpm_webserver
    build:
      context: .
      dockerfile: Dockerfilewebserve
    ports:
      - 88:80
    links:
      - nginx_php_fpm_dyn
`
    expect(nginxPhpFpmContent.generate()).toEqual(expectContent)
  })

  test('Changing container name', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    nginxPhpFpmContent.setContainerName("my_nginx_receipt")
    const expectContent = `version: "3.5"

services:
  my_nginx_receipt_php:
    container_name: my_nginx_receipt_php
    build:
      context: .
      dockerfile: Dockerfilephp
    ports:
      - 9000:9000
  my_nginx_receipt_webserver:
    container_name: my_nginx_receipt_webserver
    build:
      context: .
      dockerfile: Dockerfilewebserve
    ports:
      - 80:80
    links:
      - my_nginx_receipt_php
`
    expect(nginxPhpFpmContent.generate()).toEqual(expectContent)
  })

  test('Test dockerfile content', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    const expectContent = `FROM nginx:latest

COPY ./configs/serverblock.conf /etc/nginx/conf.d/default.conf
`
    expect(nginxPhpFpmContent.getDockerfileContent()).toEqual(expectContent)
  })

  test('Test get configuration content', () => {

    const nginxPhpFpmContent = new PhpfpmNginxContent()

    const expectedContent = `server {
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
        fastcgi_pass nginx_php_fpm_dyn:9000;
        include fastcgi_params;
        fastcgi_param  SCRIPT_FILENAME $document_root/index.php;
    }

    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
}`

    expect(nginxPhpFpmContent.getConfigurationsContent()).toEqual(expectedContent)

  })

  test('Test get configuration content', () => {

    const nginxPhpFpmContent = new PhpfpmNginxContent()

    nginxPhpFpmContent.setContainerName("my_nginx_receipt")

    const expectedContent = `server {
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
        fastcgi_pass my_nginx_receipt_php:9000;
        include fastcgi_params;
        fastcgi_param  SCRIPT_FILENAME $document_root/index.php;
    }

    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
}`

    expect(nginxPhpFpmContent.getConfigurationsContent()).toEqual(expectedContent)
  })

  test('Correct Dockerfilephp receipt', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()

    const returnedContent = nginxPhpFpmContent.getAdditionalFilesWithPathsAndContents()

    const expectedData = returnedContent[0].content

    const expectedContent = `FROM php:8.2.8-fpm

EXPOSE 9000
`
    expect(expectedData).toEqual(expectedContent)
  })

  test('Correct Dockerfilephp receipt if in development context', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    nginxPhpFpmContent.setDevelopmentCommons()

    const returnedContent = nginxPhpFpmContent.getAdditionalFilesWithPathsAndContents()

    const expectedData = returnedContent[0].content

    const expectedContent = `FROM php:8.2.8-fpm

RUN apt-get update && apt-get install vim curl wget zip -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

EXPOSE 9000
`
    expect(expectedContent).toEqual(expectedData)
  })

  test('Single Container Mode Basic', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    nginxPhpFpmContent.setSingleContainer()
    const expectContent = `version: "3.5"

services:
  nginx_php_fpm:
    container_name: nginx_php_fpm
    build:
      context: .
    ports:
      - 80:80
`
    expect(expectContent).toEqual(nginxPhpFpmContent.generate())
  })

  test('Single Container Mode getDockerfileContent', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    nginxPhpFpmContent.setSingleContainer()
    nginxPhpFpmContent.getDockerfileContent()
    const expectContent = `FROM debian:bookworm

RUN apt-get update && apt-get upgrade -y
RUN apt-get install nginx -y
RUN apt-get install php8.2-fpm -y
COPY ./entrypoint.sh /entrypoint.sh
COPY ./configs/serverblock.conf /etc/nginx/sites-available/default
RUN chmod +x /entrypoint.sh

CMD [ "./entrypoint.sh" ]
`
    expect(expectContent).toEqual(nginxPhpFpmContent.getDockerfileContent())
  })

  test('Single Container Mode additional file content', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    nginxPhpFpmContent.setSingleContainer()

    const additionalFileContent = nginxPhpFpmContent.getAdditionalFilesWithPathsAndContents()
    const dynamicReturnedContent = additionalFileContent[0].content

    const expectedContent = `#!/bin/bash

/etc/init.d/nginx start
/etc/init.d/php8.2-fpm start

while : ; do sleep 1000; done
`

    expect(dynamicReturnedContent).toEqual(expectedContent)
  })

  test('Single Container Mode several parameters setted and docker-compose text generated', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    nginxPhpFpmContent.setContainerName("my_nginx_receipt_with_single_mode")
    nginxPhpFpmContent.setSingleContainer()
    nginxPhpFpmContent.setHostPort("89")
    const expectedContent = `version: "3.5"

services:
  my_nginx_receipt_with_single_mode:
    container_name: my_nginx_receipt_with_single_mode
    build:
      context: .
    ports:
      - 89:80
`
    expect(nginxPhpFpmContent.generate()).toEqual(expectedContent)
  })

  test('Single Container Mode several parameters setted and docker-compose text generated inverse order of call', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    nginxPhpFpmContent.setSingleContainer()
    nginxPhpFpmContent.setContainerName("my_nginx_receipt_with_single_mode")
    nginxPhpFpmContent.setHostPort("89")
    const expectedContent = `version: "3.5"

services:
  my_nginx_receipt_with_single_mode:
    container_name: my_nginx_receipt_with_single_mode
    build:
      context: .
    ports:
      - 89:80
`
    expect(nginxPhpFpmContent.generate()).toEqual(expectedContent)
  })

  test('Using both generate for composer yml and the additional files', () => {
    const nginxPhpFpmContent = new PhpfpmNginxContent()
    nginxPhpFpmContent.setSingleContainer()
    nginxPhpFpmContent.setContainerName("my_nginx_receipt_with_single_mode")
    nginxPhpFpmContent.setHostPort("89")
    nginxPhpFpmContent.generate()
    const additionalContent = nginxPhpFpmContent.getAdditionalFilesWithPathsAndContents()
    const expectedContent = `#!/bin/bash

/etc/init.d/nginx start
/etc/init.d/php8.2-fpm start

while : ; do sleep 1000; done
`

    expect(additionalContent[0].content).toEqual(expectedContent)
  })

})
