#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

bool is_arguments_provided(int argc) {
    char lengthString[2];
    sprintf(lengthString, "%d", argc);
    return argc < 2;
}

int main(int argc, char *argv[]) {

    if (is_arguments_provided(argc)) {
        system("node node/list_environments.js");
        return 1;
    }
    
    char joining_strings[100] = "node node/index.js";

    for (int i = 1; i < argc; i++) {
        strcat(joining_strings, " ");
        strcat(joining_strings, argv[i]);
    }

    system(joining_strings);
    return 0;
}
