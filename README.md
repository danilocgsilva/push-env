# Push env

Generates env dockerfile on the fly.

## How to use

The script is made in node. But, it have in the root a convenient shell script called `generate`. Just make it executable, and you will be guided to create a folder, containing the files required to rise a docker environment. The folder will be created in the home directory, in a folder called `docker-environments`.

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
* node_debian
* node_20_debian
* python

