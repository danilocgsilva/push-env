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

})
