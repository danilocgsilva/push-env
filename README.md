# Push env

Generates env dockerfile on the fly.

## Installing

The package is based on node. Maybe do not want or do not have node installed locally. In this case, you can check the `template` folder, which have a basic receipt to startup the push-env.

## How to use

The script is made in node. But, it have in the root a convenient entry point program called `generate.c`. This is done to be an universal entry point that can be made easily with a cross-compiler like Minggw. Anyway, once in your platform, just compile it and execute.

You can do so, after instaled the Minggw with (debian-like platform): `sudo apt-get install mingw-w64`. Then, runs the command line: `x86_64-w64-mingw32-gcc -o generate generate.c`. This will create a filed called `generate.exe` that can be execute both in the Linux and Windows.

You will be guided to create a folder, containing the files required to rise a docker environment. The folder will be created in the home directory, in a folder called `docker-environments`.

If you ran the `generate` script without further parameters, will be printed in the screen quick tips to use the script.

The most basic usage is to use as follows:

```
./generate THE_NAME_OF_ENVIRONMENT
```

Currently, `THE_NAME_OF_ENVIRONMENT` is the type of environment that you want to use. Currently, follows the availables one:

* node
* relationaldb
* mongo
* php_apache
* php
* node_debian
* node_20_debian
* python

## Notes for development

You will find the `devtools.js`. This script intent is to faclitate implements some further docker templates. Currently, its unique capability is just to add a new template class to be written in the way that a new docker contante can be generated. You type and execute: `node devtools.js <className>`, where:

* `className` is used to be the file name as well that will be located in the `EnvironmentTypes` folder.
