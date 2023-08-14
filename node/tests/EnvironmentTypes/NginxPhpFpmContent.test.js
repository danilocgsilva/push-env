import NginxPhpFpmContent from "../../EnvironmentTypes/NginxPhpFpmContent.js"

describe('NginxPhpFpmContent', () => {

  test('Basic', () => {
    const nginxPhpFpmContent = new NginxPhpFpmContent()
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
    const nginxPhpFpmContent = new NginxPhpFpmContent()
    const expectContent = `FROM nginx:latest
`
    expect(nginxPhpFpmContent.getDockerfileContent()).toEqual(expectContent)
  })

  test('Changing webserver port redirection', () => {
    const nginxPhpFpmContent = new NginxPhpFpmContent()
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
    const nginxPhpFpmContent = new NginxPhpFpmContent()
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
    const nginxPhpFpmContent = new NginxPhpFpmContent()
    const expectContent = `FROM nginx:latest
`
    expect(nginxPhpFpmContent.getDockerfileContent()).toEqual(expectContent)
  })

})