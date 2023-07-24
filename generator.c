#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

    printf(argc);

    if (argc < 1) {
        printf("You need to provides an argument");
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
