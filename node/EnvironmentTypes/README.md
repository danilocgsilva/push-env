# EnvironmentTypes

Here there are classes which are responsible for contents for each environment type (mongodb, php, node, etc).

All of them should be part of a same interface, which is tied to `DockerComposeYmlGenerator.yml`. The `DockerComposeYmlGenerator.yml` file is a lower level file which shares some common tasks to the classes from current folder. All this classes should implement some of the methods from `DockerComposeYmlGenerator.yml`.
